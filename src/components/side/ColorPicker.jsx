import React from 'react'
import Image from 'next/image';
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import { closeIcon } from '../../assets';
import state from '../../store';

const ColorPicker = ({closeFunc}) => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute right-full mr-3 bg-white rounded-md p-2 shadow-shadowA">
      <Image
          src={closeIcon} 
          alt="Close Icon"
          className='w-5 h-5 absolute top-0 right-0 z-10'
          onClick={closeFunc}
        />
      <SketchPicker 
        color={snap.color}
        disableAlpha
        onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker