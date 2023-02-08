//turn indicater
var xTurn = document.getElementById("x");
var oTurn = document.getElementById("o");

//boxes and x/o pieces
var boxes = document.querySelectorAll(".box");
var xChar = document.getElementsByClassName("x");
var oChar = document.getElementsByClassName("o");

//false sets o turn, true sets x. set to false to switch on first turn
var turnval = false;
// x is red to show it starts first
xTurn.setAttribute(
  "style",
  "color: red; text-shadow: 3px 1px rgb(105, 104, 104); border: 4px solid black;"
);

//hides all x and o on board
for (let i = 0; i < xChar.length || i < oChar.length; i++) {
  xChar[i].classList.add("hide");
  oChar[i].classList.add("hide");
}

const game = {
  xState: [],
  oState: [],
  winningStates: [
    // Rows
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    // Columns
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    // Diagonal
    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};
//checks whos turn it is and if an x or o has been placed in the box then places x or o accordingly
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    if (
      turnval === false &&
      oChar[i].classList.contains("hide") &&
      xChar[i].classList.contains("hide")
    ) {
      xChar[i].classList.remove("hide");
      xTurn.setAttribute("style", "color: black;");
      oTurn.setAttribute(
        "style",
        "color: red; text-shadow: 2px 2px rgb(105, 104, 104); border: 4px solid black"
      );
      game.xState.push(boxes[i].dataset.value);
      turnval = !turnval;
    }
    if (
      turnval === true &&
      xChar[i].classList.contains("hide") &&
      oChar[i].classList.contains("hide")
    ) {
      oChar[i].classList.remove("hide");

      oTurn.setAttribute("style", "color: black;");
      xTurn.setAttribute(
        "style",
        "color: red; text-shadow: 2px 2px rgb(105, 104, 104); border: 4px solid black"
      );
      game.oState.push(boxes[i].dataset.value);
      turnval = !turnval;
    }

    //check wins
    game.winningStates.forEach((winningState) => {
      const xWins = winningState.every((state) => game.xState.includes(state));
      const oWins = winningState.every((state) => game.oState.includes(state));

      if (game.xState.length >= 5) {
        xTurn.setAttribute("style", "color: black; border: none;");
        oTurn.setAttribute("style", "color: black; border: none;");
        xTurn.innerText = "draw!";
        oTurn.innerText = "draw!";
      }
      if (xWins) {
        xTurn.innerText = "winner!";
        oTurn.classList.add("hide");
      }
      if (oWins) {
        oTurn.innerText = "winner!";
        xTurn.classList.add("hide");
      }
      if (oWins || xWins || game.xState.length >= 5) {
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
  });
}
