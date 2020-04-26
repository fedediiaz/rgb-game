// Declarations
let board = document.querySelector(".board");
let gameModeBtn = document.querySelectorAll(".game-mode");
let mode = 3;
let colorArr = getRandColArr(mode);
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colDisplay");
let pickedColor = colorArr[randomInt(0, colorArr.length)];
let header = document.querySelector("header");
let resetButton = document.querySelector("#reset");
let message = document.querySelector("#message");
let gameOver = false;


init();

function init() {
    // Start Game
    resetGame();

    // Event Listener reset Game;
    resetButton.addEventListener("click", function () {
        resetGame();
    });

    // Event Listeners Game Mode
    for (let i = 0; i < gameModeBtn.length; i++) {
        let currBtn = gameModeBtn[i];

        currBtn.addEventListener("click", function () {
            removeClass(gameModeBtn, "selected");
            this.classList.add("selected");
            mode = this.textContent == "easy" ? 3 : 6;
            resetGame();
        });
    }

}


function randomInt(min = 0, max = 1) {
    /*
    Desc   => Returns Int between min and max(excl.)
    Input  => Int x2
    Output => Int;
    */
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColorRgb() {
    /*
    Desc   => Generates RGB
    Input  => Null
    Output => String
    */
    let red = randomInt(0, 256);
    let green = randomInt(0, 256);
    let blue = randomInt(0, 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

function getRandColArr(len) {
    /*
   Desc   => Generates arr[len] of RGBs
   Input  => Int
   Output => arr
   */
    let arr = [];
    for (let i = 0; i < len; i++) {
        let ranCol = getRandomColorRgb();
        arr.push(ranCol);
    }
    return arr;
}

function setElemsBgColor(arr, color) {
    /*
   Desc   => Sets all elems bgColor in arr to given color
   Input  => arr, str, str
   Output => Null
   */
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.backgroundColor = color[i];
    }
    return;
}

function setBoard(arr) {
    board.innerHTML = "";
    let boardHTML = "";
    // let square = document.createElement("div");
    // square.classList.add("square");
    let square = `<div class="square"></div>`;
    for (let i = 0; i < arr.length; i++) {
        boardHTML += square;
    }
    return board.innerHTML = boardHTML;
}

function setSquaresListeners() {
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        square.addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor;

            if (!gameOver) {
                if (clickedColor === pickedColor) {
                    for (square of squares) {
                        square.style.backgroundColor = pickedColor;
                    }
                    header.style.backgroundColor = pickedColor;
                    message.textContent = "Correct!"
                    resetButton.textContent = "Play again?"
                    gameOver = true;
                } else {
                    this.style.backgroundColor = "#232323";
                    message.textContent = "Try Again";
                }
            }

        });
    }
    return;
}

function removeClass(arr, className) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove(className);
    }
    return;
}


function resetGame() {
    // Do not alter the order
    colorArr = getRandColArr(mode);
    pickedColor = colorArr[randomInt(0, colorArr.length)];
    setBoard(colorArr);
    squares = document.querySelectorAll(".square");
    setSquaresListeners();
    setElemsBgColor(squares, colorArr);
    header.style.backgroundColor = "#232323";
    message.textContent = " ";
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Game!";
    gameOver = false;
    return;
}










