import React, { useState, useEffect } from 'react';

function HomePage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [deckArea, setDeckArea] = useState(0);
  const [deckingDirection, setDeckingDirection] = useState('parallel');
  const [joistsNeeded,setjoistsNeeded] = useState(0);

  useEffect(()=>{
    const area = Number(length)*Number(width);
    setDeckArea(area);
  }, [length, width]);

  useEffect(()=>{
    if (deckingDirection === 'parallel'){
      // 16" on center joist spacing
      const joistsNeeded = Number(length)*12/16;
      setjoistsNeeded(joistsNeeded);
    } else {
      const joistsNeeded = Number(width)*12/16;
      setjoistsNeeded(joistsNeeded);
    }
  }, [deckingDirection, length, width]);

  // Add this helper function for the visual styles
  const getVisualStyles = (direction) => ({
    // Main container for everything
    container: {
      border: '2px solid #888',
      borderRadius: '4px',
      padding: '15px',
      marginTop: '15px',
      width: '180px',
      height: '80px',
      position: 'relative',
      display: 'flex',
      gap: '0px',
      backgroundColor: '#f5f5f5',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },

    // Container to center the house vertically
    houseContainer: {
      width: '100px',
      height: '80px',
      display: 'flex',           // Using flexbox for centering
      alignItems: 'center',      // Center vertically
      justifyContent: 'center'   // Center horizontally
    },

    // The house shape itself
    house: {
      width: '90px',            // Square dimensions
      height: '90px',
      position: 'relative',     // Needed for absolute positioning of triangles
    },

    // Base styles for all triangles
    triangle: {
      position: 'absolute',     // Position triangles relative to house container
      width: 0,                 // Triangles are created using borders
      height: 0,
      borderStyle: 'solid',
    },

    // Top triangle of the house
    topTriangle: {
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)', // Centers the triangle
      borderWidth: '45px 45px 0 45px',
      borderColor: '#4a4a4a transparent transparent transparent', // Only top border is colored
    },

    // Right triangle of the house
    rightTriangle: {
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)', // Centers the triangle
      borderWidth: '45px 45px 45px 0',
      borderColor: 'transparent #5c5c5c transparent transparent', // Only right border is colored
    },

    // Bottom triangle of the house
    bottomTriangle: {
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)', // Centers the triangle
      borderWidth: '0 45px 45px 45px',
      borderColor: 'transparent transparent #4a4a4a transparent', // Only bottom border is colored
    },

    // Left triangle of the house
    leftTriangle: {
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)', // Centers the triangle
      borderWidth: '45px 0 45px 45px',
      borderColor: 'transparent transparent transparent #5c5c5c', // Only left border is colored
    },

    // Deck container and boards
    deckContainer: {
      flex: 1,
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    boards: {
      display: 'flex',
      flexDirection: direction === 'parallel' ? 'row' : 'column',
      height: '100%',
      width: '100%',
      gap: '1px',

    },
    board: {
      backgroundColor: '#8B4513',
      borderRadius: '0',
      flex: 1,
      background: 'linear-gradient(90deg, #996633 0%, #8B4513 100%)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      ...(direction === 'parallel' 
        ? { 
            width: '1px',
            minWidth: '1px',
            background: 'linear-gradient(90deg, #996633 0%, #8B4513 100%)'
          }
        : { 
            height: '1px',
            minHeight: '1px',
            background: 'linear-gradient(180deg, #996633 0%, #8B4513 100%)'
          }
      )
    }
  });

  return (
    <div style={{padding: '20px'}}>
      <h1>Deck Dimensions</h1>
      <div style={{marginBottom: '15px'}}>
        <label>
          Length (ft):
          <input 
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
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
            onChange={(e) => setWidth(e.target.value)}
            style={{marginLeft: '10px'}}
          />
        </label>
      </div>
      <div style={{marginBottom: '15px'}}>
        <label>
          Height (ft):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{marginLeft: '10px'}}
          />
        </label>
      </div>
      {/* Decking Direction */}
      <div style={{marginBottom: '15px'}}>
        <label>
          Decking Direction:
          <select 
            value={deckingDirection} 
            onChange={(e) => setDeckingDirection(e.target.value)}
            style={{marginLeft: '10px'}}
          >
            <option value="parallel">Parallel to Length</option>
            <option value="perpendicular">Perpendicular to Length</option>
          </select>
        </label>
        {/* Center the visual */}
        <div style={{
          marginTop: '5px',
          display: 'flex',
          justifyContent: 'center'  // This centers the visual horizontally
        }}>
          <div style={getVisualStyles(deckingDirection).container}>
            <div style={getVisualStyles(deckingDirection).houseContainer}>
              <div style={getVisualStyles(deckingDirection).house}>
                <div style={{...getVisualStyles(deckingDirection).triangle, ...getVisualStyles(deckingDirection).topTriangle}} />
                <div style={{...getVisualStyles(deckingDirection).triangle, ...getVisualStyles(deckingDirection).rightTriangle}} />
                <div style={{...getVisualStyles(deckingDirection).triangle, ...getVisualStyles(deckingDirection).bottomTriangle}} />
                <div style={{...getVisualStyles(deckingDirection).triangle, ...getVisualStyles(deckingDirection).leftTriangle}} />
              </div>
            </div>
            <div style={getVisualStyles(deckingDirection).deckContainer}>
              <div style={getVisualStyles(deckingDirection).boards}>
                {[...Array(16)].map((_, index) => (
                  <div key={index} style={getVisualStyles(deckingDirection).board} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Deck Area */}
      <div style={{marginBottom:'15px'}}>
        <label>
          Deck Area (sq ft):
          <input
            type="number"
            value={deckArea}
            readOnly
            style={{marginLeft: '10px'}}
          />
        </label>
      </div>
      <div style={{marginBottom:'15px'}}>
        <div style={{padding: '20px'}}>
          <h2>Materials Needed</h2>
          <label>
            Min # Joists Needed (16" on center):
            <input
              type="number"
              value={joistsNeeded}
              readOnly
              style={{marginLeft: '10px'}}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default HomePage;