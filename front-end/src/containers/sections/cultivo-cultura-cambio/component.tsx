import { FC, useState } from 'react';
// import { Scrollama, Step } from 'react-scrollama';

import cx from 'classnames';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { STEPS, WORDS } from './constants';
import { workerData } from 'worker_threads';

// components
import Hero from '../hero';

export const CultivoCulturaCambio: FC = () => {
  const [currentStep, setCurrentStep] = useState(STEPS[0]);
  const [currentOpacity, setCurrentOpacity] = useState(0);

  const onStepEnter = (data) => {
    setCurrentStep(data.data);
    console.log('enter', data.data);
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
          <div className="flex w-screen max-w-screen-lg mx-auto">
            <div className="top-0 flex items-center flex-1 text-lg" style={{ top: '-10%' }}>
              <div className="fixed top-0 left-0 flex w-screen h-screen">
                <img
                  className="object-cover w-screen h-auto"
                  src="images/section1-bg1.jpg"
                  alt="background"
                  role="decoration"
                />
              </div>
              <div className="flex flex-col items-start">
                {WORDS.map((word) => (
                  <div
                    key={`word-${word.id}`}
                    className={cx({
                      'relative px-1 bg-primary-red text-white font-serif text-7xl transition-opacity duration-500':
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
            <div
              className="relative flex flex-col flex-1 gap-64"
              style={{ marginTop: '25vh', marginBottom: '25vh' }}
            >
              {STEPS.map((step, i) => (
                <div
                  key={`step=${i}`}
                  className="sticky flex items-center py-16 text-lg top-1/2"
                  style={{
                    // opacity: step.id === currentStep.id ? currentOpacity : '0',
                    height: '50vh',
                  }}
                >
                  {step.content}
                </div>
              ))}
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

export default CultivoCulturaCambio;
