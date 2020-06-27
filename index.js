//const p = document.querySelector(".last-item");
// ◆
// ◇
let size = 13;
let snakeX = [], snakeY = []; // vetores com as posições X e Y de cada nó da cobra
let currentDirection;
let count = 0;
const directions = ["up", "down", "left", "right"];

let game = new Array(size);	
let snake = new Snake();

init();

function init() {	
	setup();
	// const intervalID = setInterval(run, 1000);
	console.log(setInterval(run, 1000));
}

function setup() {
	snake.push(6, 6); // adiciona a cabeça da cobra
	createGame();
	game[snake.head.y][snake.head.x] = snake.head.value; //adiciona a cobra ao jogo
	// snakeX[0] = snake.head.x;
	// snakeY[0] = snake.head.y;
	createFood();
}

function createGame() {
	// cria a matriz do jogo
	for (let i = 0; i < size; i++) {
		game[i] = new Array(size);
		game[i].fill("⬜");
	}
}

function createFood() {
	// adiciona a comida em uma casa aleatória
	let posX = Math.floor(Math.random() * 13);
	let posY = Math.floor(Math.random() * 13);

	// verifica se a casa escolhida não está ocupada
	// por uma das partes da cobra
	if (!checkFood(posY, posX)) { 
		game[posY][posX] = "⬛";
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
	updateSnake(snake.head, game); // atualiza a posição de cada nó da cobra no jogo
	console.log(toString()); // cria o jogo para ser imprimido 
}

function updateSnake(head) {
	if (head.y > 13 || head.x > 13) { // se tiver passado da borda
		console.log('perdeu mané');
		clearInterval(intervalID);
	} else {
		try {
			createGame(); // reconstrói o jogo
			if (checkFood(head.y, head.x)) { // se comeu a comida
				createFood();
				snake.push(head.y, head.x);
			}
			
			let currentNode = this.head;
			
			while (currentNode.next) {
				currentNode = currentNode.next;
			}
			// for (let i = 0; i < snakeY.length; i++) {
			// 	for (let j = 0; j < snakeX.length; j++) {
			// 		game[snakeY[i]][snakeX[j]] = "◇"; // adiciona a posição atualizada dos nós da cobra
			// 	}
			// }
			
			// game[head.y][head.x] = head.value;
			// game[snakeY[0]][snakeX[0]] = "⬜";
			// snakeX[0] = head.x;
			// snakeY[0] = head.y;
		} catch (error) {
			clearInterval(intervalID);
		}
	}
	// console.log(snakeY[0], snakeX[0])
}

function checkFood(x, y) {
	return game[y][x] === "⬛";
}

function toString() {
	let str = "";

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			str += game[i][j] + " " ;
			if (j === size - 1) { str += "\n"; }
		}
	}
	return str;
}
