import React from 'react'
import Image from 'next/image';
import { closeIcon } from '../../assets'

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit,closeFunc }) => {
  return (
    <div className="absolute right-full mr-3 p-3 bg-white w-[195px] h-[220px] rounded-md flex flex-col gap-4 shadow-shadowA">
      <Image 
          src={closeIcon} 
          alt="Close Icon"
          className='w-5 h-5 absolute top-2 right-2'
          onClick={closeFunc}
      />
      <textarea 
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
            <button
              className="px-2 py-1.5 flex-1 rounded-md text-primary text-xs border-[1px] border-primaryLight focus:outline-none focus:ring-0 focus:border-primaryLight"
            >Asking AI...
            </button>
        ) : (
          <>
            <button
              onClick={() => handleSubmit('logo')}
              className="px-2 py-1.5 flex-1 rounded-md text-primary text-xs border-[1px] border-primary focus:outline-none focus:ring-0 focus:border-secondary"
            >AI Logo  
            </button>
            <button
              onClick={() => handleSubmit('full')}
              className="px-2 py-1.5 flex-1 rounded-md text-primary text-xs border-[1px] border-primary focus:outline-none focus:ring-0 focus:border-secondary"
            >AI Full  
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker