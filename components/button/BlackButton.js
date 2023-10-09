import React from 'react';

function BlackButton({ text, onClick }) {
  if (!onClick) onClick = () => console.log('no onClick function passed');
  return (
    <button
      onClick={() => onClick()}
      className='inline-flex items-center text-white bg-black border-0 py-2 px-8 focus:outline-none rounded text-lg drop-shadow-md hover:drop-shadow-lg w-max'
    >
      {text}
    </button>
  );
}

export default BlackButton;
