import { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table/Table';
import sampleTodos from './data/sampleTodosLarge.json';
import Button from './components/Button/Button';

type AppState = {
  data: { [key: string]: any }[],
  keys: string[]
}

function App() {
  const [state, setState] = useState<AppState>({
    data: [],
    keys: []
  })

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
          <Button onClick={() => console.log('sort')} text="Sort" />
          <Button onClick={() => console.log('filter')} text="Filter" />
          <Button onClick={() => console.log('uploading file')} text="Upload file" />
          <Button onClick={() => console.log('downloading file')} text="Download file" />
        </div>
      </div>
    </div>
  );
}

export default App;
