import { FC } from 'react';
import { motion } from 'framer-motion';
// import cx from 'classnames';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { PRETITLE, TITLE, BUTTON_TEXT } from './constants';
// import { workerData } from 'worker_threads';
// import { title } from 'process';

import Button from 'components/button';

export const Hero: FC = () => {
  // const [currentOpacity, setCurrentOpacity] = useState(0);

  // const onStepProgress = (data) => {
  //   setCurrentOpacity((1 - data.progress) * 2);
  // };

  return (
    <section>
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div
            id="section-hero"
            className="relative w-full h-screen"
            style={{
              // zIndex: currentOpacity === 0 ? -1 : 20,
              background: 'url(images/intro-bg1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              marginTop: '-64px',
            }}
          >
            <div
              className="flex flex-col items-center justify-center w-full h-screen"
              // style={{
              //   userSelect: currentOpacity === 0 ? 'none' : 'auto',
              // }}
            >
              <motion.div
                animate={{ y: '-2rem', opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="relative max-w-xl mx-auto mb-4 font-bold tracking-wide text-center uppercase opacity-0 text-md top-8"
              >
                <div>{PRETITLE}</div>
              </motion.div>
              <motion.div
                animate={{ y: '-2rem', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative opacity-0 top-8"
              >
                <div className="flex flex-col items-center gap-2 px-1 font-serif text-7xl">
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
              {/* <motion.div
                animate={{ y: '-2rem', opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="relative max-w-xl mx-auto mt-8 text-lg text-center opacity-0 top-8"
              >
                <div>{SUBTITLE}</div>
              </motion.div> */}
              <motion.div
                animate={{ y: '-2rem', opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="relative mt-16 opacity-0 top-8"
              >
                <Button theme="primary" size="l" href="#section-cultivo-cultura-cambio">
                  {BUTTON_TEXT}
                </Button>
              </motion.div>
            </div>
          </div>
        </Desktop>
        <Mobile>
          <div>Mobile</div>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default Hero;
