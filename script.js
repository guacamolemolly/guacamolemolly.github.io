/*



If you want to know how this game was made, check out this video, that explains how it's made: 

https://youtu.be/eue3UdFvwPo

Follow me on twitter for more: https://twitter.com/HunorBorbely

*/

// Extend the base functionality of JavaScript
Array.prototype.last = function () {
  return this[this.length - 1];
};

// A sinus function that acceps degrees instead of radians
Math.sinus = function (degree) {
  return Math.sin((degree / 180) * Math.PI);
};

// Game data
let phase = "waiting"; // waiting | stretching | turning | walking | transitioning | falling
let lastTimestamp; // The timestamp of the previous requestAnimationFrame cycle

let heroX; // Changes when moving forward
let heroY; // Only changes when falling
let sceneOffset; // Moves the whole game

let platforms = [];
let sticks = [];
let trees = [];

// Todo: Save high score to localStorage (?)

let score = 0;

// Configuration
const canvasWidth = 375;
const canvasHeight = 375;
const platformHeight = 100;
const heroDistanceFromEdge = 10; // While waiting
const paddingX = 100; // The waiting position of the hero in from the original canvas size
const perfectAreaSize = 10;

// The background moves slower than the hero
const backgroundSpeedMultiplier = 0.2;

const hill1BaseHeight = 100;
const hill1Amplitude = 10;
const hill1Stretch = 1;
const hill2BaseHeight = 70;
const hill2Amplitude = 20;
const hill2Stretch = 0.5;

const stretchingSpeed = 4; // Milliseconds it takes to draw a pixel
const turningSpeed = 4; // Milliseconds it takes to turn a degree
const walkingSpeed = 4;
const transitioningSpeed = 2;
const fallingSpeed = 2;

const heroWidth = 90; // 24
const heroHeight = 99; // 40

const canvas = document.getElementById("game");
canvas.width = window.innerWidth; // Make the Canvas full screen
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const introductionElement = document.getElementById("introduction");
const perfectElement = document.getElementById("perfect");
const restartButton = document.getElementById("restart");
const scoreElement = document.getElementById("score");

const base_image = new Image();
base_image.src = 'images/hero.png';

//frames v1
const frame_1 = new Image();
frame_1.src = 'frames/frame_01.png';
const frame_2 = new Image();
frame_2.src = 'frames/frame_02.png';
const frame_3 = new Image();
frame_3.src = 'frames/frame_03.png';
const frame_4 = new Image();
frame_4.src = 'frames/frame_04.png';
const frame_5 = new Image();
frame_5.src = 'frames/frame_05.png';
const frame_6 = new Image();
frame_6.src = 'frames/frame_06.png';
const frame_7 = new Image();
frame_7.src = 'frames/frame_07.png';
const frame_8 = new Image();
frame_8.src = 'frames/frame_08.png';
const frame_9 = new Image();
frame_9.src = 'frames/frame_09.png';
const frame_10 = new Image();
frame_10.src = 'frames/frame_10.png';
const frame_11 = new Image();
frame_11.src = 'frames/frame_11.png';
const frame_12 = new Image();
frame_12.src = 'frames/frame_12.png';
const frame_13 = new Image();
frame_13.src = 'frames/frame_13.png';
const frame_14 = new Image();
frame_14.src = 'frames/frame_14.png';
const frame_15 = new Image();
frame_15.src = 'frames/frame_15.png';
const frame_16 = new Image();
frame_16.src = 'frames/frame_16.png';
const frame_17 = new Image();
frame_17.src = 'frames/frame_17.png';
const frame_18 = new Image();
frame_18.src = 'frames/frame_18.png';
const frame_19 = new Image();
frame_19.src = 'frames/frame_19.png';
const frame_20 = new Image();
frame_20.src = 'frames/frame_20.png';
const frame_21 = new Image();
frame_21.src = 'frames/frame_21.png';
const frame_22 = new Image();
frame_22.src = 'frames/frame_22.png';
const frame_23 = new Image();
frame_23.src = 'frames/frame_23.png';
const frame_24 = new Image();
frame_24.src = 'frames/frame_24.png';
const frame_25 = new Image();
frame_25.src = 'frames/frame_25.png';
const frame_26 = new Image();
frame_26.src = 'frames/frame_26.png';
const frame_27 = new Image();
frame_27.src = 'frames/frame_27.png';
const frame_28 = new Image();
frame_28.src = 'frames/frame_28.png';
const frame_29 = new Image();
frame_29.src = 'frames/frame_29.png';
const frame_30 = new Image();
frame_30.src = 'frames/frame_30.png';

