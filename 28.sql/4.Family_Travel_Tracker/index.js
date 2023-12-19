import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world_tracker",
  password: "*****",
  port: 5432,
});
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//////////////////////////////////////////////////////////////
// queryList:
// ----------
// fetchAllUsers - fetches all users id, name, color
// fetchUser - fetches user id, name, color based on id
// fetchVisited - fetches visited countries codes of one user 
// fetchCountry - checks for country, returns rows of code, name 
// addVisited - adds visited countries user_id country_code
// addUser - adds user id, name, color; returns id
///////////////////////////////////////////////////////////
const queryList = {
  fetchAllUsers : "SELECT id, f_name, color FROM users",
  fetchUser : "SELECT id, f_name, color FROM users WHERE id = $1",
  fetchVisited : "SELECT country_code FROM visited_countries WHERE user_id = $1",
  fetchCountry: "SELECT code, name FROM country_codes WHERE LOWER(name) LIKE '%' || $1 || '%';", 
  addVisited : "INSERT INTO visited_countries (user_id, country_code) VALUES ($1,$2)",
  addUser : "INSERT INTO users (f_name, color) VALUES ($1,$2) RETURNING id",
}

/////////////////
// messagesList:
// -------------
// welcome
////////////////
const messagesList = {
  welcome : "Type to find and add visited country",
}

/////////////////
// Global states
////////////////
let selectedUser = 1;
let error = messagesList.welcome

///////////////////
// GET / endpoint
/////////////////
app.get("/", async (req, res) => {
  const users = await db.query(queryList.fetchAllUsers)
  const user = await db.query(queryList.fetchUser, [selectedUser])
  const visited = await db.query(queryList.fetchVisited, [selectedUser])
  const countries = [];
  visited.rows.forEach(x=> {countries.push(x.country_code)});

  res.render("index.ejs", {
    error : error,
    countries: countries,
    total: countries.length,
    users: users.rows,
    color: user.rows[0].color,
  });
});

////////////////////
// Add new country
//////////////////
app.post("/add", async (req, res) => {
  const input = req.body.country;
  const result = await db.query(queryList.fetchCountry,[input.toLowerCase()]);
  const countries = []
  result.rows.forEach(x => {countries.push(x.name)});

  if (countries.length !== 1) {
    error = `Found ${countries.length} countries. Specify: ${countries.toString()}`;
    res.redirect("/");
  } else {
    const countryCode = result.rows[0].code;
    await db.query(queryList.addVisited,[selectedUser,countryCode]);
    error = `Country ${result.rows[0].name} added`;
    res.redirect("/");
  }
});

//////////////////////
// Add / switch user
////////////////////
app.post("/user", async (req, res) => {
  if(req.body.add === 'new') {
    error = "New user added";
    res.render("new.ejs");
  } else {
    selectedUser = req.body.user;
    res.redirect("/");
  }
});

////////////////////
// Add new country
//////////////////
app.post("/new", async (req, res) => {
  const newUser = req.body;
  let result = await db.query(queryList.addUser,[newUser.name, newUser.color]);
  selectedUser = result.rows[0].id; 
  
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
