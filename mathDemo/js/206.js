function Node (val) {
  this.val = val
  this.next = null
}
function LinkNode () {
  this.head = null
  this.length = 0
  this.cur = null
  this.append = function (e) {
    let node = new Node(e)
    if (this.head === null) {
      this.head = node
    } else {
      this.cur = this.head
      while (this.cur.next) {
        this.cur = this.cur.next
      }
      this.cur.next = node
    }
    this.length++
  }
  this.reverse = function () {

  }
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let arr = head.split('->')
  let linkNode = new LinkNode()
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 'NULL') {
      linkNode.append(arr[i])
    }
  }
  clog(linkNode)
}
reverseList('1->2->3->4->5->NULL')
