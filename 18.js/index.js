// Create array of sounds locations
const drumSounds = ["./sounds/tom-1.mp3",
                    "./sounds/tom-2.mp3",
                    "./sounds/tom-3.mp3",
                    "./sounds/tom-4.mp3",
                    "./sounds/crash.mp3",
                    "./sounds/kick-bass.mp3",
                    "./sounds/snare.mp3"];
                    
// Create array of keys. Indices corresponding to indices of drumSounds array
const drumsKey = ["w", "a", "s", "d", "j", "k", "l"];
// Declare empty array for Audio objects
const drums = [];
// list of elements with .drum class
const drumButtons = document.querySelectorAll(".drum");

// Iterate through all drums and:
// Populate drums array with Audio objects
// Add event listeners to elements
for (let i = 0; i < drumButtons.length; i++) {
    drums.push(new Audio(drumSounds[i]));
    drumButtons[i].addEventListener("click", function (x) {
        /* console.log (x.target.textContent); */
        playDrum(this.textContent);
        animateButton(this.textContent);
    });
}

// Add event listener to document
document.addEventListener("keydown", keyDetection);

//event Listener
function keyDetection (event) {
    playDrum(event.key);
    animateButton(event.key)
}

// Event handler sounds
function playDrum (key) {
    // checks if triggering event.key is present in drumsKey array 
    if (drumsKey.includes(key)) {
        drums[drumsKey.indexOf(key)].load();
        drums[drumsKey.indexOf(key)].play();
    }
}
// Event handler animation - use of classList
function animateButton (key) {
    let buttonAnimation = document.querySelector(`.${key}`);
    buttonAnimation.classList.add("pressed");
    setTimeout(()=>{buttonAnimation.classList.remove("pressed");},100)
}


/* for (let i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        const drumSounds = ["./sounds/tom-1.mp3", "./sounds/tom-2.mp3", "./sounds/tom-3.mp3", "./sounds/tom-4.mp3", "./sounds/crash.mp3", "./sounds/kick-bass.mp3", "./sounds/snare.mp3"]
        let drum = this.textContent;
        switch (drum) {
            case "w":
                let drumW = new Audio (drumSounds[i]);
                drumW.load();
                drumW.play();
                break;
            case "a":
                let drumA = new Audio (drumSounds[i]);
                drumA.load();
                drumA.play();
                break;
            case "s":
                let drumS = new Audio (drumSounds[i]);
                drumS.load();
                drumS.play();
                 break;
            case "d":
                let drumD = new Audio (drumSounds[i]);
                drumD.load();
                drumD.play();
                break;
            case "j":
                let drumJ = new Audio (drumSounds[i]);
                drumJ.load();
                drumJ.play();
                break;
            case "k":
                let drumK = new Audio (drumSounds[i]);
                drumK.load();
                drumK.play();
                break;
            case "l":
                let drumL = new Audio (drumSounds[i]);
                drumL.load();
                drumL.play();
                break;
            default:
                console.log(drum);
        }
    });
} */