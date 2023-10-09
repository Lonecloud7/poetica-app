import React from 'react';

function BlackButton({ text }) {
  return (
    <button className='inline-flex items-center text-white bg-black border-0 py-2 px-8 focus:outline-none rounded text-lg drop-shadow-md hover:drop-shadow-lg w-max'>
      {text}
    </button>
  );
}

export default BlackButton;
