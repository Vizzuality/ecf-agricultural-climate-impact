import { FC, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
// import { Controller, Scene } from 'react-scrollmagic';

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
    console.log('enter', data);
    setCurrentStep(data.data);
  };

  const onStepProgress = (data) => {
    console.log('progress', data);
  };

  return (
    <section>
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="relative w-full">
            <div className="sticky top-0">
              {/* BG */}
              <div className="absolute top-0 left-0 flex w-full h-screen filter bg-image">
                <img
                  className="object-cover w-screen h-auto"
                  src="images/cultivoCulturaCambio-bg1.jpg"
                  alt="background"
                  role="decoration"
                  style={{ filter: `grayscale(${(1 * currentStep.id - 1) / (STEPS.length - 1)})` }}
                />
              </div>
              <div className="w-full h-screen max-w-screen-lg mx-auto text-lg">
                {/* WORDS */}
                <div className="flex flex-col items-start gap-3" style={{ paddingTop: '10vh' }}>
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
            <Scrollama onStepEnter={onStepEnter} onStepProgress={onStepProgress} offset={0.2}>
              {STEPS.map((step, i) => (
                <Step key={step.id} data={step}>
                  <div
                    className="w-full"
                    // className="h-screen -translate-x-1/2 left-1/2"
                    style={{
                      paddingLeft: 'calc((100vw - 1024px) / 2)',
                      paddingRight: 'calc((100vw - 1024px) / 2)',
                      marginTop: i === 0 ? '-100vh' : '',
                      paddingBottom: i === STEPS.length - 1 ? '50vh' : '',
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
                </Step>
              ))}
            </Scrollama>
          </div>
        </Desktop>
        <Mobile>
          <div>Mobile</div>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default CultivoCulturaCambio;
