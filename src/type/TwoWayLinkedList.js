class Node {
  constructor(target, data = {}) {
    this.target = target;
    this.data = data;
    this.next = this.prev = null;
  }
}

class LList {
  constructor(newTarget, data) {
    this.head = new Node("head");
    this.push(newTarget, data);
  }

  static newNode(target, data = {}) {
    return new Node(target, data)
  }

  find(target) {
    let currNode = this.head;
    while (currNode.target !== target) {
      currNode = currNode.next;
    }
    return currNode;
  }

  push(newTarget, data) {
    let newNode = LList.newNode(newTarget, data);
    let currNode = this.head;
    while (currNode.next !== null) {
      currNode = currNode.next;
    }
    currNode.next = newNode;
    newNode.prev = currNode;
  }

  // 不直接放入 head 前面 而是放入 head 后面
  unshift(newTarget, data) {
    let newNode = LList.newNode(newTarget, data);
    let currNode = this.head;
  }

  insert() {

  }

  display() {
    let currNode = this.head;
    while ((console.log(currNode), currNode.next !== null)) {
      currNode = currNode.next;
    }
  }
}

let foo = new LList("one");

foo.push("two");

foo.display();