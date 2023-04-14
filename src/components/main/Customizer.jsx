import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../../store';
import { download,backIcon,shareIcon, HLogo,HLogo3, HLogo4 } from '../../assets';
import { downloadCanvasToImage, reader } from '../../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../../config/constants';
import { fadeAnimation, slideAnimation } from '../../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '..';
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import Image from 'next/image';

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })
  const tooltipFunc = (title) => {
    return <span>{title}</span>
  }

  // show tab content depending on the activeTab
  const closeFunc = () => {
    setActiveEditorTab("")
  }
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker           
          closeFunc={closeFunc}
        />
      case "filepicker":
        return <FilePicker
          set
          file={file}
          setFile={setFile}
          readFile={readFile}
          closeFunc={closeFunc}
        />
      case "aipicker":
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
          closeFunc={closeFunc}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }
  
  return (
    <AnimatePresence>

      {!snap.intro && (
        <>
          {/* <motion.div
            className="absolute z-10 top-5 left-5"
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles=" px-4 py-2.5 font-bold text-sm "
            />
          </motion.div> */}
          <motion.div
            className='absolute top-3 inset-x-0 px-3 flex justify-between'
            {...slideAnimation("down")}
          >
            <div className='glassmorphism rounded-[10px] px-5 py-3 flex'>
            <Tooltip
            placement="bottom"
            overlay={() => tooltipFunc("Back to Home")}
            >
              <Image src={backIcon} alt="Back Icon"  className="w-6 cursor-pointer" onClick={() => state.intro = true}/>
            </Tooltip>
              {/* <Image src={shareIcon} alt="Share Icon" className="w-6 ml-3 cursor-pointer"/> */}
              <Tooltip
            placement="bottom"
            overlay={() => tooltipFunc("Download Your Product")}
            >
              <Image src={download} alt="Download" className="w-6 ml-5 cursor-pointer" onClick={downloadCanvasToImage}/>
            </Tooltip>

            </div>
            <div>
              <Image src={HLogo4} alt="Healitia Logo" className="w-10 h-10"/>
            </div>

          </motion.div>
          <motion.div
            key="custom"
            className="absolute top-10 right-0 z-10"
            {...slideAnimation('right')}
            >
            <div className="flex flex-col justify-between py-10 min-h-screen">
              <div className="editortabs-container tabs w-16 border-[2px] rounded-lg flex flex-col justify-center items-center ml-1 py-4 gap-4">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {FilterTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={() => handleActiveFilterTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
        </>
      )}
      <a
        href='https://mehdirezakhani.ir'
        target='_blank'
        className='text-xs text-center font-semibold absolute bottom-0 inset-x-0 uppercase text-primary glassmorphism p-3 rounded-none'
      >COPYRIGHT © 2023 Developed by {" "}
        <span className='underline'>Mehdi Rezakhani</span>{" "}& Omid Afzali
      </a>
    </AnimatePresence>
  )
}

export default Customizer