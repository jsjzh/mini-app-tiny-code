class Node {
  constructor(target, element = {}) {
    this.target = target;
    this.element = element;
    this.next = null;
  }
}

class LList {

  constructor(newTarget, element) {
    this.head = new Node("head");
    this.insert("head", newTarget, element);
  }

  static newNode(newTarget, element = {}) {
    return new Node(newTarget, element);
  }

  find(target) {
    let currNode = this.head;
    while (currNode.target !== target) {
      currNode = currNode.next;
    }
    return currNode;
  }

  push(newTarget, element) {
    let newNode = LList.newNode(newTarget, element);
    let currNode = this.head;
    while (currNode.next !== null) {
      currNode = currNode.next;
    }
    currNode.next = newNode;
  }

  insert(target, newTarget, element) {
    let newNode = LList.newNode(newTarget, element);
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

foo.push("demo");
foo.push("demo2");
foo.display();