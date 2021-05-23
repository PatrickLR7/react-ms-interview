import * as React from 'react';
import { BinTreeNode } from './TreeNode';

import './TreeOutput.scss';

export interface TreeOutputProps {
  treeNode: BinTreeNode | null | undefined;
  nodeToHighlight: BinTreeNode | null | undefined;
}

export const TreeOutput: React.FunctionComponent<TreeOutputProps> = (props) => {
  const { treeNode, nodeToHighlight } = props;
  if (!treeNode || !treeNode.id) {
    return <div className="treeNode"></div>;
  }
  return (
    <div
      className={`treeNode ${
        nodeToHighlight && nodeToHighlight.id === treeNode.id
          ? 'green-node'
          : ''
      }`}
    >
      <div className="nodeId">{treeNode.id}</div>
      {treeNode.left || treeNode.right ? (
        <div className="nodeChildren">
          <TreeOutput
            treeNode={treeNode.left}
            nodeToHighlight={props.nodeToHighlight}
          />
          <TreeOutput
            treeNode={treeNode.right}
            nodeToHighlight={props.nodeToHighlight}
          />
        </div>
      ) : null}
    </div>
  );
};
