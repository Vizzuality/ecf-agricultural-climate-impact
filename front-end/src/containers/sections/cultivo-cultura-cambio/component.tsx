import { FC, useState } from 'react';
// import { Scrollama, Step } from 'react-scrollama';
import { Controller, Scene } from 'react-scrollmagic';

import cx from 'classnames';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { STEPS, WORDS } from './constants';
import { workerData } from 'worker_threads';

// components
import Hero from '../hero';
import { getFlyToDuration } from '@math.gl/web-mercator';

export const CultivoCulturaCambio: FC = () => {
  const [currentStep, setCurrentStep] = useState(STEPS[0]);
  const [currentOpacity, setCurrentOpacity] = useState(0);

  const onStepEnter = (data) => {
    setCurrentStep(data.data);
  };

  const onStepProgress = (data) => {
    if (data.progress < 0.5) {
      if (data.data.id === STEPS[0].id) {
        setCurrentOpacity(1);
      } else {
        if (data.progress >= 0.25) {
          setCurrentOpacity(1);
        } else {
          setCurrentOpacity(data.progress);
        }
      }
    } else {
      if (data.data.id === STEPS.length) {
        setCurrentOpacity(1);
      } else {
        if (data.progress >= 0.75) {
          setCurrentOpacity(1 - data.progress);
        } else {
          setCurrentOpacity(1);
        }
      }
    }
  };

  return (
    <section className="relative">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <Controller>
            <div className="w-full">
              <Scene
                duration={0}
                pin={true}
                // pushFollowers={false}
                enabled={true}
                triggerHook={0}
                classToggle={['.mapa-calentamiento', 'z-30']}
              >
                <div>
                  {/* BG */}
                  <div className="absolute top-0 left-0 flex w-full h-screen filter bg-image">
                    <img
                      className="object-cover w-screen h-auto"
                      src="images/cultivoCulturaCambio-bg1.jpg"
                      alt="background"
                      role="decoration"
                    />
                  </div>
                  <div
                    className="top-0 left-0 flex items-center flex-1 w-full h-screen max-w-screen-lg mx-auto text-lg"
                    // style={{ top: '-10%' }}
                  >
                    {/* WORDS */}
                    <div className="flex flex-col items-start gap-3 -mt-64">
                      {WORDS.map((word) => (
                        <div
                          key={`word-${word.id}`}
                          className={cx({
                            'relative px-1 py-3 bg-primary-red text-white font-serif text-7xl transition-opacity duration-500':
                              true,
                            'left-16': word.id === 1,
                            'opacity-50': currentStep.id <= word.id,
                          })}
                        >
                          {word.content}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Scene>
              {STEPS.map((step, i) => (
                <Scene
                  key={`step=${i}`}
                  // duration="100%"
                  duration={800}
                  pin={true}
                  enabled={true}
                  triggerHook={0}
                  classToggle={['.bg-image', i === 0 ? '' : i === 1 ? 'saturate-50' : 'saturate-0']}
                >
                  <div
                    className="w-full"
                    // className="h-screen -translate-x-1/2 left-1/2"
                    style={{
                      paddingLeft: 'calc((100vw - 1024px) / 2)',
                      paddingRight: 'calc((100vw - 1024px) / 2)',
                      marginTop: i === 0 ? '-100vh' : '',
                    }}
                  >
                    <div
                      className="relative flex items-center w-1/2 text-lg left-1/2"
                      // className="flex items-center py-16 text-lg transform -translate-y-1/2 top-1/2"
                      style={{
                        // opacity: step.id === currentStep.id ? currentOpacity : '0',
                        // width: '50vw',
                        // height: '60vh',
                        height: 'calc(100vh - 16rem)',
                      }}
                    >
                      {step.content}
                    </div>
                  </div>
                </Scene>
              ))}
            </div>
          </Controller>
        </Desktop>
        <Mobile>
          <div>Mobile</div>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default CultivoCulturaCambio;
