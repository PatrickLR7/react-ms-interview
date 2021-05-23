import React, { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { ReactComponent as JsonIcon } from '../../assets/json-file-icon.svg';
import { IGenericError } from '../../shared/types';
import './FileUpload.scss';

type IProcessFilesFunction = <T extends File>(acceptedFile: T[]) => void;

interface IFileUploadProps {
  setArrayParsedFromFile: (array: any[]) => void;
  setUploadedFileError: (fileUploadError: IGenericError) => void;
}

export const FileUpload: FC<IFileUploadProps> = ({
  setArrayParsedFromFile,
  setUploadedFileError,
}) => {
  const [fileName, setFileName] = useState('');

  const processUploadedFile: IProcessFilesFunction = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      const jsonObject = JSON.parse(typeof result === 'string' ? result : '');
      if (Array.isArray(jsonObject)) {
        setArrayParsedFromFile(jsonObject);
        setUploadedFileError({
          error: false,
          message: '',
        });
      } else {
        setUploadedFileError({
          error: true,
          message:
            'Unable to parse the uploaded file to an array. Please check file format is correct.',
        });
      }
    };
    reader.readAsText(uploadedFile);
    setFileName(uploadedFile.name);
  };

  // eslint-disable-next-line
  const onDrop = useCallback(processUploadedFile, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'application/json',
  });

  return (
    <div {...getRootProps()} className="file-upload-container">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here...</p>
      ) : (
        <>
          <p>
            {fileName === ''
              ? 'Drag and drop a json file in the valid format here, or click to select a file.'
              : fileName}
          </p>
          <JsonIcon className="json-icon" />
        </>
      )}
    </div>
  );
};

export default FileUpload;