//frames v2
const frameV2_1 = new Image();
frameV2_1.src = 'frames_v2/frame_01.png';
const frameV2_2 = new Image();
frameV2_2.src = 'frames_v2/frame_02.png';
const frameV2_3 = new Image();
frameV2_3.src = 'frames_v2/frame_03.png';
const frameV2_4 = new Image();
frameV2_4.src = 'frames_v2/frame_04.png';
const frameV2_5 = new Image();
frameV2_5.src = 'frames_v2/frame_05.png';
const frameV2_6 = new Image();
frameV2_6.src = 'frames_v2/frame_06.png';
const frameV2_7 = new Image();
frameV2_7.src = 'frames_v2/frame_07.png';
const frameV2_8 = new Image();
frameV2_8.src = 'frames_v2/frame_08.png';
const frameV2_9 = new Image();
frameV2_9.src = 'frames_v2/frame_09.png';
const frameV2_10 = new Image();
frameV2_10.src = 'frames_v2/frame_10.png';
const frameV2_11 = new Image();
frameV2_11.src = 'frames_v2/frame_11.png';
const frameV2_12 = new Image();
frameV2_12.src = 'frames_v2/frame_12.png';
const frameV2_13 = new Image();
frameV2_13.src = 'frames_v2/frame_13.png';
const frameV2_14 = new Image();
frameV2_14.src = 'frames_v2/frame_14.png';
const frameV2_15 = new Image();
frameV2_15.src = 'frames_v2/frame_15.png';
const frameV2_16 = new Image();
frameV2_16.src = 'frames_v2/frame_16.png';
const frameV2_17 = new Image();
frameV2_17.src = 'frames_v2/frame_17.png';
const frameV2_18 = new Image();
frameV2_18.src = 'frames_v2/frame_18.png';
const frameV2_19 = new Image();
frameV2_19.src = 'frames_v2/frame_19.png';
const frameV2_20 = new Image();
frameV2_20.src = 'frames_v2/frame_20.png';
const frameV2_21 = new Image();
frameV2_21.src = 'frames_v2/frame_21.png';
const frameV2_22 = new Image();
frameV2_22.src = 'frames_v2/frame_22.png';
const frameV2_23 = new Image();
frameV2_23.src = 'frames_v2/frame_23.png';
const frameV2_24 = new Image();
frameV2_24.src = 'frames_v2/frame_24.png';
const frameV2_25 = new Image();
frameV2_25.src = 'frames_v2/frame_25.png';
const frameV2_26 = new Image();
frameV2_26.src = 'frames_v2/frame_26.png';
const frameV2_27 = new Image();
frameV2_27.src = 'frames_v2/frame_27.png';
const frameV2_28 = new Image();
frameV2_28.src = 'frames_v2/frame_28.png';
const frameV2_29 = new Image();
frameV2_29.src = 'frames_v2/frame_29.png';
const frameV2_30 = new Image();
frameV2_30.src = 'frames_v2/frame_30.png';

//frames v3
const framev3_1 = new Image();
framev3_1.src = 'frames_v3/frame_01.png';
const framev3_2 = new Image();
framev3_2.src = 'frames_v3/frame_02.png';
const framev3_3 = new Image();
framev3_3.src = 'frames_v3/frame_03.png';
const framev3_4 = new Image();
framev3_4.src = 'frames_v3/frame_04.png';
const framev3_5 = new Image();
framev3_5.src = 'frames_v3/frame_05.png';
const framev3_6 = new Image();
framev3_6.src = 'frames_v3/frame_06.png';
const framev3_7 = new Image();
framev3_7.src = 'frames_v3/frame_07.png';
const framev3_8 = new Image();
framev3_8.src = 'frames_v3/frame_08.png';
const framev3_9 = new Image();
framev3_9.src = 'frames_v3/frame_09.png';
const framev3_10 = new Image();
framev3_10.src = 'frames_v3/frame_10.png';
const framev3_11 = new Image();
framev3_11.src = 'frames_v3/frame_11.png';
const framev3_12 = new Image();
framev3_12.src = 'frames_v3/frame_12.png';
const framev3_13 = new Image();
framev3_13.src = 'frames_v3/frame_13.png';
const framev3_14 = new Image();
framev3_14.src = 'frames_v3/frame_14.png';
const framev3_15 = new Image();
framev3_15.src = 'frames_v3/frame_15.png';
const framev3_16 = new Image();
framev3_16.src = 'frames_v3/frame_16.png';
const framev3_17 = new Image();
framev3_17.src = 'frames_v3/frame_17.png';
const framev3_18 = new Image();
framev3_18.src = 'frames_v3/frame_18.png';
const framev3_19 = new Image();
framev3_19.src = 'frames_v3/frame_19.png';
const framev3_20 = new Image();
framev3_20.src = 'frames_v3/frame_20.png';
const framev3_21 = new Image();
framev3_21.src = 'frames_v3/frame_21.png';
const framev3_22 = new Image();
framev3_22.src = 'frames_v3/frame_22.png';
const framev3_23 = new Image();
framev3_23.src = 'frames_v3/frame_23.png';
const framev3_24 = new Image();
framev3_24.src = 'frames_v3/frame_24.png';
const framev3_25 = new Image();
framev3_25.src = 'frames_v3/frame_25.png';
const framev3_26 = new Image();
framev3_26.src = 'frames_v3/frame_26.png';
const framev3_27 = new Image();
framev3_27.src = 'frames_v3/frame_27.png';
const framev3_28 = new Image();
framev3_28.src = 'frames_v3/frame_28.png';
const framev3_29 = new Image();
framev3_29.src = 'frames_v3/frame_29.png';
const framev3_30 = new Image();
framev3_30.src = 'frames_v3/frame_30.png';

