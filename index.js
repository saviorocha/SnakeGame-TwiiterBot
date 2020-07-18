// ◆
// ◇
let size = 13;
let currentDirection = 1;
let count = 0;
let foodX, foodY;
const directions = [1, 2, 3, 4]; // 1 cima, 2 baixo, 3 direita, 4 esquerda

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
	if (count % 3 === 0) { // muda de direção a cada três "turnos"
		let randNum = Math.random();
		let tempDirections = [];
		let index = directions.indexOf(currentDirection);	


		if (randNum < 0.5) { // escolhe uma direção aleatória 
			index % 2 === 0 ? index = index + 1 : index = index - 1; // escolhe a direção contrária	
			tempDirections = directions.splice(index, 1); // retira a direção contrária do vetor (e.g. se estiver indo pra cima, retira a possibilidade de ir pra baixo)
			currentDirection = tempDirections[Math.floor(Math.random() * 3)]; 
		} else { // escolhe uma direção que seja na direção da comida
			//obs: procurar uma solução melhor pra isso depois, pra diminuir os if else
			let stepx = ((foodX - snake.head.x) > 0) - ((foodX - snake.head.x) < 0); // retorna -1 se foodX - snake.head.x for negativo e 1 se for positivo
			let stepy = ((foodY - snake.head.y) > 0) - ((foodY - snake.head.y) < 0);

			if (stepx > 0) {
				// direita
				tempDirections.push(3);
			} else if (stepx < 0) {
				// esquerda
				tempDirections.push(4);
			}

			if (stepy > 0) {
				// cima
				tempDirections.push(1);
			} else if (stepy < 0) {
				// baixo
				tempDirections.push(2);
			}
			currentDirection = tempDirections[Math.floor(Math.random() * 2)]
		}
		console.log('direção: ', currentDirection);
	}
	count++;
	
	snake.move(currentDirection); // calcula a posição X e Y de cada nó da cobra
	updateGame(snake.head, snake.tail); // atualiza os dados do jogo
	console.log(gameToString()); // cria o jogo para ser imprimido 
}

function updateGame(head, tail) {

	if ((head.x > 13 || head.x < 0) || (head.y > 13 || head.y < 0)) { // se tiver passado da borda
		console.log('perdeu mané');
		clearInterval(intervalID);
	} else {
		try {
			createGame(); // reconstrói o jogo			
			updateFood(); // atualiza a posição da comida no jogo

			if (checkFood(head.x, head.y)) { // se comeu a comida
			// if ((head.x === foodX) && (head.y === foodY)) {
				eatFood(tail);			
			}

			updateSnake(head); // atualiza a posição de cada nó da cobra no jogo

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
	
	// calcula a posição do novo nó a ser adicionado 
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
