import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Layout.css';
import HomePage from './HomePage';
import MaterialsGuide from './MaterialsGuide';
import BuildingTips from './BuildingTips';
import SideBar from './SideBar';
import { useState } from 'react';

function App() {
  const [length, setLength] = useState(() => {
    return Number(localStorage.getItem('length')) || 0;
  });
  const [width, setWidth] = useState(() => {
    return Number(localStorage.getItem('width')) || 0;
  });
  const [height, setHeight] = useState(() => {
    return Number(localStorage.getItem('height')) || 0;
  });

  const updateDimensions = (lengthInput, widthInput, heightInput) => {
    setLength(lengthInput);
    setWidth(widthInput);
    setHeight(heightInput);
    localStorage.setItem('length', lengthInput);
    localStorage.setItem('width', widthInput);
    localStorage.setItem('height', heightInput);
  };

  return (
    <Router>
      <div className="App">

        <SideBar />

        <Routes>
          <Route path="/" element={<HomePage updateDimensions={updateDimensions} length={length} width={width} height={height} />} />
          <Route path="/materials" element={<MaterialsGuide length={length} width={width} height={height} />} />
          <Route path="/tips" element={<BuildingTips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
