import { FC, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { STEPS } from './constants';

export const Narrative: FC = () => {
  const [currentStep, setCurrentStep] = useState(STEPS[0]);

  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };

  return (
    <section className="relative">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="sticky top-0 flex items-center justify-center h-screen">
            {`The current step index is: ${currentStep?.id}`}
            <img src={`images/map-template-${currentStep?.id}.png`} />
          </div>
          <Scrollama onStepEnter={onStepEnter} offset={0.9}>
            {STEPS.map((step) => (
              <Step data={step} key={`desafio-step-${step.id}`}>
                <div
                  className="relative z-20 p-5 border rounded border-dark-green"
                  style={{ marginTop: '100vh', marginRight: '10vw', marginLeft: '10vw' }}
                >
                  {step.content}
                </div>
              </Step>
            ))}
          </Scrollama>
        </Desktop>
        <Mobile>
          <div>Mobile</div>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default Narrative;
