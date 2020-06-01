class Node {
	constructor(x, y) {
		this.next = null;
		this.value = "";
		this.x = x;
		this.y = y;
	}
}

class Snake {
	constructor() {
		// this.head = head;
		// this.body = body;
		this.length = 0;
		this.head = null;
	}

	move(direction) {
		
		if (this.length > 1) {
			
		} else {//só a cabeça
			switch (direction) {
				case "up":
					this.head.y++;
					break;
				case "down":
					this.head.y--;
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