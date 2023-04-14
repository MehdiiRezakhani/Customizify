import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../../store';
import CustomButton from '../side/CustomButton';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../../config/motion';
import { getContrastingColor } from '../../config/helpers';
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { HLogo3 } from '@/assets';

const Home = () => {
  const snap = useSnapshot(state);
  const tooltipFunc = (title) => {
    return <span>{title}</span>
  }

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <Tooltip
            placement="left"
            overlay={() => tooltipFunc("Healitia | A Fresh Life")}
            >
            <Image
              src={HLogo3}
              alt="Healitia Logo"
              width={160}
              height={160}
              className="object-contain"
            />
          </Tooltip>
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="xl:text-[10rem] text-[3rem] xl:leading-[8rem] leading-[5rem] font-black text-primary"
              >LET&#39;S <br className="xl:block hidden" /> DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-1 glassmorphism p-5 rounded-[10px]"
            >
              <p 
                className="max-w-m text-primary text-base font-normal" 
                >
                <strong>Customizify</strong>{" "}is powered by{" "}<strong>Healitia</strong><br/>
                Create your exclusive shirt with our brand-new 3D customization tool. ThreeJS, NextJS, TailwindCSS, and TypeScript are used in this project. 
              </p>

              <CustomButton 
                type="filled"
                title="Get Started"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm self-end"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home