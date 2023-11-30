import express from "express";
const app = express();
const port = 3000;
const home = "Hello World!";
const contact = "www.mywebsite.com";
const about = "This is my server!"


const hHome = `<h1 style="color: red; display: flex; justify-content: center;">${home}</h1>`;
const hContact = `<h1 style="color: red; display: flex; justify-content: center;">${contact}</h1>`;
const hAbout = `<h1 style="color: red; display: flex; justify-content: center;">${about}</h1>`;
const p = '<p style="color: blue; display: flex; justify-content: center;">This is paragraph doh!</p>';
const body = `${hHome}${p}`;
app.get('/', (req, res) => {
    res.send(body);
  });

app.get('/contact', (req, res) => {
    res.send(hContact)
});

app.get('/about', (req, res) => {
    res.send(hAbout);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});