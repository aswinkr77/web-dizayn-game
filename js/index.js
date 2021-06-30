const captainFinn = document.getElementById("captain-finn");
const obstacles = document.getElementById("obstacles");
const gameOver = document.getElementById("game-over");
const restart = document.getElementById("restart");
const spaceJump = document.getElementById("space");
const point = document.getElementById("count");
const wordCloud = document.getElementById("word-cloud");

let start = false, stop = false, i = 3, generateObstaclesTimer, points = 0, cTop, cBottom, cRight, cLeft, oLeft, move = 0, collided;

// points counter
let pointsCounter = () => {
    if(!stop) {
        ++points;
        if(points < 10) 
            point.innerHTML = `000${points} Pts`;
        else if(points < 100)
            point.innerHTML = `00${points} Pts`;
        else if(points < 1000)
            point.innerHTML = `0${points} Pts`;
        else if(points < 9999999999)
            point.innerHTML = `${points} Pts`;
        else
            point.innerHTML = "9999999999 Pts"; //maximum points condition

        setTimeout(pointsCounter, 100);
    }
}

// remove jump ability of captain finn and also set gameover captain finn
let removeJump = () => {
    captainFinn.classList.remove("jump");
    if(!stop) {
        captainFinn.src = "assets/images/captain finn/1.png";
        i = 3;
    }
}

//add cloud animation
let cloudAnimation = () => {
    if(wordCloud.classList != "cloud")
        wordCloud.classList.add("cloud");
}

//remove cloud animation
let removeCloudAnimation = () => {
    wordCloud.classList.remove("cloud");
}

// add jump ability to captain and also set jump image of captain finn
let jump = () => {
    if(captainFinn.classList != "jump") {
        captainFinn.classList.add("jump");
        setTimeout(removeJump, 1000 * 0.7);
    }
}

// remove obstacles motion
let removeObstaclesMotion = () => {
    obstacles.classList.remove("obstacles-move");
}

// add motion to obstacles and also generate any of the three obstacles
let generateObstacles = () => {
    let randInt;
    if(obstacles.classList != "obstacles-move" && !stop) {
        randInt = Math.floor(Math.random() * 3 + 1); //creates a random number between [1, 3]
        obstacles.src = `assets/images/obstacles/${randInt}.png`;
        obstacles.classList.add("obstacles-move");
        setTimeout(removeObstaclesMotion, 1000 * 1.4);
    }

    generateObstaclesTimer = setTimeout(generateObstacles, 1000 * 1.6);
}

// checks for captain and obstacles collided or not and also moves captain forward and changes its walking style
let collisionCheck = () => {
    cTop = parseInt(getComputedStyle(captainFinn).top);
    cBottom = parseInt(getComputedStyle(captainFinn).bottom);
    cLeft = parseInt(getComputedStyle(captainFinn).left);
    cRight = parseInt(getComputedStyle(captainFinn).right);
    oLeft = parseInt(getComputedStyle(obstacles).left);

    if(Math.abs(oLeft - cLeft) <= 93 && cTop >= -1) {
        stop = true;
        gameOver.style.display = "flex";
        obstacles.classList.remove("obstacles-move");
        obstacles.style.left = `${oLeft}px`;
        captainFinn.style.top = `${cTop}px`;
        wordCloud.style.left = `${parseInt(getComputedStyle(wordCloud).left)}px`;
        captainFinn.src = "assets/images/captain finn/6.png";
        removeCloudAnimation();
        clearInterval(collided);
        clearTimeout(generateObstaclesTimer);
    } 

    move += 10;
    if(move % 100 === 0) {
        if(i > 7)
            i = 1;

        if(!(cRight <= 380)) //pauses captain finn at 380px from the right
            captainFinn.style.left = `${(move / 1000) * 5 + 1}px`; //moves captain finn forward

        if(cBottom === 0) { //sets different walking styles of captain finn when not jumping
            captainFinn.src = `assets/images/captain finn/${i}.png`;
            i += 2;
        } else // sets jump image of captain finn 
            captainFinn.src = "assets/images/captain finn/2.png";
    }
}

// checks for space key is pressed or not and if pressed starts the game
document.addEventListener("keydown", (event) => {
    if(event.key !== undefined && event.key === " " && !stop) {
        jump();
        if(!start) {
            setTimeout(generateObstacles, 2000);
            pointsCounter();
            spaceJump.style.visibility = "hidden";
            collided = setInterval(collisionCheck, 10);
            cloudAnimation();
        }

        start = true;
    } else if(event.keyCode !== undefined && event.keyCode === 32 && !stop) {
        jump();
        if(!start) {
            setTimeout(generateObstacles, 2000);
            pointsCounter();
            spaceJump.style.visibility = "hidden";
            collided = setInterval(collisionCheck, 10);
            cloudAnimation();
        }

        start = true;
    }
});

//restart game
restart.addEventListener("click", () => {
    gameOver.style.display = "none";
    point.innerHTML = "0000 Pts";
    spaceJump.style.visibility = "visible";
    captainFinn.style.left = "0";
    captainFinn.style.bottom = "0";
    captainFinn.src = "assets/images/captain finn/1.png"
    captainFinn.style.removeProperty("top");
    obstacles.style.removeProperty("left");
    wordCloud.style.removeProperty("left");
    clearTimeout(generateObstaclesTimer);
    i = 3;
    move = 0;
    points = 0;
    start = false;
    stop = false;
});