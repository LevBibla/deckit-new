import React from 'react';
import './Layout.css';

function MaterialsGuide({ length, width, height }) {
  return (
    <div className="layout">
      <div className="main-content">
        <div className="content-wrapper">
          <h1>Materials Guide</h1>
          <div className="card">
            <h2>Essential Deck Materials</h2>
            <ul style={{lineHeight: '1.6'}}>
              <li>Decking Boards</li>
              <li>Joists and Beams</li>
              <li>Support Posts</li>
              <li>Concrete Footings</li>
              <li>Hardware and Fasteners</li>
            </ul>
          </div>
          
          <div className="card">
            <h2>Material Types</h2>
            <p>Common decking materials include:</p>
            <ul style={{lineHeight: '1.6'}}>
              <li>Pressure-treated lumber</li>
              <li>Cedar or Redwood</li>
              <li>Composite decking</li>
              <li>PVC decking</li>
            </ul>
          </div>

          <div style={{marginBottom: '15px'}}>
            <label>
              Length (ft):
              <input 
                type="number"
                value={length}
                readOnly
                style={{marginLeft: '10px'}}
              />
            </label>
          </div>
          <div style={{marginBottom: '15px'}}>
            <label>
              Width (ft):
              <input
                type="number" 
                value={width}
                readOnly
                style={{marginLeft: '10px'}}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaterialsGuide;  