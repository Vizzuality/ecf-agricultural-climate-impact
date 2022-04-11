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
                  style={{ filter: `grayscale(${(currentStep.id - 1 + currentProgress) / 3})` }}
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-screen">
                <div
                  className="relative w-full h-screen max-w-screen-lg"
                  style={{
                    left: 'calc((100vw - 1024px) / 2)',
                  }}
                >
                  {STEPS.map((step, i) => (
                    <div
                      key={i}
                      className="absolute left-0 w-full max-w-screen-lg top-52"
                      style={{
                        paddingBottom: i === STEPS.length - 1 ? '50vh' : '',
                      }}
                    >
                      <div
                        className="relative flex w-1/2 text-lg left-1/2"
                        style={{
                          position: 'relative',
                          top: -(currentProgress * 100),
                          opacity:
                            step.id === currentStep.id
                              ? currentProgress <= 0.5
                                ? currentProgress * 10
                                : (1 - currentProgress) * 10
                              : '0',
                          height: '50vh',
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
              onStepEnter={onStepEnter}
              onStepProgress={onStepProgress}
              offset={0.6}
            >
              {STEPS.map((step, i) => (
                <Step key={step.id} data={step}>
                  <div
                    className="w-full"
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
                      style={{
                        position: 'relative',
                        height: '150vh',
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
          <div className="relative w-full" id="section-cultivo-cultura-cambio">
            <div className="sticky top-0 overflow-hidden">
              {/* BG */}
              <div className="absolute top-0 left-0 flex w-full h-screen filter bg-image top-52">
                <img
                  className="object-cover w-screen h-auto"
                  src="images/cultivoCulturaCambio-bg1.jpg"
                  alt="background"
                  role="decoration"
                  style={{ filter: `grayscale(${(currentStep.id - 1 + currentProgress) / 3})` }}
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-screen">
                <div
                  className="relative w-full h-screen max-w-screen-lg"
                  style={
                    {
                      // left: 'calc((100vw - 1024px) / 2)',
                    }
                  }
                >
                  {STEPS.map((step, i) => (
                    <div
                      key={i}
                      className="absolute left-0 w-full px-4"
                      style={{
                        top: '40%',
                        // paddingBottom: i === STEPS.length - 1 ? '50vh' : '',
                      }}
                    >
                      <div
                        className="relative flex text-lg"
                        style={{
                          position: 'relative',
                          top: -(currentProgress * 10),
                          opacity:
                            step.id === currentStep.id
                              ? currentProgress <= 0.5
                                ? currentProgress * 10
                                : (1 - currentProgress) * 10
                              : '0',
                          height: '50vh',
                          marginBottom: '5rem',
                        }}
                      >
                        <div className="absolute top-0 left-0">{step.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-screen max-w-screen-lg mx-auto text-lg">
                {/* WORDS */}
                <div className="flex flex-col items-start gap-1" style={{ paddingTop: '10vh' }}>
                  {WORDS.map((word) => (
                    <div
                      key={`word-${word.id}`}
                      className={cx({
                        'relative px-1 py-2 bg-primary-red text-white font-serif text-3xl transition-opacity duration-500':
                          true,
                        'left-4': word.id === 0,
                        'left-1/2 transform -translate-x-1/2': word.id === 1,
                        'left-full transform -translate-x-full -ml-4': word.id === 2,
                        'opacity-50': true,
                        'opacity-100':
                          word.id + 1 < currentStep.id ||
                          (currentStep.id - 1 == word.id && currentProgress >= 0.1),
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
              onStepEnter={onStepEnter}
              onStepProgress={onStepProgress}
              offset={1}
            >
              {STEPS.map((step, i) => (
                <Step key={step.id} data={step}>
                  <div
                    className="w-full"
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
                      style={{
                        position: 'relative',
                        height: '150vh',
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
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default CultivoCulturaCambio;
