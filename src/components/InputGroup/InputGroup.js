import React from 'react';

const InputGroup = ({ label, type = 'text', placeholder, value, onChange, addon }) => {
  return (
    <div className="relative flex items-center">
      {addon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 bg-gray-200 rounded-l-md">
          {addon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${addon ? 'pl-10' : ''}`}
      />
    </div>
  );
};

export default InputGroup;
