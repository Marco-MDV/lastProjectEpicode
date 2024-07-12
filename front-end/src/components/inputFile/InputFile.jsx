import React from 'react';

export default function InputFile({ handleImg }) {
  return (
    <div className="flex flex-col gap-2 ">
      <label className="dark:text-white">Picture:</label>
      <input
        id="picture"
        type="file"
        className="border  border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 file:bg-white file:text-gray-700 hover:file:bg-slate-50 "
        accept="image/png"
        onChange={handleImg}
        name="img"
      />
    </div>
  );
}
