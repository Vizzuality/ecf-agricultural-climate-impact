import { FC, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
// import { Controller, Scene } from 'react-scrollmagic';

import cx from 'classnames';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { STEPS, WORDS } from './constants';

export const CultivoCulturaCambio: FC = () => {
  const [currentStep, setCurrentStep] = useState(STEPS[0]);
  const [currentProgress, setCurrentProgress] = useState(0);

  const onStepEnter = (data) => {
    setCurrentStep(data.data);
  };

  const onStepProgress = (data) => {
    setCurrentProgress(data.progress);
  };

  return (
    <section>
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="relative w-full" id="section-cultivo-cultura-cambio">
            <div className="sticky top-0">
              {/* BG */}
              <div className="absolute top-0 left-0 flex w-full h-screen filter bg-image">
                <img
                  className="object-cover w-screen h-auto"
                  src="images/cultivoCulturaCambio-bg1.jpg"
                  alt="background"
                  role="decoration"
                  // style={{ filter: `grayscale(${(currentStep.id - 1) / (STEPS.length - 1)})` }}
                  style={{ filter: `grayscale(${(currentStep.id - 1 + currentProgress) / 3})` }}
                />
              </div>
              <div
                className="absolute top-0 left-0 w-full h-screen"
                // style={{ background: 'rgba(0, 0, 0, 0.3)' }}
              >
                <div
                  className="relative w-full h-screen max-w-screen-lg"
                  style={{
                    left: 'calc((100vw - 1024px) / 2)',
                  }}
                >
                  {/* <div className="relative w-1/2 left-1/2"> */}
                  {STEPS.map((step, i) => (
                    <div
                      key={i}
                      className="absolute left-0 w-full max-w-screen-lg top-52"
                      // className="h-screen -translate-x-1/2 left-1/2"
                      style={{
                        // paddingLeft: 'calc((100vw - 1024px) / 2)',
                        // paddingRight: 'calc((100vw - 1024px) / 2)',
                        // marginTop: i === 0 ? '-50vh' : '',
                        paddingBottom: i === STEPS.length - 1 ? '50vh' : '',
                        // background: 'rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <div
                        className="relative flex w-1/2 text-lg left-1/2"
                        // className="flex items-center py-16 text-lg transform -translate-y-1/2 top-1/2"
                        style={{
                          position: 'relative',
                          top: -(currentProgress * 100),
                          opacity:
                            step.id === currentStep.id
                              ? currentProgress <= 0.5
                                ? currentProgress * 10
                                : (1 - currentProgress) * 10
                              : '0',
                          // transition: 'opacity 0.5s ease-out',
                          // width: '50vw',
                          height: '50vh',
                          // height: 'calc(50vh - 16rem)',
                          marginBottom: '5rem',
                        }}
                      >
                        <div className="absolute top-0 left-0">{step.content}</div>
                      </div>
                    </div>
                  ))}
                  {/* </div> */}
                </div>
              </div>
              <div className="w-full h-screen max-w-screen-lg mx-auto text-lg">
                {/* WORDS */}
                <div className="flex flex-col items-start gap-5" style={{ paddingTop: '10vh' }}>
                  {WORDS.map((word) => (
                    <div
                      key={`word-${word.id}`}
                      className={cx({
                        'relative px-1 py-3 bg-primary-red text-white font-serif text-7xl transition-opacity duration-500':
                          true,
                        'left-16': word.id === 1,
                        'opacity-50': true,
                        'opacity-100':
                          word.id + 1 < currentStep.id ||
                          (currentStep.id - 1 == word.id && currentProgress >= 0.5),
                      })}
                    >
                      {word.content}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Scrollama
              progress
              // debug
              onStepEnter={onStepEnter}
              onStepProgress={onStepProgress}
              offset={0.6}
            >
              {STEPS.map((step, i) => (
                <Step key={step.id} data={step}>
                  <div
                    className="w-full"
                    // className="h-screen -translate-x-1/2 left-1/2"
                    style={{
                      opacity: 0,
                      paddingLeft: 'calc((100vw - 1024px) / 2)',
                      paddingRight: 'calc((100vw - 1024px) / 2)',
                      marginTop: i === 0 ? '-50vh' : '',
                      paddingBottom: i === STEPS.length - 1 ? '50vh' : '',
                    }}
                  >
                    <div
                      className="relative flex w-1/2 text-lg left-1/2"
                      // className="flex items-center py-16 text-lg transform -translate-y-1/2 top-1/2"
                      style={{
                        position: 'relative',
                        // top: currentProgress * 100,
                        // opacity: step.id === currentStep.id ? currentProgress : '0',
                        // transition: 'opacity 0.5s ease-out',
                        // width: '50vw',
                        height: '150vh',
                        // height: 'calc(50vh - 16rem)',
                        marginBottom: '5rem',
                      }}
                    >
                      <div className="absolute top-0 left-0">{step.content}</div>
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
