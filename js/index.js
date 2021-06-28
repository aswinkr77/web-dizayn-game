const captainFinn = document.getElementById("captain-finn");
const obstacles = document.getElementById("obstacles");
const gameOver = document.getElementById("game-over");
const restart = document.getElementById("restart");
const spaceJump = document.getElementById("space");

let start = false, stop = false, i = 3;;

let removeJump = () => {
    captainFinn.classList.remove("jump");
    if(stop) 
        captainFinn.src = "../assets/images/captain finn/6.png";
    else {
        captainFinn.src = "../assets/images/captain finn/1.png";
        i = 3;
    }
}

let jump = () => {
    if (captainFinn.classList != "jump") {
        captainFinn.classList.add("jump");
        captainFinn.src = "../assets/images/captain finn/2.png"
        setTimeout(removeJump, 1000 * 0.7);
    }

    setTimeout(() => {
        if(obstacles.classList != "obstacles-move") {
            obstacles.classList.add("obstacles-move")
        }
    }, 1);
}

let restartGame = () => {

}

let cTop, cRight, cLeft, oRight, oLeft, move = 0;
let collisionCheck = () => {
    cTop = parseInt(getComputedStyle(captainFinn).top);
    cLeft = parseInt(getComputedStyle(captainFinn).left);
    oLeft = parseInt(getComputedStyle(obstacles).left);

    if(Math.abs(oLeft - cLeft) <= 93 && cTop >= -1) {
        stop = true;
        gameOver.style.display = "flex";
        obstacles.classList.remove("obstacles-move");
        obstacles.style.left = `${oLeft}px`;
        captainFinn.style.top = `${cTop}px`;
        clearInterval(collided);
    } 
    move+=10;
    if(move%1000 === 0) {
        if(i > 7)
            i = 1
        
        captainFinn.style.left = `${(move/1000) * 5 + 1}px`;
        captainFinn.src = `../assets/images/captain finn/${i}.png`;
        i += 2;
    }
}

let collided = setInterval(collisionCheck, 10);

document.addEventListener("keydown", (event) => {
    if(event.key !== undefined && event.key === " " && !stop) {
        jump();
        if(!start) {
            changeCaptain();
            spaceJump.style.visibility = "hidden";
        }

        start = true;
    } else if(event.keyCode !== undefined && event.keyCode === 32 && !stop) {
        jump();
        if(!start) {
            changeCaptain();
            spaceJump.style.visibility = "hidden";
        }

        start = true;
    }
});
