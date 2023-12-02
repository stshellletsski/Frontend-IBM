import express from "express";

const app = express();
const port = 3000;
const array1 = ["weekday", "weekend"];
const array2 = ["work hard", "have fun"];
const array3 = ["The Best", "The Most Amazing", "The Most Magnificent", "The Most Incredible"]

function day2Data (day) {
    if(day < 6 && day > 0) {
    return 0
    } else {
    return 1
    }
}

app.get("/", (req, res) => {
    let date = new Date("Dec 01 2023 19:39:33 GMT+0000");
    let index = day2Data(date.getDay());
    let k4random = Math.floor(Math.random()*4);
    console.log(k4random);
    res.render("index.ejs", 
    {
     day : array1[index],
     action : array2[index],
     compliment : array3[k4random],   
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});