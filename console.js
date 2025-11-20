const game = require('./game');
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 3;

function startGame() {
  rl.question("Enter in the size of the game (n)\n", nString => {
    try {
      const parsedN = parseInt(nString, 10);
      if (!isNaN(parsedN) && parsedN > 0) {
        n = parsedN;
      } else {
        console.log("Invalid n, defaulting to classic 3");
      }
    } catch (error) {
      console.log("Error parsing n, defaulting to classic 3");
    }
    console.log("Creating game of size " + n);
    const match = game.computeGames(n);

    rl.question("Would you like to see all possible games? y/n\n", yOrn => {
      if (yOrn.toLowerCase() === "y") {
        game.printMatrix(match);
      }

      rl.question("Please enter your move in the form of an index. \neg: 0 = rock, 1 = paper, 2 = scissors, ...\n", move => {
        try {
          const playerMove = parseInt(move, 10);
          const opponentMove = game.getRandomMove(n);
          console.log("Your move was: " + game.getName(playerMove));
          console.log("Your opponent's move was: " + opponentMove + ": " + game.getName(opponentMove));

          const outcome = game.decideWinner(playerMove, opponentMove, match);
          if (outcome === 1) {
            console.log("You won!");
          } else if (outcome === 0) {
            console.log("It was a tie!");
          } else {
            console.log("You lost.");
          }
        } catch (error) {
          console.log("Invalid move, you lose by default.");
        }

        // Ask if the player wants to play again
        rl.question("Do you want to play again? y/n\n", playAgain => {
          if (playAgain.toLowerCase() === "y") {
            startGame();
          } else {
            console.log("Thanks for playing!");
            rl.close();
          }
        });
      });
    });
  });
}

startGame();
