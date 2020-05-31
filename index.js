//const p = document.querySelector(".last-item");

function main() {
	let size = 13;
	let board = new Array(size);	
	let Snake = new Snake("◆", ["◇"]);
	console.log(createBoard(size, board));
}

function createBoard(size, board) {
	let str = "";
	for (let i = 0; i < size; i++) {
		board[i] = new Array(size);
		board[i].fill("⬜");
	}
	createFood(board);

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			str += board[i][j] + " " ;
			if (j === size - 1) { str += "\n"; }
		}
	}
	return str;
}

function createFood(board) {
	let posX = Math.floor(Math.random() * 13);
	let posY = Math.floor(Math.random() * 13);
	board[posY][posX] = "⬛";
}

main();