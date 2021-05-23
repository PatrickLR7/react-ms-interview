import * as React from 'react';
import { IAppState } from './IAppState';
import { observer } from 'mobx-react';
import { TreeInput } from './TreeInput';
import { TreeOutput } from './TreeOutput';
import './Body.scss';
import { useAppStateContext } from './AppState';
import { findRootOfDeepestNodes } from './utils/helper';
import { toJS } from 'mobx';
import { BinTreeNode } from './TreeNode';

interface BodyProps {
  appState: IAppState;
}

const BodyRenderer: React.FunctionComponent<BodyProps> = observer((props) => {
  const binaryTree = props.appState.treeNode;
  const nodeToHighlight: BinTreeNode | null | undefined =
    findRootOfDeepestNodes(toJS(binaryTree));

  return (
    <main className="App-body">
      <div className="body-message">{props.appState!.bodyMessage}</div>
      <TreeInput
        onChange={(newVal) => {
          props.appState.setState({
            ...props.appState,
            treeNode: newVal,
          });
        }}
      />
      <div className="OutputContainer">
        <TreeOutput
          treeNode={props.appState.treeNode}
          nodeToHighlight={nodeToHighlight}
        />
      </div>
    </main>
  );
});

export const Body: React.FunctionComponent<{}> = (props) => {
  const appState = useAppStateContext();
  return <BodyRenderer appState={appState} />;
};

export default Body;
