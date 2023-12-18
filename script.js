// define html elements to manipulate from index.html file
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");

// define game variables
const gridSize = 20;
let snake = [{x:10, y:10}];
let direction = "right";
let food = generateFood();
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted=false;

// Draw game map, snake, food
function draw() {
    board.innerHTML="";
    drawSnake();
    drawFood();
}

// draw the snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div','snake');
        setPosition(snakeElement,segment);
        board.appendChild(snakeElement);
    });
}

// draw snake segment or food cube
function createGameElement(tag,className) {
    const element = document.createElement(tag);
    element.className=className;
    return element;
}

// set the position of the snake or the food on game board
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// testing draw function
// draw();

// draw food on the board
function drawFood() {
    const foodElement = createGameElement("div","food");
    setPosition(foodElement,food);
    board.appendChild(foodElement);
}

// generate food position at random
function generateFood() {
    const x = Math.floor(Math.random() * gridSize)+1;
    const y = Math.floor(Math.random() * gridSize)+1;
    return {x,y};
}

// testing drawFood 
// drawFood();

// moving the snake
function move() {
    const head = {...snake[0]};
    if(direction=="right") {
        head.x++;
    }
    else if(direction=="left") {
        head.x--;
    }
    else if(direction=="up") {
        head.y--;
    }
    else if(direction=="down") {
        head.y++;
    }

    snake.unshift(head);
    
    if(head.x==food.x && head.y==food.y) {
        food = generateFood();
        clearInterval(); // clear past interval
        gameInterval = setInterval(() => {
            move();
            draw();
        },gameSpeedDelay);

    } else {
        snake.pop();
    }
}

// testing the move function
// setInterval(() => {
//     move(); // move the snake
//     draw(); // draw the snake again
// },200);

// start game function
function startGame() {
    gameStarted=true; // keep track of running game
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(() => {
        move();
        // checkCollision();
        draw();
    },gameSpeedDelay);
}

// key Press event listener
function handleKeyPress(event) {
    if(!gameStarted && (event.code==="Space" || event.key===" ")) {
        startGame();
    }
    else {
        if(event.key==="ArrowUp") {
            direction="up";
        }
        else if(event.key==="ArrowDowm") {
            direction="down";
        }
        else if(event.key==="ArrowLeft") {
            direction="left";
        }
        else if(event.key==="ArrowRight") {
            direction="right";
        }
        else {
            // do nothing for other keys
        }
    }
}