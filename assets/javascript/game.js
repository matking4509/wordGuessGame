// Toggle console.logs for debugging.
var debugLogs = false;

// Define Dictionary Object 
var wordObj = {
    word : ["professor",
            "fry",
            "leela"],
    hint : ["He's a cranky old nephew with Good News for all!",
            "He's a Young Redheaded Uncle, who really loves his one-eye'd monster",
            "She's the one-eyed, purple pony tailed, package pusher"],
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
  var winCntDoc = document.getElementById("wins");
  var lossCntDoc = document.getElementById("loss");
  var htIntro = new Audio("assets/sound/allhailhynotoad.mp3");
  htIntro.play();
function newGame() {
    gameStart();
    writeScreen();
}; // Close newGame

function restartGame() {
    debugLogs == true ? console.log("Game Restarted") : true;
    guessCnt = 10; // Total Number of Guesses per game
    usedLettersAry = []; // Blank Array to hold Guessed letters
    wordSelector = '';
    winFlag = true;
    gameOver = false;
    hintDivDoc.innerHTML = "<p>Hint:</p><div class=\"card\"><p><span id=\"hint\">This is where the Hints go</span></p></div";
    gameDivDoc.innerHTML = "<p>Data:</p><div class=\"card\"><p><span id=\"word-mask\">Waiting on Word...</span></p><p> <span id=\"used-letters\">You have typed no Letters</span></p><p>You have <span id=\"guess-count\">XX</span> guesses remaining</p></div>"
    // Reassert the <span> ids so the writeScreen can find them to update.
    hintDoc = document.getElementById("hint");
    guessCntDoc = document.getElementById("guess-count");
    usedLettersDoc = document.getElementById("used-letters");
    wordMaskDoc = document.getElementById("word-mask");
    // winCntDoc = document.getElementById("wins");
    // lossCntDoc = document.getElementById("loss");
    gameStart();
    htIntro.play(); //
    writeScreen();
}

function gameStart() {
    // Select random number, that will select word/hint/image/sound from data dictionary.  
    wordSelector = Math.floor(Math.random()*wordObj["word"].length)
}; // Close gameStart

function writeScreen() {
    var wordMask = '';
    // Update Wins / Loss
    winCntDoc.textContent = winCnt;
    lossCntDoc.textContent = loseCnt;
    //print Hint 
    hintDoc.textContent = wordObj["hint"][wordSelector];
    debugLogs == true ? console.log("blah: " + wordObj["hint"][wordSelector]) : true;
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
    debugLogs == true ? console.log(wordMask) : true;
    debugLogs == true ? console.log(winFlag) : true;
}; //Close writeScreen

function checkWinLose() {
    if (winFlag == false || guessCnt < 1) {
        if (guessCnt < 1) { 
            gameDivDoc.innerHTML = "Game Over<br><h2>You have ANGERED the Hypnotoad!</h2><br><h4>Press a key to redeem youself!</h4>";
            hintDivDoc.innerHTML = "<img src=\"assets/images/hypnotoad.gif\" width=100%>";
            var audio = new Audio("assets/sound/hpnotoadBuzz.mp3");
            audio.play();
            gameOver = true;
            loseCnt++;
        } else {
            gameDivDoc.innerHTML = "You have succeeded, <h2>All Glory to the Hypnotoad!</h2><br><h4>Press a key to give more GLORY!</h4>"
            hintDivDoc.innerHTML = "<img src=\"assets/images/"+wordObj["image"][wordSelector]+"\" width=100%>"
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
        debugLogs == true ? console.log("Game Over!") : true;
        gameOver = false;
        restartGame();
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            guessCnt--;                
            usedLettersAry.push(event.key);
            debugLogs == true ? console.log(usedLettersAry) : true;
            writeScreen();
            checkWinLose();
        }
    }
};

if (debugLogs == true) {
    debugLogs == true ? console.log(wordObj) : true;
    debugLogs == true ? console.log("wordcount :" + wordObj["word"].length) : true;
    debugLogs == true ? console.log("hintcount :" + wordObj["hint"].length) : true;
    debugLogs == true ? console.log(wordSelector) : true;
    debugLogs == true ? console.log("Selected Word: " + wordObj["word"][wordSelector]) : true;
    debugLogs == true ? console.log(guessCnt) : true;
    debugLogs == true ? console.log(usedLettersAry) : true;
  }