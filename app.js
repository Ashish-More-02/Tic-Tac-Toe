const boxes = document.querySelectorAll(".box");
console.log(boxes);

const reset_btn = document.querySelector(".reset_button");
const bodyElement = document.querySelector("body");
const msgDiv = document.querySelector(".winningMsg");
const container = document.querySelector(".container");
const redBtn = document.querySelector("#redDot");
let playerXScore = 0;
let playerOScore = 0;
const P1 = document.querySelector("#player1");
const P2 = document.querySelector("#player2");
let turnO = true; // playerX and playerO
let count = 0;

// 2d array to store all the winning patterns in our game
const winning_patterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    // console.log(`box ${index} was clicked!`);
    if (turnO === true) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    // this is used to disable the functionlity of the button
    box.disabled = true;
    // Increment the move count
    count++;

    // Check for a winner first
    if (checkWinner()) {
      return; // Stop further execution if we have a winner
    }

    // If no winner, check for a draw
    playersDraw();
  });
});

function showWinner(player) {
  // launch a few confetti from the left edge
  confetti({
    particleCount: 200,
    angle: 60,
    spread: 80,
    origin: { x: 0 },
  });
  // and launch a few from the right edge
  confetti({
    particleCount: 200,
    angle: 120,
    spread: 80,
    origin: { x: 1 },
  });
  // alert(`winner is ${player}`);
  msgDiv.innerHTML =
    "<button id='redDot'> </button>" + "Congratualtions!!! winner is " + player;
  msgDiv.style.display = "block";
  container.style.filter = "blur(8px)";
}


// this function checks for draw condition
function playersDraw() {
  if (count == 9) {
    msgDiv.innerHTML =
      "<button id='redDot'> </button>" + "Oh Oh! It is a Draw!  ";
    msgDiv.style.display = "block";
    container.style.filter = "blur(8px)";
    count =0;
  }
}

// each time the function is called it will check each and every pattern
function checkWinner() {
  for (pattern of winning_patterns) {
    // console.log(pattern);

    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;

    // first we are checking that any box in the pattern should not be empty
    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        console.log("winner is " + pos1Value);
        if (pos1Value == "X") {
          playerXScore++;
          P1.innerText = playerXScore;
        } else {
          playerOScore++;
          P2.innerText = playerOScore;
        }

        showWinner(pos1Value);
        return true;
      }
      
    }
  }
}

function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  count =0;
  msgDiv.style.display = "none";
  container.style.filter = "blur(0px)";
}

reset_btn.addEventListener("click", resetGame);

redBtn.addEventListener("click", function () {
  msgDiv.style.display = "none";
  container.style.filter = "blur(0px)";
});
