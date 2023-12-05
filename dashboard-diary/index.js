import express from "express";

const port = 3000;
const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(diaryButtonParser);

// Entry points

app.get("/", (req, res) => {
    let quote = randomQuote();
    let date = timeDate().date;
    res.render("index.ejs", {tasks, date, quote, diaryEntries});
});

app.post("/addTodo", (req, res) =>{
    if (req.body.newTask.length !== 0) {
        if (tasks.length < 3) {
            tasks.push(req.body.newTask);
        }
    }
    res.redirect("/");
});

app.post("/doneTodo", (req, res) =>{
    let index = Number(lastCharOfArr(reqBodyKey(req)));
    tasks.splice(index, 1);
    res.redirect("/");
});

// Whole diary done through custom middleware!
app.post("/diary", (req, res) =>{
    
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}.`);
});

// Some sick code I will not remember in a week time :/
function diaryButtonParser (req, res, next) {
    let keysArr = reqBodyKey(req);
    if (keysArr.includes("submit")) {
        if (req.body.submit === "new") {
            let time = new Date().getTime();
            let date = timeDate(time).date;
            diaryEntries.unshift(new DiaryEntry(time, date, req.body.title, req.body.content));
        } else {
            let resub = diaryEntries.find(x => x.time === Number(req.body.submit));
            resub.title = req.body.title;
            resub.content = req.body.content;
            resub.edit = false;
        }
    } else if (keysArr.includes("delete")) {
        diaryEntries.splice(diaryEntries.indexOf(diaryEntries.find(x => x.time === Number(req.body.delete))), 1); 
    } else if (keysArr.includes("edit")) {
        diaryEntries.find(x => x.time === Number(req.body.edit)).edit = true;
    } else {   
    }
    next();
}

// Those two functions should not exist but no time to refactor.

function reqBodyKey (req) {
    return Object.keys(req.body);
}

function lastCharOfArr(arr) {
    return arr[0].charAt(arr[0].length-1);
}

// Custom date conversion. Works with and without argument.
function timeDate (ms) {
	const d = (typeof ms === 'undefined') ? new Date() : new Date(ms);
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const day = daysOfWeek[d.getDay()];
	const date = `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`;
	const time = `${d.getHours()} : ${d.getMinutes()}`;
	return {day : day, date : date, time : time};
}

// Who does not love quotes?!
function randomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Custom prototype with default. 
function DiaryEntry (time, date, title, content, edit = false) {
    this.time = time;
    this.date = date;
    this.title = title;
    this.content = content;
    this.edit = edit;
}

// No DB because... It was not the subject of the project.

const quotes = [
    "It does not matter how slowly you go as long as you do not stop.",
    "Do not wait; the time will never be 'just right.' Start where you stand, and work with whatever tools you may have at your command, and better tools will be found as you go along.",
    "A creative man is motivated by the desire to achieve, not by the desire to beat others.",
    "Look up at the stars and not down at your feet. Try to make sense of what you see, and wonder about what makes the universe exist. Be curious.",
    "Consult not your fears but your hopes and your dreams. Think not about your frustrations, but about your unfulfilled potential. Concern yourself not with what you tried and failed in, but with what it is still possible for you to do.",
    "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
    "All that was great in the past was ridiculed, condemned, combated, suppressed — only to emerge all the more powerfully, all the more triumphantly from the struggle.",
    "Strong minds discuss ideas, average minds discuss events, weak minds discuss people."
];

const tasks = [];
const diaryEntries = [];

