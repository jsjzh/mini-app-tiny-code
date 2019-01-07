class Node {
  constructor(target, data = {}) {
    this.target = target;
    this.data = data;
    this.next = null;
  }
}

class LList {
  constructor(newTarget, data) {
    this.head = new Node("head");
    this.push(newTarget, data);
  }

  static newNode(newTarget, data) {
    return new Node(newTarget, data);
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
  }

  insert(target, newTarget, data) {
    let newNode = LList.newNode(newTarget, data);
    let findNode = this.find(target);
    newNode.next = findNode.next;
    findNode.next = newNode;
  }

  remove(target) {
    let currNode = this.head;
    let preNode = null;
    while (currNode.target !== target) {
      currNode.next.target === target && (preNode = currNode);
      currNode = currNode.next;
    }
    preNode.next = currNode.next;
    currNode.next = null;
  }

  display() {
    let currNode = this.head;
    while ((console.log(currNode), currNode.next !== null)) {
      currNode = currNode.next;
    }
  }
}

const foo = new LList("one");

console.log("push three");
foo.push("three");
foo.display();

console.log("insert two");
foo.insert("one", "two");
foo.display();

console.log("remove three");
foo.remove("three");
foo.display();
