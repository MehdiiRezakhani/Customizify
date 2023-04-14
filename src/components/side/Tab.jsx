import React from 'react'
import Image from 'next/image';
import { useSnapshot } from 'valtio'

import state from '../../store';
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);
  const tooltipFunc = (title) => {
    return <span>{title}</span>
  }

  const activeStyles = isFilterTab && isActiveTab 
    ? { backgroundColor: "#636262cc", opacity: 1 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism ' : 'rounded-4'}`}
      onClick={handleClick}
      style={activeStyles}
    >
    {/* <Tooltip
    placement="bottom"
    overlay={() => tooltipFunc("Back to Home")}
    > */}
      <Image
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
      />
      {/* /</Tooltip> */}
    </div>
  )
}

export default Tab