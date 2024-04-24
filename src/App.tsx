import { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table/Table';
import sampleTodos from './data/sampleTodosLarge.json';
import Button from './components/Button/Button';
import Dropdown from './components/Dropdown/Dropdown';

type AppState = {
  data: { [key: string]: any }[],
  keys: string[]
}

function App() {
  const [state, setState] = useState<AppState>({
    data: [],
    keys: []
  })

  const [sortSelection, setSortSelection] = useState<string>("");

  useEffect(() => {
    setState({
      data: sampleTodos,
      keys: Object.keys(sampleTodos[0])
    })
  }, [])


  return (
    <div className="App">
      <div className="app-container">
        <Table keys={state.keys} data={state.data} />
        <div className="footer">
          <div className="footer-container">
            <Button onClick={() => console.log('uploading file')} text="Upload file" />
            <Button onClick={() => console.log('downloading file')} text="Download file" />
          </div>
          <div className="footer-container">
            <p className="selection-text">Sort by: </p>
            <Dropdown options={state.keys} selected={sortSelection} setSelected={setSortSelection} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
