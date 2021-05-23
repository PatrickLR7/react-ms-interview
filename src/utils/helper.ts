import { BinTreeNode } from '../TreeNode';

// Helper functions used to solve problem #1;

/**
 * Parses the children of a binary tree node using recursion
 * @param children can be either: an array with the format [id, leftChild, rightChild]
 * a number or null.
 * @returns BinTreeNode or null.
 * */
export const parseChildren = (
  children: any[] | number | null
): BinTreeNode | null => {
  if (Array.isArray(children)) {
    if (children.length === 1) {
      const subTree = new BinTreeNode(children[0], null, null);
      return cleanNullProperties(subTree);
    } else if (children.length === 2) {
      return new BinTreeNode(children[0], parseChildren(children[1]), null);
    } else if (children.length >= 3) {
      return new BinTreeNode(
        children[0],
        parseChildren(children[1]),
        parseChildren(children[2])
      );
    }
    return null;
  } else {
    return null;
  }
};

/**
 * Clears null properties from a BinTreeNode object.
 * @param obj BinTreeNode
 * @returns BinTreeNode
 */
export const cleanNullProperties = (obj: BinTreeNode): BinTreeNode => {
  for (const property in obj) {
    const validProp = property as keyof BinTreeNode;
    if (obj[validProp] === null) {
      delete obj[validProp];
    }
  }
  return obj;
};

// Helper functions used to solve problem #3;

/**
 * This function finds the maximum depth of the tree starting on the supplied node.
 * @param node BinTreeNode null or undefined. It is the root node to start traversing the tree.
 * @returns Maximum depth of the tree.
 */
export const findMaximumDepth = (
  node: BinTreeNode | null | undefined
): number => {
  //If the current node is null;
  if (!node || !node.id) {
    return 0;
  }

  // If the current node is a leaf.
  if (node && node.left === null && node.right === null) {
    return 1;
  }

  //Recursively finds the maximum depth between the the right and left subtrees and adds 1 to that depth;
  return (
    Math.max(findMaximumDepth(node.left), findMaximumDepth(node.right)) + 1
  );
};

/**
 *
 * @param currentNode BinTreeNode null or undefined. It is the current root node to start traversing the tree.
 * @returns The root node of the smalles subtree which contains all the deepest nodes.
 */
export const findRootOfDeepestNodes = (
  currentNode: BinTreeNode | null | undefined
): BinTreeNode | null | undefined => {
  // Case in whhich the current node is null;
  if (!currentNode || !currentNode.id) {
    return null;
  }

  //Store depth of left subtree
  const leftDepth = findMaximumDepth(currentNode.left);
  //Store depth of right subtree
  const rightDepth = findMaximumDepth(currentNode.right);
  //If the depth of the left subtree is bigger, traverse left subtree.
  if (leftDepth > rightDepth) {
    return findRootOfDeepestNodes(currentNode.left);
  }
  //If the depth of the right subtree is bigger, traverse right subtree.
  else if (rightDepth > leftDepth) {
    return findRootOfDeepestNodes(currentNode.right);
  }
  // If the depths of both subtrees are equal, we found the node that contains the subtree with the deepest nodes;
  else {
    return currentNode;
  }
};
