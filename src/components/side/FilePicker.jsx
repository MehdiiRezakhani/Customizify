import React, { useState } from 'react'
import Image from 'next/image'

import CustomButton from './CustomButton'
import { closeIcon } from '../../assets'

const FilePicker = ({ file, setFile, readFile ,closeFunc}) => {
  return (
    <div className='absolute right-full mr-3 p-3 w-[195px] h-[220px] flex flex-col rounded-md bg-white shadow-shadowA'>      
      <div className="flex-1 flex flex-col">
        <Image
          src={closeIcon} 
          alt="Close Icon"
          className='w-5 h-5 absolute top-2 right-2'
          onClick={closeFunc}
        />
        <input 
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === '' ? "No file selected" : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => readFile('logo')}
          className="px-2 py-1.5 flex-1 rounded-md text-primary text-xs border-[1px] border-primary focus:outline-none focus:ring-0 focus:border-secondary"
        >Logo
        </button>
        <button
          onClick={() => readFile('full')}
          className="px-2 py-1.5 flex-1 rounded-md text-primary text-xs border-[1px] border-primary focus:outline-none focus:ring-0 focus:border-secondary"
        >Full
        </button>
      </div>
    </div>
  )
}

export default FilePicker