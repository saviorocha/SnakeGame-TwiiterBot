// implementação de uma lista duplamente encadeada
// baseado no exemplo em: https://reactgo.com/javascript-double-linked-list-implementation/

let lastNode;

class Node {
	constructor(x, y) {
		this.next = null;
		this.prev = null;
		this.x = x;
		this.y = y;
		this.value = "◆ ";
	}
}

class Snake {
	constructor() {
		// this.head = head;
		// this.body = body;
		this.length = null;
		this.head = null;
		this.tail = null;
	}

	move(direction) {
		
		let currentNode = this.head;
		// let tempX, tempY;
		
		while (currentNode.next) {
			/*
			tempX = currentNode.x
			tempY = currentNode.y
			
			currentNode = currentNode.next;

			currentNode.x = tempX;
			currentNode.y = tempY;
			*/

			currentNode.next.y = currentNode.y;
			currentNode.next.x = currentNode.x;
			currentNode = currentNode.next;
		}

		switch (direction) {
			case "up":
				this.head.y--;
				break;
			case "down":
				this.head.y++;
				break;
			case "left":
				this.head.x--;
				break;
			case "right":
				this.head.x++;
				break;
			default:
				console.error("deu uns erro no switch case");
				break;
		}
	}

	// adiciona um nó no fim da lista
	push(x, y) {
		const node = new Node(x, y);

		if (!this.head) { // lista vazia
			this.head = node;
			this.tail = node;
		} else {
			node.prev = this.tail
			this.tail.next = node;
			this.tail = node;
		}
		this.length++;
	}

	add(x, y) {
		let node = new Node();
		let currentNode = this.head;

		//lista vazia
		if (!currentNode) {
			this.head = node;
			this.head.value = "◆ ";
			this.head.x = x;
			this.head.y = y;
			this.length++;

			return node;
		}

		// adiciona o nó no fim da lista
		while (currentNode.next) {
			currentNode = currentNode.next;
		}

		currentNode.next = node;
		currentNode.value = "◇";
		currentNode.x = x;
		currentNode.y = y;
		this.length++;

		return node;
	}
}