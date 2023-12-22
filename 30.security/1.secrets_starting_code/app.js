import 'dotenv/config'
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import pgSession from "connect-pg-simple";
const app = express();
const port = 3000;
const dbConfig = {
    user: "postgres",
    host: "localhost",
    database: "secrets",
    password: process.env.DB_PASSWORD,
    port: 5432
};

const db = new pg.Client(dbConfig);
const pgSessStore = pgSession(session);

await db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//////////////////////////////////////////////////////////
// Session middleware and Storage:
//////////////////////////////////

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new pgSessStore({
        pool : db,
        tableName: 'session'
    }),
    cookie: { 
        maxAge: 60e4,
        sameSite: 'strict',
    },
}));


/////////////////////////////////////////////////////////
// GET:
///////

app.get("/", async (req, res) => {
    res.render("home.ejs");
});

app.get("/register", async (req, res) => {
    res.render("register.ejs");
});

app.get("/login", async (req, res) => {
    res.render("login.ejs");
});

app.get("/logout", async (req, res) => {
    req.session.regenerate((err) => {
        console.log(err);
    });
    res.redirect("/");
});

app.get("/secrets", async (req, res) => {
    (req.session.userID) ? res.render("secrets.ejs") : res.redirect("/login");
});

app.get("/submit", async (req, res)=>{
    (req.session.userID) ? res.render("submit.ejs") : res.redirect("/login");
});



/////////////////////////////////////////////////////////
// POST:
////////
app.post("/register", async (req, res) => {
    let error;      
    try {
        const result = await db.query("INSERT INTO users (email) VALUES ($1) RETURNING id",[req.body.username]);
        const hash = await bcrypt.hash(req.body.password, 10);
        await db.query("INSERT INTO passwords (user_id, password) VALUES ($1, $2)",[result.rows[0].id, hash]);
    } catch (err) {
        error = err;
    } finally {
        (error) ? res.status(400).send("error!") : res.redirect("/");
    }
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let error;
    
    try {
        const userId = await db.query("SELECT id FROM users WHERE email = $1",[username]);
        const userPwd = await db.query("SELECT password FROM passwords WHERE user_id = $1",[userId.rows[0].id]);
        const isAuth = await bcrypt.compare(password, userPwd.rows[0].password);
        if(isAuth) req.session.userID = userId.rows[0].id;
    } catch (err) {
        error = err;
    } finally {
        if (error) {
            res.status(400).send("error");
        } else if (!req.session.userID) {
            console.log("Not Authenticated!");
            res.redirect("/");
        } else {
            res.render("secrets.ejs");
        }
    }
});

app.post("/submit", async (req, res) => {
    if(req.session.userID) {
        const secret = req.body.secret;
        await db.query("INSERT INTO secrets (user_id, secret) VALUES ($1, $2)", [req.session.userID, secret]);
    } 
    res.redirect("/");
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});