//frames v4
const framev4_1 = new Image();
framev4_1.src = 'frames_v4/frame_01.png';
const framev4_2 = new Image();
framev4_2.src = 'frames_v4/frame_02.png';
const framev4_3 = new Image();
framev4_3.src = 'frames_v4/frame_03.png';
const framev4_4 = new Image();
framev4_4.src = 'frames_v4/frame_04.png';
const framev4_5 = new Image();
framev4_5.src = 'frames_v4/frame_05.png';
const framev4_6 = new Image();
framev4_6.src = 'frames_v4/frame_06.png';
const framev4_7 = new Image();
framev4_7.src = 'frames_v4/frame_07.png';
const framev4_8 = new Image();
framev4_8.src = 'frames_v4/frame_08.png';
const framev4_9 = new Image();
framev4_9.src = 'frames_v4/frame_09.png';
const framev4_10 = new Image();
framev4_10.src = 'frames_v4/frame_10.png';
const framev4_11 = new Image();
framev4_11.src = 'frames_v4/frame_11.png';
const framev4_12 = new Image();
framev4_12.src = 'frames_v4/frame_12.png';
const framev4_13 = new Image();
framev4_13.src = 'frames_v4/frame_13.png';
const framev4_14 = new Image();
framev4_14.src = 'frames_v4/frame_14.png';
const framev4_15 = new Image();
framev4_15.src = 'frames_v4/frame_15.png';
const framev4_16 = new Image();
framev4_16.src = 'frames_v4/frame_16.png';
const framev4_17 = new Image();
framev4_17.src = 'frames_v4/frame_17.png';
const framev4_18 = new Image();
framev4_18.src = 'frames_v4/frame_18.png';
const framev4_19 = new Image();
framev4_19.src = 'frames_v4/frame_19.png';
const framev4_20 = new Image();
framev4_20.src = 'frames_v4/frame_20.png';
const framev4_21 = new Image();
framev4_21.src = 'frames_v4/frame_21.png';
const framev4_22 = new Image();
framev4_22.src = 'frames_v4/frame_22.png';
const framev4_23 = new Image();
framev4_23.src = 'frames_v4/frame_23.png';
const framev4_24 = new Image();
framev4_24.src = 'frames_v4/frame_24.png';
const framev4_25 = new Image();
framev4_25.src = 'frames_v4/frame_25.png';
const framev4_26 = new Image();
framev4_26.src = 'frames_v4/frame_26.png';
const framev4_27 = new Image();
framev4_27.src = 'frames_v4/frame_27.png';
const framev4_28 = new Image();
framev4_28.src = 'frames_v4/frame_28.png';
const framev4_29 = new Image();
framev4_29.src = 'frames_v4/frame_29.png';
const framev4_30 = new Image();
framev4_30.src = 'frames_v4/frame_30.png';

//Sounds
var music_lilUziVert = new Audio('sounds/lilUziVert.mp3');


// Initialize layout
resetGame();

// Resets game variables and layouts but does not start the game (game starts on keypress)
function resetGame() {
  // Reset game progress
  phase = "waiting";
  lastTimestamp = undefined;
  sceneOffset = 0;
  score = 0;

  introductionElement.style.opacity = 1;
  perfectElement.style.opacity = 0;
  restartButton.style.display = "none";
  scoreElement.innerText = score;

  // The first platform is always the same
  // x + w has to match paddingX
  platforms = [{ x: 50, w: 50 }];
  generatePlatform();
  generatePlatform();
  generatePlatform();
  generatePlatform();

  sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];

  trees = [];
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();
  generateTree();

  heroX = platforms[0].x + platforms[0].w - heroDistanceFromEdge;
  heroY = 0;

  draw();
  music_lilUziVert.pause()
}

function generateTree() {
  const minimumGap = 30;
  const maximumGap = 150;

  // X coordinate of the right edge of the furthest tree
  const lastTree = trees[trees.length - 1];
  let furthestX = lastTree ? lastTree.x : 0;

  const x =
    furthestX +
    minimumGap +
    Math.floor(Math.random() * (maximumGap - minimumGap));

  const treeColors = ["#6D8821", "#8FAC34", "#98B333"];
  const color = treeColors[Math.floor(Math.random() * 3)];

  trees.push({ x, color });
}

function generatePlatform() {
  const minimumGap = 40;
  const maximumGap = 200;
  const minimumWidth = 20;
  const maximumWidth = 100;

  // X coordinate of the right edge of the furthest platform
  const lastPlatform = platforms[platforms.length - 1];
  let furthestX = lastPlatform.x + lastPlatform.w;

  const x =
    furthestX +
    minimumGap +
    Math.floor(Math.random() * (maximumGap - minimumGap));
  const w =
    minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));

  platforms.push({ x, w });
}

resetGame();

// If space was pressed restart the game
window.addEventListener("keydown", function (event) {
  if (event.key == " ") {
    event.preventDefault();
    resetGame();
    return;
  }
});

window.addEventListener("mousedown", function (event) {
  if (phase == "waiting") {
    lastTimestamp = undefined;
    introductionElement.style.opacity = 0;
    phase = "stretching";
    window.requestAnimationFrame(animate);
  }
});

window.addEventListener("mouseup", function (event) {
  if (phase == "stretching") {
    phase = "turning";
  }
});

window.addEventListener("resize", function (event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
});

window.requestAnimationFrame(animate);

