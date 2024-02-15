var score = 0;
var clickingPower = 1;

var cursorCost = 15;
var cursors = 1;
var valentineCost = 100;
var valentines = 0;
var autoclickers = 0;
var autoclickerCost = 1000;


setInterval(function() {
    score = score + valentines * 5 + autoclickers * clickingPower;
    document.getElementById("score").innerHTML = score;
    
    document.title = "[" + score + "] - Valentines Clicker"
}, 1000);

setInterval(function(){
    saveGame();
}, 30000);

document.addEventListener('keydown', function(event){
    if (event.ctrlKey && event.which == 83){
        event.preventDefault();
    }
}, false);

window.onload = function(){
    loadGame();
    updateScorePerSecond();
    document.getElementById("score").innerHTML = score;
    document.getElementById("cursorcost").innerHTML = cursorCost;
    document.getElementById("cursors").innerHTML = cursors;
    document.getElementById("valentinecost").innerHTML = valentineCost;
    document.getElementById("valentines").innerHTML = valentines;
};

function saveGame(){
    var gameSave = {
        score: score,
        clickingPower: clickingPower,
        cursorCost: cursorCost,
        cursors: cursors,
        valentineCost: valentineCost,
        valentines: valentines
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
};

function resetGame(){
    if(confirm("Are you sure you want to reset your game?")){
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
};

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (typeof savedGame.score !== "undefined") score = savedGame.score;
    if (typeof savedGame.clickingPower !== "undefined") clickingPower = savedGame.clickingPower;
    if (typeof savedGame.cursorCost !== "undefined") cursorCost = savedGame.cursorCost;
    if (typeof savedGame.cursors !== "undefined") cursors = savedGame.cursors;
    if (typeof savedGame.valentineCost !== "undefined") valentineCost = savedGame.valentineCost;
    if (typeof savedGame.valentines !== "undefined") valentines = savedGame.valentines;
};

function buyCursor(){
    if (score >=  cursorCost)  {
        score = score - cursorCost;
        cursors = cursors + 1;
        clickingPower = cursors * 1;
        cursorCost = Math.round(cursorCost * 1.5);

        document.getElementById("score").innerHTML = score;
        document.getElementById("cursorcost").innerHTML = cursorCost;
        document.getElementById("cursors").innerHTML = cursors;
    }
};

function buyValentine(){
    if (score >=  valentineCost)  {
        score = score - valentineCost;
        valentines = valentines + 1;
        valentineCost = Math.round(valentineCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("valentinecost").innerHTML = valentineCost;
        document.getElementById("valentines").innerHTML = valentines;
        updateScorePerSecond();
    }
};

function buyAutoclicker(){
    if (score >=  autoclickerCost)  {
        score = score - autoclickerCost;
        autoclickers = autoclickers + 1;
        autoclickerCost = Math.round(autoclickerCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("autoclickercost").innerHTML = autoclickerCost;
        document.getElementById("autoclickers").innerHTML = autoclickers;
        updateScorePerSecond();
    }
};

setInterval(function updateScorePerSecond(){
    scorePerSecond = valentines * 5 + autoclickers * clickingPower;
    document.getElementById("scorepersecond").innerHTML = scorePerSecond;
},100);

function addToScore(amount){
    score = score + amount;
    document.getElementById("score").innerHTML = score;
};
