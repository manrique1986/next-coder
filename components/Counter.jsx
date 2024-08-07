"use client";
import React, { useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(1);

  const handleCounterChange = (change) => {
    setCounter((prevCounter) =>
      change === 1
        ? prevCounter < 10
          ? prevCounter + change
          : prevCounter
        : prevCounter > 1
        ? prevCounter + change
        : prevCounter
    );
  };

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <div className='flex items-center gap-2 text-xl font-bold'>
        <button
          onClick={() => handleCounterChange(-1)}
          className='px-3 py-1 bg-gray-200 rounded'
        >
          -
        </button>
        <span className='text-gray-700 p-3'>{counter}</span>
        <button
          onClick={() => handleCounterChange(1)}
          className='px-3 py-1 bg-gray-200 rounded'
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;