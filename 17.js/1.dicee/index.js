/* 
on button click:
1) generate random number for each player
2) assign img src attribute value of correlating dice img
3) change h1 accordingly to whom won. 
*/

/* DONE 
1) Add dice img function to elements
2) Add random number function from 1-6
3) Add array of images sources to numbers
4) Add function to change h1 to : Player 1 Wins!, Player 2 Wins!, Draw!
4a) create array with values
4b) create function to change text
*/
const d6Src = ["./images/dice1.png", "./images/dice2.png", "./images/dice3.png", "./images/dice4.png", "./images/dice5.png", "./images/dice6.png"]
const whoWon = ["Player 1 Wins!", "Player 2 Wins!", "Draw!"];

document.querySelector("button").addEventListener("click", dicee);

function dicee () {
    let player1Roll = d6();
    let player2Roll = d6();
    document.querySelector(".img1").setAttribute("src", changeD6(player1Roll));
    document.querySelector(".img2").setAttribute("src", changeD6(player2Roll));
    
    if (player1Roll > player2Roll ) {
        headerChange(1);
    } else if (player2Roll > player1Roll) {
        headerChange(2);
    } else {
        headerChange(3);
    }
}
    
/* returns d6 random (0-5) */
function d6 () {
    let result = Math.floor(Math.random() * 6);
    return result;
}

/* returns d6 img src */
function changeD6 (randomRoll) {
    return d6Src[randomRoll];
}

/* changes the h1 */
function headerChange (player) {
    let header = document.querySelector("h1");
    if (player === 1) {
        header.innerHTML = whoWon[0];
    } else if (player === 2) {
        header.innerHTML = whoWon[1];
    } else {
        header.innerHTML = whoWon[2];
    }
} 