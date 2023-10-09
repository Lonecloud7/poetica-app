import React from 'react';

function SecondaryButton({ text, onClick }) {
  if (!onClick) onClick = () => console.log('no onClick function passed');
  return (
    <button
      onClick={() => onClick()}
      className='inline-flex items-center text-indigo-600 hover:text-indigo-700 bg-white  py-2 px-8 focus:outline-none rounded text-lg drop-shadow-md hover:drop-shadow-lg w-max'
    >
      {text}
    </button>
  );
}

export default SecondaryButton;
