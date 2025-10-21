import React from 'react';
const ImageTest = () => {
  const testImages = [
    '/assets/logos/konnichiwow-logo.png',
    '/assets/mascots/mascot-default.png',
  ];
  return (
    <div style={{ padding: '2rem', background: 'white', borderRadius: '12px' }}>
      <h2>Image Loading Test</h2>
      {testImages.map((src, index) => (
        <div key={index} style={{ margin: '1rem 0' }}>
          <p>Path: {src}</p>
          <img 
            src={src} 
            alt={`Test ${index}`}
            style={{ 
              width: '200px', 
              height: '200px', 
              border: '2px solid red',
              objectFit: 'contain' 
            }}
            onError={(e) => {
              console.error(`❌ FAILED to load: ${src}`);
              e.target.nextSibling.textContent = '❌ Image failed to load';
            }}
            onLoad={(e) => {
              console.log(`✅ SUCCESS loading: ${src}`);
              e.target.nextSibling.textContent = '✅ Image loaded successfully';
            }}
          />
          <p style={{ color: 'red' }}>Loading status...</p>
        </div>
      ))}
    </div>
  );
};
export default ImageTest;