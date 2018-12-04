// Toggle console.logs for debugging.
var debugLogs = true;

// Define Dictionary Object 
var wordObj = {
    word : ["professor",
            "fry",
            "leela"],
    hint : ["Old Cranky Man",
            "Young Redheaded Uncle",
            "One-Eyed Brannigan Lover"],
    image : ["professor.png",
             "fry.png",
             "leela.png"],
    sound : ["farnsworth1.mp3",
             "fry.mp3",
             "leela.mp3"]
  };

  var guessCnt = 10; // Total Number of Guesses per game
  var usedLettersAry = []; // Blank Array to hold Guessed letters
//   var wordMask = ''; // Var to hold word mask
  var wordSelector = '';
  //var typedLetter = "r"; // Likely not needed
  var gameOver = false;
  var winFlag = true;
  var winCnt = 0;
  var loseCnt = 0;

  //Define HTML Targets
  // Deine Game Div to Show Winner and Loser!
  var gameDivDoc = document.getElementById("game-div");
  var hintDivDoc = document.getElementById("hint-div");
  var hintDoc = document.getElementById("hint");
  var guessCntDoc = document.getElementById("guess-count");
  var usedLettersDoc = document.getElementById("used-letters");
  var wordMaskDoc = document.getElementById("word-mask");

function newGame() {
    gameStart();
    writeScreen();
}; // Close newGame

function restartGame() {
    console.log("Game Restarted");
    guessCnt = 10; // Total Number of Guesses per game
    usedLettersAry = []; // Blank Array to hold Guessed letters
    wordSelector = '';
    winFlag = true;
    gameOver = false;
    hintDivDoc.innerHTML = "<p><span id=\"hint\">This is where the Hints go</span></p>";
    gameDivDoc.innerHTML = "<p><span id=\"word-mask\">Waiting on Word...</span></p><p> <span id=\"used-letters\">You have typed no Letters</span></p><p>You have <span id=\"guess-count\">XX</span> guesses remaining</p>"
    gameStart();
    writeScreen();
}

function gameStart() {
    // Select random number, that will select word/hint/image/sound from data dictionary.  
        wordSelector = Math.floor(Math.random()*wordObj["word"].length)
}; // Close gameStart

function writeScreen() {
    //print Hint 
    var wordMask = '';
    hintDoc.textContent = wordObj["hint"][wordSelector];
    //print initial Number of guesses Remaining.  
    guessCntDoc.textContent = guessCnt;
    // Print used leters
    if (usedLettersAry.length < 1) {
        usedLettersDoc.textContent = "[ None ]"
    } else {
        usedLettersDoc.textContent = usedLettersAry;
    }
      
    //print Initial WordMask
    wordObj["word"][wordSelector].split('').forEach(function(element) {
        var wordSearch = usedLettersAry.indexOf(element);
        if (wordSearch >= 0) {
            wordMask = wordMask + element + " ";
        } else {
            wordMask = wordMask + "_ ";
        }
    });
    wordMaskDoc.innerHTML = wordMask;
    winFlag = wordMask.includes("_");
    console.log(wordMask);
    console.log(winFlag);
}; //Close writeScreen

function checkWinLose() {
    if (winFlag == false || guessCnt < 1) {
        if (guessCnt < 1) { 
            gameDivDoc.innerHTML = "Game Over<br>You Lose!";
            hintDivDoc.innerHTML = "<img src=\"assets/images/hypnotoad.gif\">";
            var audio = new Audio("assets/sound/hpnotoadBuzz.mp3");
            audio.play();
            gameOver = true;
            loseCnt++;
        } else {
            gameDivDoc.innerHTML = "You Win!"
            hintDivDoc.innerHTML = "<img src=\"assets/images/"+wordObj["image"][wordSelector]+"\">"
            var audio = new Audio("assets/sound/"+wordObj["sound"][wordSelector]);
            audio.play();
            gameOver = true;
            winCnt++
        };
    };
}; //Close checkWinLose


// Event listener
document.onkeyup = function(event) {
    //if the game is finished, restart it.
    if(gameOver) {
        console.log("Game Over!")
        gameOver = false;
        restartGame();
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            // keySound.play();
            guessCnt--;                
            usedLettersAry.push(event.key);
            console.log(usedLettersAry);
            writeScreen();
            checkWinLose();
        }
    }
};

if (debugLogs == true) {
    // console.log(wordMask);
    console.log(wordObj);
    console.log("wordcount :" + wordObj["word"].length);
    console.log("hintcount :" + wordObj["hint"].length);
    console.log(wordSelector);
    console.log("Selected Word: " + wordObj["word"][wordSelector]);
    console.log(guessCnt);
    console.log(usedLettersAry);
  }