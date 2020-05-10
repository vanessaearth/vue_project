class Node {
  constructor(e) {
    this.element = e
    this.next = null
  }
}
class LinkNodeList {
  constructor() {
    this.length = 0
    this.head = null
  }
  append (element) {
    let node = new Node(element)
    let cur
    if (this.head === null) {
      this.head = node
    } else {
      cur = this.head
      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    this.length++
  }
  removeAt (index) {
    let cur = this.head
    let prev, i = 0
    if (index === 0) {
      this.head = cur.next
    } else {
      while (i < index) {
        prev = cur
        cur = cur.next
        i++
      }
      prev.next = cur.next
      cur.next = null
      this.length--
      return cur.element
    }
  }
  print () {
    let cur = this.head
    let ret = []
    while (cur) {
      ret.push(cur.element)
      cur = cur.next
    }
    console.log(ret.join('==>'))
    return ret.join('==>')
  }
}
let linkNode = new LinkNodeList()
linkNode.append('你瞅啥')
linkNode.append('瞅你咋滴')
linkNode.append('再抽一个试试')
linkNode.print()
linkNode.removeAt(1)
linkNode.print()
