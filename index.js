//const p = document.querySelector(".last-item");

let size = 13;
let board = new Array(size);	
let snake = new Snake("◆ ", [], 6, 6);//"◇ "
const directions = ["up", "down", "left", "right"];

function main() {
	createBoard();

	let str = toString();
	console.log(str);
}

function createBoard() {
	for (let i = 0; i < size; i++) {
		board[i] = new Array(size);
		board[i].fill("⬜");
	}
	createFood();

	if (board[snake.y][snake.x] === "⬛") {
		snake.y++;
		snake.x++;
	}
	board[snake.y][snake.x] = snake.head;
}

function createFood() {
	let posX = Math.floor(Math.random() * 13);
	let posY = Math.floor(Math.random() * 13);
	board[posY][posX] = "⬛";
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


main();
setInterval(snake.move(directions[Math.floor(Math.random()*4)]), 3000);