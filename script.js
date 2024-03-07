var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    clickingPower: 1,
    currentScale: 1,
    clickCount: 0,

    addToScore: function(amount){
        this.score += amount;
        this.totalScore += amount;
        display.updateScore();
    },
    
    getScorePerSecond: function(){
        var scorePerSecond = 0;
        for (i = 0; i < building.name.length; i++){
            scorePerSecond += building.income[i] * building.count[i];
        }
        return scorePerSecond;
    },
}

var building = {
    name: [
        "Cursor",
        "Valentine",
        "Autoclicker",
        "Rainbow"
    ],
    image: [
        "cursor.png",
        "valentine.png",
        "autoclicker.png",
        "rainbow.png"
    ],
    count: [0, 0, 0, 0, 0],
    income: [
        1,
        5,
        40,
        100
    ],
    cost: [
        15,
        100,
        1000,
        2000
    ],

    purchase: function(index){
        if(game.score >= this.cost[index]){
            game.score -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.10);
            display.updateClick();
            display.updateScore();
            display.updateShop();
            display.updateUpgrades();
        }
    }
};

var upgrade = {
    name: [
        "Stone Clicks",
        "Iron Clicks",
        "Diamond Clicks",
        "Stone Cursor",
        "Iron Cursor",
        "Diamond Cursor",
        "Red Valentine",
        "Rainbow Valentine",
        "Rainbow Autoclicker",
        "Shiny Rainbow"
    ],
    description: [
        "Clicks are now stronger (2 per click)",
        "You are a honored one... (10 per click)",
        "There is no one stronger than you... (25 per click)",
        "Cursors are now stronger (2 per second)",
        "You maked them... stone? (5 per second)",
        "HOW THE FUCK YOU DID THAT?? (10 per second)",
        "Now valentines look so special (15 per second)",
        "WOW, they are now only for special peoples (75 per second)",
        "Why you skiped stone and iron age? Nvm, it is rainbow now (200 per second)",
        "You are making rainbow shiny, but why we need smth shyniest than you? (500 per second)"
    ],
    image: [
        "stonecursor.png",
        "ironcursor.png",
        "diamondcursor.png",
        "stonecursor.png",
        "ironcursor.png",
        "diamondcursor.png",
        "redvalentine.png",
        "rainbowvalentine.png",
        "rainbowcursor.png",
        "shinyrainbow.png"
    ],
    type: [
        "click",
        "click",
        "click",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building"
    ],
    cost: [
        300,
        1000,
        5000,
        300,
        2500,
        10000,
        1500,
        10000,
        5000,
        0
    ],
    buildingIndex: [
        -1,
        -1,
        -1,
        0,
        0,
        0,
        1,
        1,
        2,
        3
    ],
    requirement: [
        100,
        500,
        1000,
        10,
        25,
        100,
        10,
        50,
        5,
        5
    ],
    bonus: [
        2,
        5,
        2.5,
        2,
        2.5,
        2,
        3,
        5,
        5,
        5
    ],

    purchased: [false, false, false, false, false, false, false, false, false, false],

    purchase: function(index){
        if (!this.purchased[index] && game.score >= this.cost[index]){
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.score -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]){
                game.score -= this.cost[index];
                game.clickingPower *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            }
        }
    }
};

var achievements = {
    name: [
        "Valentine #1",
        "Valentine #2",
        "Valentine #3",
        "Valentine #4",
        "Valentine #5",
        "Valentine #6",
        "Valentine #7",
        "Valentine #8",
        "Valentine #9",
        "Valentine #10",
        "Valentine #∞"
    ],
    description: [
        "You are making me feel lovely",
        "You are is important for me.",
        "I wish one day I could hug you.",
        "You are prettiest girl I ever seen.",
        "Sleep is important, sleep well.",
        "Your beauty is incalculable.",
        "You deserve everything.",
        "Your smile is beautiful, smile more often.",
        "I wish we could go out just once.",
        "If I could, I'd give anything to make you happy.",
        "My love is as endless for you as this game."
    ],
    image: [
        "love1.png",
        "love2.png",
        "love3.png",
        "love4.png",
        "love5.png",
        "love6.png",
        "love7.png",
        "love8.png",
        "love9.png",
        "love10.png",
        "love11.png"
    ],
    type: [
        "score",
        "score",
        "score",
        "score",
        "score",
        "score",
        "score",
        "score",
        "score",
        "score",
        "score"
    ],
    requirement: [
        100,
        1000,
        10000,
        25000,
        40000,
        75000,
        100000,
        150000,
        200000,
        250000,
        500000
    ],
    objectIndex:[
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
    ],
    awarded: [false, false, false, false, false, false, false, false, false, false, false],
    earn: function(index){
        this.awarded[index] = true;
    }
};

