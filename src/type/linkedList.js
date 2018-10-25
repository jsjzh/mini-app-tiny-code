class Node {
  constructor(target, element = {}) {
    this.target = target;
    this.element = element;
    this.next = null;
  }
}

class LList {
  constructor() {
    this.head = new Node("head");
  }
  find(target) {
    let currNode = this.head;
    while (currNode.target !== target) {
      currNode = currNode.next;
    }
    return currNode;
  }
  insert(target, newTarget, element = {}) {
    let newNode = new Node(newTarget, element);
    let findNode = this.find(target);
    newNode.next = findNode.next;
    findNode.next = newNode;
  }
}

const foo = new LList();

foo.insert("head", "1");
foo.insert("1", "2");
foo.insert("2", "3");
foo.insert("3", "4");

console.log(foo.find("head"));
