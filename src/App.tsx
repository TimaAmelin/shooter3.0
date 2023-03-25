import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas/Canvas';

function App() {
  return (
    <div className="App">
      <Canvas width={800} height={600} />
    </div>
  );
}

export default App;
