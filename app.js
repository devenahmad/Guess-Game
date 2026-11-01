let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameOver = false;

let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");


// Start game with keyboard
document.addEventListener("keypress", function () {
    if (!started && !gameOver) {
        started = true;
        levelUp();
    }
});

// Add click event to all buttons
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


// Game button flash
function gameFlash(btn) {
    btn.classList.add("gameflash");

    setTimeout(function () {
        btn.classList.remove("gameflash");
    }, 250);
}


// User button flash
function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}


// Wrong answer flash
function wrongFlash(btn) {
    btn.classList.add("wrongFlash");

    setTimeout(function () {
        btn.classList.remove("wrongFlash");
    }, 200);
}


// Increase level and add a new color
function levelUp() {
    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    let randomNum = Math.floor(Math.random() * 4);
    let randomClr = btns[randomNum];
    let randomBtn = document.querySelector(`.${randomClr}`);

    gameSeq.push(randomClr);

    gameFlash(randomBtn);
}


// Check user's sequence
function checkSeq(lastIndex, btn) {

    if (userSeq[lastIndex] === gameSeq[lastIndex]) {

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        // Updating Highest Score
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }

        // Game Over
        h2.innerHTML = `GameOver! Your score was <b>${level}</b>.<br>
                        Highest Score yet <b>${highScore}</b>.<br>
                        Press any key to start again`;

        gameOver = true;

        wrongFlash(btn);

        // Flashing Whole BG
        setTimeout(function () {
            document.querySelector("body").classList.add("gameOver");

            setTimeout(function () {
                document.querySelector("body").classList.remove("gameOver");
            }, 200);

        }, 250);

        reset();
    }
}


// Handling button click
function btnPress() {

    // Ignore clicks during Game Over animation
    if (gameOver) {
        return;
    }

    // First click starts the game
    if (!started) {
        started = true;
        levelUp();
        return;
    }

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkSeq(userSeq.length - 1, btn);
}


// Reset game
function reset() {
    level = 0;
    gameSeq = [];
    userSeq = [];

    setTimeout(function () {
        started = false;
        gameOver = false;
    }, 450);
}