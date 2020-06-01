class Node {
	constructor(x, y) {
		this.next = null;
		this.data = "";
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
		if (this.length === 0) {

		} else {
			switch (direction) {
				case "up":
					
					break;
				case "down":
					break;
				case "left":
					break;
				case "right":
					break;

				default:
					console.error("deu uns erro no switch case");
					break;
			}
		}
	}

	add() {
		let node = new Node();
		let currentNode = this.head;

		//lista vazia
		if (!currentNode) {
			this.head = node;
			this.head.data = "◆";
			this.length++;
			
			return node;
		}

		while (currentNode.next) {
			currentNode = currentNode.next;
		}
	
		currentNode.next = node;
		currentNode.data = "◇";
		this.length++;
	
		return node;
	}
}