var display = {
    updateScore: function(){
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
        document.title = "[" + game.score + "] - Valentines Clicker";
    },

    updateShop: function(){
        document.getElementById("shop").innerHTML = "";
        for (i = 0; i < building.name.length; i++){
            document.getElementById("shop").innerHTML += '<table onclick="building.purchase('+i+')" class="shopButton"><tr><td id="image"><img src="./images/'+building.image[i]+'"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+' Hearts</span></p></td><td id="amount"><span id="cursors">'+building.count[i]+'</span></td></tr></table>';
        }
    },

    updateUpgrades: function(){
        document.getElementById("upgrade").innerHTML = "";
        for (i = 0; i < upgrade.name.length; i++){
            if (!upgrade.purchased[i]){
                if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){
                    document.getElementById("upgrade").innerHTML += '<img class="upgradebutton" src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' hearts)" onclick="upgrade.purchase('+i+')">';
                } else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]){
                    document.getElementById("upgrade").innerHTML += '<img class="upgradebutton" src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' hearts)" onclick="upgrade.purchase('+i+')">';
                }
            }
        }
    },
    updateClick: function(){
        document.getElementById("upgradeClick").innerHTML = game.clickingPower;
    },

    updateAchievements: function(){
        document.getElementById("achievementsContainer").innerHTML = "";
        for (i = 0; i < achievements.name.length; i++){
            if (achievements.awarded[i]){
                    document.getElementById("achievementsContainer").innerHTML += '<img class="achievement" src="images/'+achievements.image[i]+'" title="'+achievements.name[i]+' &#10; '+achievements.description[i]+'">';
                }
            }
    }
};

function saveGame() {
    var gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        clickingPower: game.clickingPower,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased,
        achievementsAwarded: achievements.awarded
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
};

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickingPower !== "undefined") game.clickingPower = savedGame.clickingPower;
        if (typeof savedGame.buildingCount !== "undefined") {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i];
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i];
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }
        }
        if (typeof savedGame.achievementsAwarded !== "undefined") {
            for (i = 0; i < savedGame.achievementsAwarded.length; i++) {
                achievements.awarded[i] = savedGame.achievementsAwarded[i];
            }
        }
    }
};

function resetGame(){
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
};

function randomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min);
}

function fadeOut(element, duration, finalOpacity, callback){
    let opacity = 1;

    let elementFadingInterval = window.setInterval(function(){
        opacity -= 50 / duration;

        if (opacity <= finalOpacity){
            clearInterval(elementFadingInterval);
            callback();
        }  

        element.style.opacity = opacity;
    }, 50)
};

function createNumberOnHeart(event){
    let heart = document.getElementById("heart");

    let heartOffset = heart.getBoundingClientRect();
    let position = {
        x: event.pageX - heartOffset.left + randomNumber(-5, 5),
        y: event.pageY - heartOffset.top + randomNumber(-5, 5)
    };

    let element = document.createElement("div");
    element.textContent = "+" + game.clickingPower;
    element.classList.add('number', "unselectable");
    element.style.left = position.x + "px";
    element.style.top = position.y + "px";

    heart.appendChild(element);

    let movementInterval = window.setInterval(function(){
        if (typeof element == "undefined" && element == null) clearInterval(movementInterval);

        position.y--;
        element.style.top = position.y + "px";
    }, 10);

    fadeOut(element, 3000, 0.5, function(){
        element.remove();
    });
}

document.getElementById("heart").addEventListener("click", function(){
    game.totalClicks++;
    game.addToScore(game.clickingPower);

    createNumberOnHeart(event);
}, false);

window.onload = function(){
    loadGame();
    display.updateScore();
    display.updateShop();
    display.updateUpgrades();
    display.updateAchievements();
};

setInterval(function(){
    for (i = 0; i < achievements.name.length; i++){
        if (achievements.type[i] == "score" && game.totalScore >= achievements.requirement[i]) achievements.earn(i);
        else if (achievements.type[i] == "click" && game.totalClicks >= achievements.requirement[i]) achievements.earn(i);
        else if (achievements.type[i] == "building" && building.count[achievements.objectIndex[i]] >= achievements.requirement[i]) achievements.earn(i);
    };

    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    display.updateClick();
    display.updateAchievements()
    display.updateScore();
}, 1000)

setInterval(function(){
    display.updateScore();
    display.updateUpgrades();
}, 10000)

setInterval(function(){
    saveGame();
}, 1000);

document.addEventListener('keydown', function(event){
    if (event.ctrlKey && event.which == 83){
        event.preventDefault();
    }
}, false);

function hoverOnLeft(){
    document.getElementById("button_yesd").classList.add("active")
}
function hoverOffLeft(){
    document.getElementById("button_yesd").classList.remove("active")
}
function hoverOnRight(){
    document.getElementById("button_nod").classList.add("active")
}
function hoverOffRight(){
    document.getElementById("button_nod").classList.remove("active")
}

function hideButton() {
    let button = document.getElementById('button_nod');
    button.style.display = 'none';
}

function mamaumerla() {
    const yes = document.getElementById("button_yesd")
    yes.style.opacity = '1'
    game.currentScale += 0.5;
    yes.style.transform = `scale(${game.currentScale})`;
    yes.style.transition = `all 0.2s ease`;

    game.clickCount++;

    if (game.clickCount >= 5) {
      hideButton();
    }
}
