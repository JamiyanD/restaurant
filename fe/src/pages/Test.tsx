import React, { useState } from 'react';

const MyComponent = () => {
  const [hidden, setHidden] = useState(false);

  const handleClick = () => {
    setHidden(true);
  };

  return (
    <div className="flex justify-center">
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Click me to hide element
      </button>
      
      {!hidden && (
        <div className="p-4">
          This element will be hidden when the button above is clicked.
        </div>
      )}
    </div>
  );
};

export default MyComponent;
