import React from 'react';
import { InputFieldProps } from "../types/Props";



const InputField: React.FC<InputFieldProps> = ({ title, value, onChange }) => {
  return (
    <div className='flex flex-col'>
      <label className='mb-2 ml-5 text-left'>{title}</label>
      <input className='bg-gray-100 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md p-2 ml-5' type="text" value={value} onChange={onChange}/>
    </div>
  );
};

export default InputField;