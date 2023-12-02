import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url"
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const password = "ThisIsGreat!";

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(req.body.password === password) {
        res.sendFile(__dirname + "/public/secret.html");
        console.log("You are the best programmer in the world!");

    } else {
        res.sendFile(__dirname + "/public/index.html");
        console.log("Incorrect password", "You are the best programmer in the world!");
    }    
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});