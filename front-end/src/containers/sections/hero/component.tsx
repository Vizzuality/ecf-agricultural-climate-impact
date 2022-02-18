import { FC, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import cx from 'classnames';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { TITLE, SUBTITLE, BUTTON_TEXT } from './constants';
import { workerData } from 'worker_threads';
import { title } from 'process';

import Button from 'components/button';

export const Hero: FC = () => {
  const [currentOpacity, setCurrentOpacity] = useState(0);

  const onStepProgress = (data) => {
    setCurrentOpacity((1 - data.progress) * 2);
  };

  return (
    <section>
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <Scrollama onStepProgress={onStepProgress} progress={true} offset={1}>
            <Step>
              <div
                className="relative w-full"
                style={{ height: '200vh', zIndex: currentOpacity === 0 ? -1 : 20 }}
              >
                <div
                  className="fixed flex flex-col items-center justify-center w-full h-screen"
                  style={{
                    opacity: currentOpacity,
                    userSelect: currentOpacity === 0 ? 'none' : 'auto',
                  }}
                >
                  <motion.div
                    animate={{ y: '-2rem', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative opacity-0 top-8"
                  >
                    <div className="flex flex-col items-center gap-2 px-1 font-serif text-6xl">
                      {TITLE.map((item) => (
                        <span
                          key={`title-${item.id}`}
                          className="block px-2 py-5 text-white bg-primary-red"
                        >
                          {item.content}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ y: '-2rem', opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="relative max-w-xl mx-auto mt-8 text-lg text-center opacity-0 top-8"
                  >
                    <div>{SUBTITLE}</div>
                  </motion.div>
                  <motion.div
                    animate={{ y: '-2rem', opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="relative mt-16 opacity-0 top-8"
                  >
                    <Button theme="primary" size="l">
                      {BUTTON_TEXT}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Step>
          </Scrollama>
        </Desktop>
        <Mobile>
          <div>Mobile</div>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default Hero;
