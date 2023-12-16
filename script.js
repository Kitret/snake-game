// define html elements to manipulate from index.html file
const board = document.getElementById("game-board");

// define game variables
let snake = [{x:10, y:10}];

// Draw game map, snake, food
function draw() {
    board.innerHTML="";
    drawSnake();
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

draw();