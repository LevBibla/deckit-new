import React, { useEffect, useState } from 'react';
function HomePage({ updateDimensions, length, width, height }) {
  const [deckArea, setDeckArea] = useState(0);
  const [deckingDirection, setDeckingDirection] = useState('parallel');
  const [joistsNeeded, setJoistsNeeded] = useState(0);
  const [footingsNeeded, setFootingsNeeded] = useState(0);
  const FOOTINGSPACING = 8;

  useEffect(() => {
    const area = Number(length) * Number(width);
    setDeckArea(area);
  }, [length, width]);

  useEffect(() => {
    if (deckingDirection === 'parallel') {
      // 16" on center joist spacing
      const joistsNeeded = Math.ceil(Number(length) * 12 / 16);
      setJoistsNeeded(joistsNeeded);
    } else {
      const joistsNeeded = Math.ceil(Number(width) * 12 / 16);
      setJoistsNeeded(joistsNeeded);
    }
  }, [deckingDirection, length, width]);

  // Separate useEffect for footings calculation
  useEffect(() => {
    const footingLength = Number(length) / FOOTINGSPACING + 1;
    const footingWidth = Number(width) / FOOTINGSPACING + 1;
    
    if (footingLength - Math.floor(footingLength) > 0.5) {
      if (footingWidth - Math.floor(footingWidth) > 0.25) {
        const footingsNeeded = Math.ceil(footingLength) * Math.ceil(footingWidth) - Math.ceil(footingLength);
        setFootingsNeeded(footingsNeeded);
      } else {
        const footingsNeeded = Math.ceil(footingLength) * Math.floor(footingWidth) - Math.ceil(footingLength);
        setFootingsNeeded(footingsNeeded);
      }
    } else {
      if (footingWidth - Math.floor(footingWidth) > 0.25) {
        const footingsNeeded = Math.floor(footingLength) * Math.ceil(footingWidth) - Math.floor(footingLength);
        setFootingsNeeded(footingsNeeded);
      } else {
        const footingsNeeded = Math.floor(footingLength) * Math.floor(footingWidth) - Math.floor(footingLength);
        setFootingsNeeded(footingsNeeded);
      }
    }
  }, [length, width]);

  // Add this helper function for the visual styles
  const getVisualStyles = (direction) => ({
    // Main container for everything
    container: {
      border: '2px solid #888',
      borderRadius: '4px',
      padding: '15px',
      marginTop: '15px',
      width: '220px',
      height: '120px',
      position: 'relative',
      display: 'flex',
      gap: '0px',
      backgroundColor: '#567d46',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },

    // Container to center the house vertically
    houseContainer: {
      width: '100px',
      height: '85px',
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
      alignItems: 'center',

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
            width: 'px',
            minWidth: '2px',
            background: 'linear-gradient(90deg, #996633 0%, #8B4513 100%)'
          }
        : { 
            height: '2px',
            minHeight: '2px',
            background: 'linear-gradient(180deg, #996633 0%, #8B4513 100%)'
          }
      )
    }
  });

  return (
    <div className="layout">
      <div className="main-content">
        <div className="content-wrapper">
          <h1>Your Custom Deck</h1>
          
          <div style={{marginBottom: '25px'}}>
            <p>Through this guide you can learn what materials you'll need for your deck project</p>
            <ul style={{marginLeft: '20px', lineHeight: '1.4'}}>
            </ul>
            <p style={{marginTop: '15px'}}>Enter your deck dimensions below to get started:</p>
          </div>

          <div style={{marginBottom: '15px'}}>
            <label>
              Length (ft):
              <input 
                type="number"
                value={length}
                onChange={(e) => updateDimensions(Number(e.target.value), width, height)}
                min="0"
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
                onChange={(e) => updateDimensions(length, Number(e.target.value), height)}
                min="0"
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
                onChange={(e) => updateDimensions(length, width, Number(e.target.value))}
                min="0"
                style={{marginLeft: '10px'}}
              />
            </label>
          </div>

            {/* Explanation text in its own div */}
            <div style={{margin: '15px 0'}}>
              <p>Typically, decking is installed parallel to the house, since joists run perpendicular to the house, though the reverse can also be done with some extra effort. Choose your style.</p>
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
                <option value="parallel">Parallel to house</option>
                <option value="perpendicular">Perpendicular to house</option>
              </select>
            </label>
            
            {/* House visual in separate div */}
            <div style={{
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
              Your Deck Area (sq ft):
              <input
                type="number"
                value={deckArea}
                readOnly
                style={{marginLeft: '10px'}}
              />
            </label>
          </div>
          <h2>Materials Needed</h2>
          <div style={{marginTop:'15px'}}>
            <div style={{padding: '20px'}}>
              <p>Given the size of your deck you'll need the following materials. When shopping always look for striaghest boards, without significant cracks or knots. </p>
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
          <div style={{marginBottom:'150px'}}>
            <label>
              Min # Footings Needed:
              <input
                type="number"
                value={footingsNeeded}
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

export default HomePage;