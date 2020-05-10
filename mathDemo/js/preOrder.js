function preOrder (root, arr = []) {
  if (root) {
    arr.push(root.val)
    preorderTraversal(root.left, arr)
    preorderTraversal(root.right, arr)
  }
  return arr
};
function preOrder (root) {
  let stack = []
  let result = []
  let cur = root

  while (cur || stack.length > 0) {
    while (cur) {
      result.push(cur.val)
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    cur = cur.right
  }
  return result
};
console.log('preOrder', preOrder([1, 2, 3, 4, 5, 6, 7]))