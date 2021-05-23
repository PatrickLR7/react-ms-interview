import * as React from 'react';
import autosize, { update as autosizeUpdate } from 'autosize';

import { BinTreeNode } from './TreeNode';
import { parseChildren } from './utils/helper';
import { FileUpload } from './components/file-upload/FileUpload';
import { IGenericError } from './shared/types';
import './TreeInput.scss';

export interface TreeInputProps {
  onChange: (newTreeNode: BinTreeNode) => void;
}

interface TreeInputState {
  treeText: string;
  arrayFromUploadedFile: any[];
  fileUploadError: IGenericError;
  parsedJsonError: IGenericError;
}

export class TreeInput extends React.Component<TreeInputProps, TreeInputState> {
  constructor(props: TreeInputProps) {
    super(props);
    this.state = {
      treeText: '',
      arrayFromUploadedFile: [],
      fileUploadError: { error: false, message: '' },
      parsedJsonError: { error: false, message: '' },
    };
  }
  private textAreaRef =
    React.createRef() as React.RefObject<HTMLTextAreaElement>;

  componentDidMount() {
    //Solution to Problem #1
    const stringArrayFormat = ['a', ['b'], ['c']];
    const arrayFormat = [1, [2], [3, null, [5]]];
    const extraExample = [1, [2, [3]], [4, null, [5]]];
    const complexExample = [
      'a',
      ['b', ['b1'], ['b2', ['b21'], ['b22']]],
      [
        'c',
        ['c1', ['c11', ['c111']], ['c12', null, ['c121']]],
        ['c2', null, ['c21']],
      ],
    ];
    const stringParsedTree = this.parseArrayToTree(stringArrayFormat);
    const numberParsedTree = this.parseArrayToTree(arrayFormat);
    const extraExampleParsedTree = this.parseArrayToTree(extraExample);
    const complexExampleParsedTree = this.parseArrayToTree(complexExample);
    console.log('string example -> parsedTree: ', stringParsedTree);
    console.log('number example -> parsedTree: ', numberParsedTree);
    console.log('extra example -> parsedTree: ', extraExampleParsedTree);
    console.log('complex example -> parsedTree: ', complexExampleParsedTree);
    //End of solution for problem #1.

    if (this.textAreaRef.current) {
      autosize(this.textAreaRef.current);
    }
  }

  /**
   * Converts array format binary tree notation to BinTreeNode data structure
   * @param arrayFormat [id, leftChild, rightChild] for example [1, [2], [3, null, [5]]]
   * @returns TreeNode format
   * */
  parseArrayToTree(arrayFormat: any[]): BinTreeNode {
    const tree = new BinTreeNode(arrayFormat[0], null, null);
    tree.left = parseChildren(arrayFormat[1]);
    tree.right = parseChildren(arrayFormat[2]);
    return tree;
  }

  convert = () => {
    // After you implement parseArrayToTree above, uncomment the below code
    // let treeArrayFormat: any[] = JSON.parse(this.state.treeText);
    // this.props.onChange(this.parseArrayToTree(treeArrayFormat));
    // After you implement parseArrayToTree above, comment the below code
    let treeNodeFormat: BinTreeNode | null = null;
    try {
      treeNodeFormat = JSON.parse(this.state.treeText);
      this.setState({
        parsedJsonError: {
          error: false,
          message: '',
        },
      });
    } catch (err) {
      this.setState({
        parsedJsonError: {
          error: true,
          message: `Detected an error on the json you entered, please check it is valid. ${err}`,
        },
      });
    }
    if (treeNodeFormat) {
      this.props.onChange(treeNodeFormat);
    }
  };

  setArrayParsedFromFile = (arrayFromFile: any[]) => {
    this.setState(
      {
        arrayFromUploadedFile: arrayFromFile,
      },
      () => this.setTreeTextFromParsedArray()
    );
  };

  setFileUploadError = (fileUploadError: IGenericError) => {
    this.setState({
      fileUploadError: fileUploadError,
    });
  };

  setTreeTextFromParsedArray = () => {
    const { arrayFromUploadedFile } = this.state;
    const parsedBinaryTree = this.parseArrayToTree(arrayFromUploadedFile);
    const newTreeText = JSON.stringify(parsedBinaryTree, null, 2);
    this.setState(
      {
        treeText: newTreeText,
      },
      () => {
        if (this.textAreaRef.current) {
          autosizeUpdate(this.textAreaRef.current);
        }
      }
    );
  };

  render() {
    const { treeText, fileUploadError, parsedJsonError } = this.state;
    return (
      <div className="tree-input-container">
        <FileUpload
          setArrayParsedFromFile={this.setArrayParsedFromFile}
          setUploadedFileError={this.setFileUploadError}
        />
        <br />
        <textarea
          ref={this.textAreaRef}
          rows={5}
          cols={120}
          onChange={(ev) => {
            this.setState({
              treeText: ev.target.value,
            });
          }}
          value={treeText}
        />
        {fileUploadError.error && (
          <p className="validation-error">{fileUploadError.message}</p>
        )}
        {parsedJsonError.error && (
          <p className="validation-error">{parsedJsonError.message}</p>
        )}
        <button onClick={this.convert} className="process-button">
          Process
        </button>
      </div>
    );
  }
}
