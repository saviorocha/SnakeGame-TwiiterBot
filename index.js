// ◆
// ◇
let size = 13;
let currentDirection;
let count = 0;
// const directions = ["up", "down", "left", "right"];
// const directions = [11, -11, 21, -21];
const directions = [1, 2, 3, 4]; // 1 cima, 2 baixo, 3 direita, 4 esquerda

let foodX, foodY;

let game = new Array(size);	
let snake = new Snake();

setup();
const intervalID = setInterval(run, 1000);

function setup() {
	snake.push(6, 6); // adiciona a cabeça da cobra
	createGame();
	game[snake.head.y][snake.head.x] = snake.head.value; //adiciona a cobra ao jogo
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
	foodX = Math.floor(Math.random() * 13);
	foodY = Math.floor(Math.random() * 13);

	// foodX = 6;
	// foodY = 6;

	// verifica se a casa escolhida não está ocupada
	// por uma das partes da cobra
	if (!checkFood(foodY, foodX)) { 
		game[foodY][foodX] = "⬛";
		return;
	} else {
		createFood();
	}
}

function run() {
	// console.log("----------------------");
	// if (count % 3 === 0) { // muda de direção a cada três "turnos"
		currentDirection = directions[Math.floor(Math.random() * 4)]; // escolhe uma posição aleatória
		console.log(currentDirection);
	// }
	// count++;
	snake.move(currentDirection); // calcula a posição X e Y de cada nó da cobra
	updateGame(snake.head, snake.tail); // atualiza a posição de cada nó da cobra no jogo
	console.log(gameToString()); // cria o jogo para ser imprimido 
}

function updateGame(head, tail) {
	if (head.y > 13 || head.x > 13) { // se tiver passado da borda
		console.log('perdeu mané');
		clearInterval(intervalID);
	} else {
		try {
			createGame(); // reconstrói o jogo			
			updateFood();
			if (checkFood(head.x, head.y)) { // se comeu a comida
			// if ((head.x === foodX) && (head.y === foodY)) {
				console.log('comeu');
				eatFood(tail);			
			}

			updateSnake(head);

			// game[head.y][head.x] = head.value;
			// game[snakeY[0]][snakeX[0]] = "⬜";
			// snakeX[0] = head.x;
			// snakeY[0] = head.y;
		} catch (error) {
			// console.error(error)
			console.log(error);
			console.log('perdeu mané');
			clearInterval(intervalID);
		}
	}
	// console.log(snakeY[0], snakeX[0])
}

function updateSnake(head) {
	let currentNode = head;
	
	// atualiza a matriz do jogo com a posição dos nós da cobra
	game[head.y][head.x] = head.value;
	while (currentNode.next) {
		currentNode = currentNode.next;
		game[currentNode.y][currentNode.x] = currentNode.value;
	}
}

function eatFood(tail) {
	
	let newX, newY;
	
	if (currentDirection === 1) {
		newY = tail.y - 1
		newX = tail.x;
	} else if (currentDirection === 2) {
		newY = tail.y + 1;
		newX = tail.x;			
	} else if (currentDirection === 3) {
		newX = tail.x - 1;
		newY = tail.y;					
	} else {
		newX = tail.x + 1;		
		newY = tail.y;									
	}

	// if (direction 10 - direction  1) {
	// 	let newX += direction % 10;
	// 	let newY = 0
	// } else if (direction - 10 === 2) {
	// 	let newY += direction % 10
	// 	let newX = 0					
	// }


	snake.push(newX, newY); // adiciona um novo nó na cobra
	createFood(); // adiciona uma nova comida
	updateFood();
}

function updateFood() {
	game[foodY][foodX] = "⬛";
}

// checa se uma da posição na matriz possui uma comida
function checkFood(x, y) {
	console.log('x e y:', x, y);
	console.log('checando: ' + game[y][x]);
	return game[y][x] === "⬛";
}

function gameToString() {
	let str = "";

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			str += game[i][j] + " " ;
			if (j === size - 1) { str += "\n"; }
		}
	}
	return str;
}
