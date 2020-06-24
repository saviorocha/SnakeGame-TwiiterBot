//const p = document.querySelector(".last-item");
// ◆
// ◇
let size = 13;
let snakeX = [], snakeY = []; // vetores com as posições X e Y de cada nó da cobra
let currentDirection;
let count = 0;
const directions = ["up", "down", "left", "right"];

let board = new Array(size);	
let snake = new Snake();

init();


function init() {	
	setup();
	const intervalID = setInterval(run, 1000);
}

function setup() {
	snake.add(6, 6); // adiciona a cabeça da cobra
	createBoard();
	board[snake.head.y][snake.head.x] = snake.head.value;
	snakeX[0] = snake.head.x;
	snakeY[0] = snake.head.y;
	createFood();
}

function createBoard() {
	// cria a matriz do jogo
	for (let i = 0; i < size; i++) {
		board[i] = new Array(size);
		board[i].fill("⬜");
	}
}

function createFood() {
	// adiciona a comida em uma casa aleatória
	let posX = Math.floor(Math.random() * 13);
	let posY = Math.floor(Math.random() * 13);

	// verifica se a casa escolhida não está ocupada
	// por uma das partes da cobra
	if (!checkFood(posY, posX)) { 
		board[posY][posX] = "⬛";
		return;
	} else {
		createFood();
	}
}

function run() {
	// console.log("----------------------");
	if (count % 3 == 0) { // muda de direção a cada três "turnos"
		currentDirection = directions[Math.floor(Math.random() * 4)]; // escolhe uma posição aleatória
	}
	count++;
	snake.move(currentDirection); // calcula a posição X e Y de cada nó da cobra
	updateSnake(snake.head); // atualiza a posição de cada nó da cobra no jogo
	console.log(toString());
}

function updateSnake(node) {
	if (node.y > 13 || node.x > 13) { // se tiver batido em uma das paredes
		console.log('perdeu mané');
		clearInterval(intervalID);
	} else {
		try {
			if (board[node.y][node.x] === "⬛") { // comeu a comida
				createFood();
				snake.add(node.y, node.x);
			}
			board[node.y][node.x] = node.value;
			board[snakeY[0]][snakeX[0]] = "⬜";
			snakeX[0] = node.x;
			snakeY[0] = node.y;
		} catch (error) {
			clearInterval(intervalID);
		}
	}
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