// The main game loop
function animate(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
    window.requestAnimationFrame(animate);
    return;
  }

  switch (phase) {
    case "waiting":
      return; // Stop the loop
    case "stretching": {
      sticks.last().length += (timestamp - lastTimestamp) / stretchingSpeed;
      break;
    }
    case "turning": {
      sticks.last().rotation += (timestamp - lastTimestamp) / turningSpeed;

      if (sticks.last().rotation > 90) {
        sticks.last().rotation = 90;

        const [nextPlatform, perfectHit] = thePlatformTheStickHits();
        if (nextPlatform) {
          // Increase score
          score += perfectHit ? 2 : 1;
          scoreElement.innerText = score;

          if (perfectHit) {
            perfectElement.style.opacity = 1;
            setTimeout(() => (perfectElement.style.opacity = 0), 1000);
          }

          generatePlatform();
          generateTree();
          generateTree();
        }

        phase = "walking";
      }
      break;
    }
    case "walking": {
      heroX += (timestamp - lastTimestamp) / walkingSpeed;

      const [nextPlatform] = thePlatformTheStickHits();
      if (nextPlatform) {
        // If hero will reach another platform then limit it's position at it's edge
        const maxHeroX = nextPlatform.x + nextPlatform.w - heroDistanceFromEdge;
        if (heroX > maxHeroX) {
          heroX = maxHeroX;
          phase = "transitioning";
        }
      } else {
        // If hero won't reach another platform then limit it's position at the end of the pole
        const maxHeroX = sticks.last().x + sticks.last().length + heroWidth;
        if (heroX > maxHeroX) {
          heroX = maxHeroX;
          phase = "falling";
        }
      }
      break;
    }
    case "transitioning": {
      sceneOffset += (timestamp - lastTimestamp) / transitioningSpeed;

      const [nextPlatform] = thePlatformTheStickHits();
      if (sceneOffset > nextPlatform.x + nextPlatform.w - paddingX) {
        // Add the next step
        sticks.push({
          x: nextPlatform.x + nextPlatform.w,
          length: 0,
          rotation: 0
        });
        phase = "waiting";
      }
      break;
    }
    case "falling": {
      if (sticks.last().rotation < 180)
        sticks.last().rotation += (timestamp - lastTimestamp) / turningSpeed;

      heroY += (timestamp - lastTimestamp) / fallingSpeed;
      const maxHeroY =
        platformHeight + 100 + (window.innerHeight - canvasHeight) / 2;
      if (heroY > maxHeroY) {
        restartButton.style.display = "block";
        return;
      }
      break;
    }
    default:
      throw Error("Wrong phase");
  }

  draw();
  window.requestAnimationFrame(animate);

  lastTimestamp = timestamp;
}

// Returns the platform the stick hit (if it didn't hit any stick then return undefined)
function thePlatformTheStickHits() {
  if (sticks.last().rotation != 90)
    throw Error(`Stick is ${sticks.last().rotation}°`);
  const stickFarX = sticks.last().x + sticks.last().length;

  const platformTheStickHits = platforms.find(
    (platform) => platform.x < stickFarX && stickFarX < platform.x + platform.w
  );

  // If the stick hits the perfect area
  if (
    platformTheStickHits &&
    platformTheStickHits.x + platformTheStickHits.w / 2 - perfectAreaSize / 2 <
      stickFarX &&
    stickFarX <
      platformTheStickHits.x + platformTheStickHits.w / 2 + perfectAreaSize / 2
  )
    return [platformTheStickHits, true];

  return [platformTheStickHits, false];
}

function draw() {
  ctx.save();
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  drawBackground();

  // Center main canvas area to the middle of the screen
  ctx.translate(
    (window.innerWidth - canvasWidth) / 2 - sceneOffset,
    (window.innerHeight - canvasHeight) / 2
  );

  // Draw scene
  drawPlatforms();
  drawHero();
  drawSticks();
  drawIndicator ();

  // Restore transformation
  ctx.restore();
}

restartButton.addEventListener("click", function (event) {
  event.preventDefault();
  resetGame();
  restartButton.style.display = "none";
});

function drawPlatforms() {
  platforms.forEach(({ x, w }) => {
    // Draw platform
    ctx.fillStyle = "black";
    ctx.fillRect(
      x,
      canvasHeight - platformHeight,
      w,
      platformHeight + (window.innerHeight - canvasHeight) / 2
    );

    // Draw perfect area only if hero did not yet reach the platform
    if (sticks.last().x < x) {
      ctx.fillStyle = "red";
      ctx.fillRect(
        x + w / 2 - perfectAreaSize / 2,
        canvasHeight - platformHeight,
        perfectAreaSize,
        perfectAreaSize
      );
    }
  });
}

function drawIndicator (){
	if (score == 3) {
		let ez_image = new Image();
		ez_image.src = 'images/ez.png';
		ez_image.onload = function(){
    	ctx.drawImage(ez_image, canvasWidth/2, canvasHeight/2);
  		}
	}
	if (score == 6 ) {
		let subprise_image = new Image();
		subprise_image.src = 'images/subprise.png';
		subprise_image.onload = function(){
    	ctx.drawImage(subprise_image, canvasWidth/2, canvasHeight/2);
  		}
	}
	if (score == 9 || score == 10)  {
		let house_image = new Image();
		house_image.src = 'images/house.png';
		house_image.onload = function(){
    	ctx.drawImage(house_image, canvasWidth/2, canvasHeight/2);
  		}
	}
}

