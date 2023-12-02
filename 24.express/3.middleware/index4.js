import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

function logger (req, res, next) {
  console.log ("Method used:", req.method);
  console.log ("URL:", req.url, `\n`);
  next();
}
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  let adjectives = ["The Amazing", "The Magnificent", "The Terrible"];
  let fName = req.body.street;
  let lName = req.body.pet;
  let content = `<main style="display: flex; flex-direction: column; align-items: center;"><h1>Your band name is:</h1><p>${adjectives[Math.floor(Math.random()*3)]} ${fName}${lName}</p></main>`;
  res.send(content);
  if(res.statusCode == 200) console.log("You are the best programmer in the world.");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
