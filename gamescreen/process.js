import { Player } from "./player.js";
import { BridgeTile } from "./bridgeTile.js";

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


let bridgeTiles = [];
for (let i = 0; i < 10; i++) {
  bridgeTiles.push(BridgeTile(context, 176 + 32 * i, 208));
}

const player = Player(context, 112, 192);

let result = [];
let submitted = false;
let finished = false;
let correct = false;
let targetX = 528;

export function setResult(val) {
  result = val;
}

export function setSubmitted(val) {
  submitted = val;
}

export function setCorrect(val) {
  correct = val;
}

function setFinished(val) {
  finished = val;
}

function sendSuccess() {
  console.log("success");
  document.getElementById("alertSuccess").style.display = "block";
  document.getElementById("alertFail").style.display = "none";
  document.getElementById("alertProblem").style.display = "none";
  document.getElementById("submit").disabled = false;
  setSubmitted(false);
}

function sendFail() {
  console.log("fail");
  document.getElementById("alertSuccess").style.display = "none";
  document.getElementById("alertFail").style.display = "block";
  document.getElementById("alertProblem").style.display = "none";
  document.getElementById("submit").disabled = false;
  setSubmitted(false);
}

function endAnimation() {
  setFinished(true);
  player.stop();
}

function dieAnimation() {
  setFinished(true);
  player.die();
}

function handleStepOnRed(x) {
  if (x == 176) {
    dieAnimation();
    setTimeout(sendFail, 500);
    return true;
  }

  return false;
}

function doFrame(now) {
    if (submitted && document.getElementById("submit").disabled === false) {
      document.getElementById("submit").disabled = true;
      setFinished(false);

      for (let i = 0; i < bridgeTiles.length; i++) {
        bridgeTiles[i].danger();
      }

      player.setXY(112, 192);
      player.move();
    }

    let nowPos = player.getXY();

    if (nowPos.x == targetX) {
      endAnimation();
      setTimeout(sendSuccess, 1000);
    }

    if (submitted && !correct) {
      handleStepOnRed(nowPos.x);
    }

    if (submitted && !finished) {
      player.setXY(nowPos.x + 1, nowPos.y);
    }

    if (submitted && correct) {
      for (let i = 0; i < bridgeTiles.length; i++) {
        bridgeTiles[i].safe();
      }
    }

    /* Update the sprites */
    for (let i = 0; i < bridgeTiles.length; i++) {
      bridgeTiles[i].update();
    }
    player.update(now);

    /* Clear the screen */
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the sprites */
    for (let i = 0; i < bridgeTiles.length; i++) {
      bridgeTiles[i].draw();
    }
    player.draw();

    /* Show Array */
    context.font = "20px Consolas";
    context.textAlign = "center";

    if (result.length > 0) {
      if (!correct) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "green";
      }

      for (let i = 0; i < 10; i++) {
        context.fillText(result[i], 176 + 32 * i, 284);
      }
    }   
    
    /* Process the next frame */
    requestAnimationFrame(doFrame);
}

/* Start the animation */
requestAnimationFrame(doFrame);