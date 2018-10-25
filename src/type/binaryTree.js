/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!(root instanceof TreeNode)) return false;
  if (!(root.val)) return true;
  if (root.left === root.right) return true;

  function judge(left, right) {
    if (!left || !right) return false;
    if (left.val !== right.val) return false;
    if (left.left instanceof TreeNode && right.right instanceof TreeNode && left.right instanceof TreeNode && right.left instanceof TreeNode) {
      return judge(left.left, right.right) && judge(left.right, right.left)
    }
    return true;
  }

  return judge(root.left, root.right);
};

var maxDepth = function(root) {
  if (!(root instanceof TreeNode)) return 0;
  if (root.left === null && root.right === null) return 1;
  
};