function drawAnimatedHeroV1(milliseconds){
  if (milliseconds > 0 && milliseconds <= 33) {
  	ctx.drawImage(frame_1, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_1")
  }
  else if (milliseconds > 33 && milliseconds <= 66) {
  	ctx.drawImage(frame_2, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_2")
  }
  else if (milliseconds > 66 && milliseconds <= 99) {
  	ctx.drawImage(frame_3, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_3")
  }
  else if (milliseconds > 99 && milliseconds <= 132) {
  	ctx.drawImage(frame_4, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_4")
  }
  else if (milliseconds > 132 && milliseconds <= 165) {
  	ctx.drawImage(frame_5, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_5")
  }
  else if (milliseconds > 165 && milliseconds <= 198) {
  	ctx.drawImage(frame_6, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_6")
  }
  else if (milliseconds > 198 && milliseconds <= 231) {
  	ctx.drawImage(frame_7, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_7")
  }
  else if (milliseconds > 231 && milliseconds <= 264) {
  	ctx.drawImage(frame_8, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_8")
  }
  else if (milliseconds > 264 && milliseconds <= 297) {
  	ctx.drawImage(frame_9, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_9")
  }
  else if (milliseconds > 297 && milliseconds <= 330) {
  	ctx.drawImage(frame_10, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_10")
  }
  else if (milliseconds > 330 && milliseconds <= 363) {
  	ctx.drawImage(frame_11, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_11")
  }
  else if (milliseconds > 363 && milliseconds <= 396) {
  	ctx.drawImage(frame_12, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_12")
  }
  else if (milliseconds > 396 && milliseconds <= 429) {
  	ctx.drawImage(frame_13, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_13")
  }
  else if (milliseconds > 429 && milliseconds <= 462) {
  	ctx.drawImage(frame_14, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_14")
  }
  else if (milliseconds > 462 && milliseconds <= 495) {
  	ctx.drawImage(frame_15, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_15")
  }
  else if (milliseconds > 495 && milliseconds <= 528) {
  	ctx.drawImage(frame_16, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_16")
  }
  else if (milliseconds > 528 && milliseconds <= 561) {
  	ctx.drawImage(frame_17, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_17")
  }
  else if (milliseconds > 561 && milliseconds <= 594) {
  	ctx.drawImage(frame_18, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_18")
  }
  else if (milliseconds > 594 && milliseconds <= 627) {
  	ctx.drawImage(frame_19, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_19")
  }
  else if (milliseconds > 627 && milliseconds <= 660) {
  	ctx.drawImage(frame_20, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_20")
  }
  else if (milliseconds > 660 && milliseconds <= 693) {
  	ctx.drawImage(frame_21, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_21")
  }
  else if (milliseconds > 693 && milliseconds <= 726) {
  	ctx.drawImage(frame_22, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_22")
  }
  else if (milliseconds > 726 && milliseconds <= 792) {
  	ctx.drawImage(frame_23, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_23")
  }
  else if (milliseconds > 792 && milliseconds <= 792) {
  	ctx.drawImage(frame_24, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_24")
  }
  else if (milliseconds > 792 && milliseconds <= 825) {
  	ctx.drawImage(frame_25, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_25")
  }
  else if (milliseconds > 825 && milliseconds <= 858) {
  	ctx.drawImage(frame_26, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_26")
  }
  else if (milliseconds > 858 && milliseconds <= 891) {
  	ctx.drawImage(frame_27, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_27")
  }
  else if (milliseconds > 891 && milliseconds <= 924) {
  	ctx.drawImage(frame_28, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_28")
  }
  else if (milliseconds > 924 && milliseconds <= 957) {
  	ctx.drawImage(frame_29, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_29")
  }
  else if (milliseconds > 957 && milliseconds <= 999) {
  	ctx.drawImage(frame_30, -heroWidth / 2, -heroHeight / 2);
  	console.log("frame_30")
  }
}

function drawAnimatedHeroV2(milliseconds){
  if (milliseconds > 0 && milliseconds <= 33) {
  	ctx.drawImage(frameV2_1, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_1")
  }
  else if (milliseconds > 33 && milliseconds <= 66) {
  	ctx.drawImage(frameV2_2, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_2")
  }
  else if (milliseconds > 66 && milliseconds <= 99) {
  	ctx.drawImage(frameV2_3, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_3")
  }
  else if (milliseconds > 99 && milliseconds <= 132) {
  	ctx.drawImage(frameV2_4, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_4")
  }
  else if (milliseconds > 132 && milliseconds <= 165) {
  	ctx.drawImage(frameV2_5, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_5")
  }
  else if (milliseconds > 165 && milliseconds <= 198) {
  	ctx.drawImage(frameV2_6, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_6")
  }
  else if (milliseconds > 198 && milliseconds <= 231) {
  	ctx.drawImage(frameV2_7, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_7")
  }
  else if (milliseconds > 231 && milliseconds <= 264) {
  	ctx.drawImage(frameV2_8, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_8")
  }
  else if (milliseconds > 264 && milliseconds <= 297) {
  	ctx.drawImage(frameV2_9, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_9")
  }
  else if (milliseconds > 297 && milliseconds <= 330) {
  	ctx.drawImage(frameV2_10, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_10")
  }
  else if (milliseconds > 330 && milliseconds <= 363) {
  	ctx.drawImage(frameV2_11, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_11")
  }
  else if (milliseconds > 363 && milliseconds <= 396) {
  	ctx.drawImage(frameV2_12, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_12")
  }
  else if (milliseconds > 396 && milliseconds <= 429) {
  	ctx.drawImage(frameV2_13, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_13")
  }
  else if (milliseconds > 429 && milliseconds <= 462) {
  	ctx.drawImage(frameV2_14, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_14")
  }
  else if (milliseconds > 462 && milliseconds <= 495) {
  	ctx.drawImage(frameV2_15, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_15")
  }
  else if (milliseconds > 495 && milliseconds <= 528) {
  	ctx.drawImage(frameV2_16, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_16")
  }
  else if (milliseconds > 528 && milliseconds <= 561) {
  	ctx.drawImage(frameV2_17, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_17")
  }
  else if (milliseconds > 561 && milliseconds <= 594) {
  	ctx.drawImage(frameV2_18, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_18")
  }
  else if (milliseconds > 594 && milliseconds <= 627) {
  	ctx.drawImage(frameV2_19, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_19")
  }
  else if (milliseconds > 627 && milliseconds <= 660) {
  	ctx.drawImage(frameV2_20, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_20")
  }
  else if (milliseconds > 660 && milliseconds <= 693) {
  	ctx.drawImage(frameV2_21, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_21")
  }
  else if (milliseconds > 693 && milliseconds <= 726) {
  	ctx.drawImage(frameV2_22, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_22")
  }
  else if (milliseconds > 726 && milliseconds <= 792) {
  	ctx.drawImage(frameV2_23, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_23")
  }
  else if (milliseconds > 792 && milliseconds <= 792) {
  	ctx.drawImage(frameV2_24, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_24")
  }
  else if (milliseconds > 792 && milliseconds <= 825) {
  	ctx.drawImage(frameV2_25, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_25")
  }
  else if (milliseconds > 825 && milliseconds <= 858) {
  	ctx.drawImage(frameV2_26, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_26")
  }
  else if (milliseconds > 858 && milliseconds <= 891) {
  	ctx.drawImage(frameV2_27, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_27")
  }
  else if (milliseconds > 891 && milliseconds <= 924) {
  	ctx.drawImage(frameV2_28, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_28")
  }
  else if (milliseconds > 924 && milliseconds <= 957) {
  	ctx.drawImage(frameV2_29, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_29")
  }
  else if (milliseconds > 957 && milliseconds <= 999) {
  	ctx.drawImage(frameV2_30, -heroWidth / 2, -heroHeight / 2);
  	console.log("frameV2_30")
  }
}

function drawAnimatedHeroV3(milliseconds){
  if (milliseconds > 0 && milliseconds <= 33) {
  	ctx.drawImage(framev3_1, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_1")
  }
  else if (milliseconds > 33 && milliseconds <= 66) {
  	ctx.drawImage(framev3_2, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_2")
  }
  else if (milliseconds > 66 && milliseconds <= 99) {
  	ctx.drawImage(framev3_3, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_3")
  }
  else if (milliseconds > 99 && milliseconds <= 132) {
  	ctx.drawImage(framev3_4, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_4")
  }
  else if (milliseconds > 132 && milliseconds <= 165) {
  	ctx.drawImage(framev3_5, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_5")
  }
  else if (milliseconds > 165 && milliseconds <= 198) {
  	ctx.drawImage(framev3_6, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_6")
  }
  else if (milliseconds > 198 && milliseconds <= 231) {
  	ctx.drawImage(framev3_7, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_7")
  }
  else if (milliseconds > 231 && milliseconds <= 264) {
  	ctx.drawImage(framev3_8, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_8")
  }
  else if (milliseconds > 264 && milliseconds <= 297) {
  	ctx.drawImage(framev3_9, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_9")
  }
  else if (milliseconds > 297 && milliseconds <= 330) {
  	ctx.drawImage(framev3_10, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_10")
  }
  else if (milliseconds > 330 && milliseconds <= 363) {
  	ctx.drawImage(framev3_11, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_11")
  }
  else if (milliseconds > 363 && milliseconds <= 396) {
  	ctx.drawImage(framev3_12, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_12")
  }
  else if (milliseconds > 396 && milliseconds <= 429) {
  	ctx.drawImage(framev3_13, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_13")
  }
  else if (milliseconds > 429 && milliseconds <= 462) {
  	ctx.drawImage(framev3_14, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_14")
  }
  else if (milliseconds > 462 && milliseconds <= 495) {
  	ctx.drawImage(framev3_15, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_15")
  }
  else if (milliseconds > 495 && milliseconds <= 528) {
  	ctx.drawImage(framev3_16, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_16")
  }
  else if (milliseconds > 528 && milliseconds <= 561) {
  	ctx.drawImage(framev3_17, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_17")
  }
  else if (milliseconds > 561 && milliseconds <= 594) {
  	ctx.drawImage(framev3_18, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_18")
  }
  else if (milliseconds > 594 && milliseconds <= 627) {
  	ctx.drawImage(framev3_19, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_19")
  }
  else if (milliseconds > 627 && milliseconds <= 660) {
  	ctx.drawImage(framev3_20, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_20")
  }
  else if (milliseconds > 660 && milliseconds <= 693) {
  	ctx.drawImage(framev3_21, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_21")
  }
  else if (milliseconds > 693 && milliseconds <= 726) {
  	ctx.drawImage(framev3_22, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_22")
  }
  else if (milliseconds > 726 && milliseconds <= 792) {
  	ctx.drawImage(framev3_23, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_23")
  }
  else if (milliseconds > 792 && milliseconds <= 792) {
  	ctx.drawImage(framev3_24, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_24")
  }
  else if (milliseconds > 792 && milliseconds <= 825) {
  	ctx.drawImage(framev3_25, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_25")
  }
  else if (milliseconds > 825 && milliseconds <= 858) {
  	ctx.drawImage(framev3_26, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_26")
  }
  else if (milliseconds > 858 && milliseconds <= 891) {
  	ctx.drawImage(framev3_27, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_27")
  }
  else if (milliseconds > 891 && milliseconds <= 924) {
  	ctx.drawImage(framev3_28, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_28")
  }
  else if (milliseconds > 924 && milliseconds <= 957) {
  	ctx.drawImage(framev3_29, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_29")
  }
  else if (milliseconds > 957 && milliseconds <= 999) {
  	ctx.drawImage(framev3_30, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev3_30")
  }
}

function drawAnimatedHeroV4(milliseconds){
  if (milliseconds > 0 && milliseconds <= 33) {
  	ctx.drawImage(framev4_1, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_1")
  }
  else if (milliseconds > 33 && milliseconds <= 66) {
  	ctx.drawImage(framev4_2, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_2")
  }
  else if (milliseconds > 66 && milliseconds <= 99) {
  	ctx.drawImage(framev4_3, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_3")
  }
  else if (milliseconds > 99 && milliseconds <= 132) {
  	ctx.drawImage(framev4_4, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_4")
  }
  else if (milliseconds > 132 && milliseconds <= 165) {
  	ctx.drawImage(framev4_5, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_5")
  }
  else if (milliseconds > 165 && milliseconds <= 198) {
  	ctx.drawImage(framev4_6, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_6")
  }
  else if (milliseconds > 198 && milliseconds <= 231) {
  	ctx.drawImage(framev4_7, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_7")
  }
  else if (milliseconds > 231 && milliseconds <= 264) {
  	ctx.drawImage(framev4_8, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_8")
  }
  else if (milliseconds > 264 && milliseconds <= 297) {
  	ctx.drawImage(framev4_9, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_9")
  }
  else if (milliseconds > 297 && milliseconds <= 330) {
  	ctx.drawImage(framev4_10, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_10")
  }
  else if (milliseconds > 330 && milliseconds <= 363) {
  	ctx.drawImage(framev4_11, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_11")
  }
  else if (milliseconds > 363 && milliseconds <= 396) {
  	ctx.drawImage(framev4_12, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_12")
  }
  else if (milliseconds > 396 && milliseconds <= 429) {
  	ctx.drawImage(framev4_13, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_13")
  }
  else if (milliseconds > 429 && milliseconds <= 462) {
  	ctx.drawImage(framev4_14, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_14")
  }
  else if (milliseconds > 462 && milliseconds <= 495) {
  	ctx.drawImage(framev4_15, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_15")
  }
  else if (milliseconds > 495 && milliseconds <= 528) {
  	ctx.drawImage(framev4_16, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_16")
  }
  else if (milliseconds > 528 && milliseconds <= 561) {
  	ctx.drawImage(framev4_17, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_17")
  }
  else if (milliseconds > 561 && milliseconds <= 594) {
  	ctx.drawImage(framev4_18, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_18")
  }
  else if (milliseconds > 594 && milliseconds <= 627) {
  	ctx.drawImage(framev4_19, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_19")
  }
  else if (milliseconds > 627 && milliseconds <= 660) {
  	ctx.drawImage(framev4_20, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_20")
  }
  else if (milliseconds > 660 && milliseconds <= 693) {
  	ctx.drawImage(framev4_21, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_21")
  }
  else if (milliseconds > 693 && milliseconds <= 726) {
  	ctx.drawImage(framev4_22, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_22")
  }
  else if (milliseconds > 726 && milliseconds <= 792) {
  	ctx.drawImage(framev4_23, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_23")
  }
  else if (milliseconds > 792 && milliseconds <= 792) {
  	ctx.drawImage(framev4_24, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_24")
  }
  else if (milliseconds > 792 && milliseconds <= 825) {
  	ctx.drawImage(framev4_25, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_25")
  }
  else if (milliseconds > 825 && milliseconds <= 858) {
  	ctx.drawImage(framev4_26, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_26")
  }
  else if (milliseconds > 858 && milliseconds <= 891) {
  	ctx.drawImage(framev4_27, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_27")
  }
  else if (milliseconds > 891 && milliseconds <= 924) {
  	ctx.drawImage(framev4_28, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_28")
  }
  else if (milliseconds > 924 && milliseconds <= 957) {
  	ctx.drawImage(framev4_29, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_29")
  }
  else if (milliseconds > 957 && milliseconds <= 999) {
  	ctx.drawImage(framev4_30, -heroWidth / 2, -heroHeight / 2);
  	console.log("framev4_30")
  }
}

function drawHero() {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.translate(
    heroX - heroWidth / 2,
    heroY + canvasHeight - platformHeight - heroHeight / 2
  );

  // base_image.onload = function(){
  //   ctx.drawImage(base_image, heroX, heroY);
  // }

  var today = new Date();
  var milliseconds = today.getMilliseconds();
  console.log("seconds: " + milliseconds);
  if (score < 5){
  		ctx.drawImage(base_image, -heroWidth / 2, -heroHeight / 2);
  }
  else if (score >= 5 && score < 10){
  		if (!music_lilUziVert.playing) music_lilUziVert.play()
  		drawAnimatedHeroV1(milliseconds)
  }
  else if (score >= 10 && score <= 15) {
  	drawAnimatedHeroV2(milliseconds)
  }
  else if (score > 15 && score <= 25) {
  	drawAnimatedHeroV3(milliseconds)
  }
  else if (score > 25 && score <= 40) {
  	drawAnimatedHeroV4(milliseconds)
  }
  else if (score > 40) {
  	drawAnimatedHeroV2(milliseconds)
  }

  // // Body
  // drawRoundedRect(
  //   -heroWidth / 2,
  //   -heroHeight / 2,
  //   heroWidth,
  //   heroHeight - 4,
  //   5
  // );

  // // Legs
  // const legDistance = 5;
  // ctx.beginPath();
  // ctx.arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
  // ctx.fill();
  // ctx.beginPath();
  // ctx.arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
  // ctx.fill();

  // // Eye
  // ctx.beginPath();
  // ctx.fillStyle = "white";
  // ctx.arc(5, -7, 3, 0, Math.PI * 2, false);
  // ctx.fill();

  // // Band
  // ctx.fillStyle = "red";
  // ctx.fillRect(-heroWidth / 2 - 1, -12, heroWidth + 2, 4.5);
  // ctx.beginPath();
  // ctx.moveTo(-9, -14.5);
  // ctx.lineTo(-17, -18.5);
  // ctx.lineTo(-14, -8.5);
  // ctx.fill();
  // ctx.beginPath();
  // ctx.moveTo(-10, -10.5);
  // ctx.lineTo(-15, -3.5);
  // ctx.lineTo(-5, -7);
  // ctx.fill();

  ctx.restore();
}

function drawRoundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
}

function drawSticks() {
  sticks.forEach((stick) => {
    ctx.save();

    // Move the anchor point to the start of the stick and rotate
    ctx.translate(stick.x, canvasHeight - platformHeight);
    ctx.rotate((Math.PI / 180) * stick.rotation);

    // Draw stick
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -stick.length);
    ctx.stroke();

    // Restore transformations
    ctx.restore();
  });
}

function drawBackground() {
  // Draw sky
  var gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
  gradient.addColorStop(0, "#BBD691");
  gradient.addColorStop(1, "#FEF1E1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  // Draw hills
  drawHill(hill1BaseHeight, hill1Amplitude, hill1Stretch, "#95C629");
  drawHill(hill2BaseHeight, hill2Amplitude, hill2Stretch, "#659F1C");

  // Draw trees
  trees.forEach((tree) => drawTree(tree.x, tree.color));
}

// A hill is a shape under a stretched out sinus wave
function drawHill(baseHeight, amplitude, stretch, color) {
  ctx.beginPath();
  ctx.moveTo(0, window.innerHeight);
  ctx.lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
  for (let i = 0; i < window.innerWidth; i++) {
    ctx.lineTo(i, getHillY(i, baseHeight, amplitude, stretch));
  }
  ctx.lineTo(window.innerWidth, window.innerHeight);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawTree(x, color) {
  ctx.save();
  ctx.translate(
    (-sceneOffset * backgroundSpeedMultiplier + x) * hill1Stretch,
    getTreeY(x, hill1BaseHeight, hill1Amplitude)
  );

  const treeTrunkHeight = 5;
  const treeTrunkWidth = 2;
  const treeCrownHeight = 25;
  const treeCrownWidth = 10;

  // Draw trunk
  ctx.fillStyle = "#7D833C";
  ctx.fillRect(
    -treeTrunkWidth / 2,
    -treeTrunkHeight,
    treeTrunkWidth,
    treeTrunkHeight
  );

  // Draw crown
  ctx.beginPath();
  ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight);
  ctx.lineTo(0, -(treeTrunkHeight + treeCrownHeight));
  ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}

function getHillY(windowX, baseHeight, amplitude, stretch) {
  const sineBaseY = window.innerHeight - baseHeight;
  return (
    Math.sinus((sceneOffset * backgroundSpeedMultiplier + windowX) * stretch) *
      amplitude +
    sineBaseY
  );
}

function getTreeY(x, baseHeight, amplitude) {
  const sineBaseY = window.innerHeight - baseHeight;
  return Math.sinus(x) * amplitude + sineBaseY;
}