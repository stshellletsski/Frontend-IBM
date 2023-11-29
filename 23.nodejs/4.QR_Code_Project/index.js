/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

const question = [
    {
        type: 'input',
        name: 'url',
        message: "What is the website address?",
    }
];

inquirer.prompt(question).then((answer) => {
    let userURL = answer.url;
    let qr_png = qr.image(userURL, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('./qr_img.png'));
    fs.writeFile('./URL.txt', userURL, (err) => {
        if (err) throw err;
        console.log("URL saved successfully!");
    });
});

