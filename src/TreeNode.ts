export class BinTreeNode {
  id: string | number;
  left?: BinTreeNode | null | undefined;
  right?: BinTreeNode | null | undefined;
  constructor(
    id: string,
    left: BinTreeNode | null | undefined = undefined,
    right: BinTreeNode | null | undefined = undefined
  ) {
    this.id = id;
    this.left = left;
    this.right = right;
  }
}
