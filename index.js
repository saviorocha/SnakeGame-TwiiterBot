//const p = document.querySelector(".last-item");
// ◆
// ◇
let size = 13;
let snakeX = [], snakeY = [];
const directions = ["up", "down", "left", "right"];

let board = new Array(size);	
let snake = new Snake();

function setup() {
	snake.add(6, 6);
	createBoard();
	board[snake.head.y][snake.head.x] = snake.head.value;
	snakeX[0] = snake.head.x;
	snakeY[0] = snake.head.y;
	createFood();
}

function run() {
	// console.log("----------------------");
	snake.move(directions[Math.floor(Math.random() * 4)]);
	updateSnake(snake.head);
	console.log(toString());
}

function createBoard() {
	for (let i = 0; i < size; i++) {
		board[i] = new Array(size);
		board[i].fill("⬜");
	}
}

function createFood() {
	let posX = Math.floor(Math.random() * 13);
	let posY = Math.floor(Math.random() * 13);
	if (!checkFood(posY, posX)) {
		board[posY][posX] = "⬛";
		return;
	} else {
		createFood();
	}
}

function updateSnake(node) {
	if (board[node.y][node.x] === "⬛") {
		createFood();
		snake.add(node.y, node.x);
	}
	board[node.y][node.x] = node.value;
	board[snakeY[0]][snakeX[0]] = "⬜";
	snakeX[0] = node.x;
	snakeY[0] = node.y;
	// console.log(snakeY[0], snakeX[0])
}

function checkFood(x, y) {
	return board[y][x] === "⬛";
}

function toString() {
	let str = "";

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			str += board[i][j] + " " ;
			if (j === size - 1) { str += "\n"; }
		}
	}
	return str;
}

setup();
console.log(setInterval(run, 1000));