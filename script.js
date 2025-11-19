// model out rock paper scissors for any odd natural number of objects above 3
function computeGames(n) {
  // Assume your items are numbered 0,1,2,...,n-1.
  // Item i beats item j iff i - j (mod n) > (n-1)/2.
  // In other words you can rotate the list such that your chosen item is in the middle of the list:
  // i - (n-1) / 2, ..., i-2, i-1, i, i+1, i+2, ..., i + (n-1) / 2
  let iVj = []
  for (let i = 0; i < n; i++) {
    let row = []
    for (let j = 0; j < n; j++) {
      if (i === j) {
        row.push(0)
      } else if ((j - i + n) % n > (n - 1) / 2) {
        row.push(1)
      } else {
        row.push(-1)
      }
    }
    iVj.push(row)
  }

  return iVj
}

function getName(objectNumber) {
  let fs = require("fs")
  let file = fs.readFileSync("./nouns.txt", "utf-8")
  let words = file.split("\n")
  return words[objectNumber]
}

function printMatrix(matrix) {
  for (let row = 0; row < matrix.length; row++) {

    let rowString = ""
    for (let col = 0; col < matrix[row].length; col++) {

      if (matrix[row][col] == 1) {
        rowString += "W "
      } else if (matrix[row][col] == -1) {
        rowString += "L "
      } else {
        rowString += "X "
      }
    }

    console.log(rowString)
  }
}

function decideWinner(player1Move, player2Move, matrix) {
  let outcome = matrix[player1Move][player2Move]
  return outcome
}

