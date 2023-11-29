const fs = require("fs");

/* let text = "This is the yet another text to save in the file";

fs.writeFile("message.txt", text, (err) => {
    if (err) throw err;
    console.log("The file has been saved");
}); */

fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File has been read successfully");
    let text2 = data;
    text2 = text2.toUpperCase();
    text2 = text2.replaceAll("I", " poop ");
    console.log(text2);
    let a = poop (text2);
    console.log(a);
});


function poop (content) {
return content + content;
}
