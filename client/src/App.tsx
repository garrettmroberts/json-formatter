import React from 'react';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import './App.css';
import Table from './components/Table/Table';
import sampleTodos from './data/sampleTodosLarge.json';
import Button from './components/Button/Button';
import Dropdown from './components/Dropdown/Dropdown';
import JsonFileReader from './util/JsonFileReader';

type AppState = {
  data: {[key: string]: string | number | boolean}[];
  keys: string[];
};

function App() {
  const [state, setState] = useState<AppState>({
    data: [],
    keys: [],
  });
  const [sortSelection, setSortSelection] = useState<string>('');

  const [file, setFile] = useState<File>();
  const [fileContents, setFileContents] =
    useState<{[key: string]: string | number | boolean}[]>();
  const [isDownloadEnabled, setIsDownloadEnabled] = useState<boolean>(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setState({
      data: sampleTodos,
      keys: Object.keys(sampleTodos[0]),
    });
  }, []);

  useEffect(() => setIsDownloadEnabled(file?.name !== undefined), [file]);

  useEffect(() => {
    setState(prevState => {
      return {
        data: prevState.data.sort((a, b) =>
          a[sortSelection] > b[sortSelection] ? 1 : -1,
        ),
        keys: prevState.keys,
      };
    });
  }, [sortSelection]);

  const handleFileUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      // Save file metadata
      const fileUploaded = files[0];
      setFile(fileUploaded);

      //Interpret file contents
      const jsonFile = await JsonFileReader.readFile(fileUploaded);
      setFileContents(jsonFile);

      // Populate table
      setState({
        data: jsonFile,
        keys: Object.keys(jsonFile[0]),
      });
    }
  };

  const handleFileUploadClick = (): void => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleFileDownload = (): void => {
    if (fileContents) {
      const fileName = file?.name || 'sampleFile.json';
      const json = JSON.stringify(fileContents, null, 2);
      const blob = new Blob([json], {type: 'application/json'});
      const href = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = href;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  };

  const openSampleFile = async (): Promise<void> => {
    const res = await fetch('http://localhost:8080/api/sample-json?size=large');
    const json = await res.json();
    setState({
      keys: Object.keys(json[0]),
      data: json,
    });
    const file = new File([json], 'sampleFile.json', {
      type: 'application/json',
    });
    setFileContents(json);
    setFile(file);
    setIsDownloadEnabled(true);
  };

  return (
    <div className="App">
      <div className="app-container">
        <Table keys={state.keys} data={state.data} />
        <div className="footer">
          <div className="footer-container">
            <input
              className="hidden-file-upload"
              type="file"
              onChange={handleFileUpload}
              ref={hiddenFileInput}
              accept=".json"
            />
            <Button onClick={handleFileUploadClick} text="Upload file" />
            <Button
              onClick={handleFileDownload}
              text="Download file"
              disabled={!isDownloadEnabled}
            />
            <Button onClick={openSampleFile} text="Open sample file" />
          </div>
          <div className="footer-container">
            <p className="selection-text">Sort by: </p>
            <Dropdown options={state.keys} setSelected={setSortSelection} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
