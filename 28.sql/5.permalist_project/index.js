import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Permalist",
  password: "******",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const todos = await db.query("SELECT * FROM todos ORDER BY id ASC");
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: todos.rows,
  });
});

app.post("/add", async (req, res) => {
  const title = req.body.newItem;
  await db.query("INSERT INTO todos (title) VALUES ($1)",[title]);
    res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const todos = req.body;
  await db.query(
    "UPDATE todos SET title = $1 WHERE id = $2",
    [todos.updatedItemTitle, todos.updatedItemId]);
  res.redirect("/");  
});

app.post("/delete", async (req, res) => {
  const todosId = req.body.deleteItemId;
  await db.query("DELETE FROM todos WHERE id = $1",[todosId]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
