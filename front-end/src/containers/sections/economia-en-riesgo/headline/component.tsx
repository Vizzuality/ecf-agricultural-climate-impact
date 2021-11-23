import { FC } from 'react';
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// types
import { HeadlineProps } from './types';

export const Headline: FC<HeadlineProps> = () => {
  return (
    <section className="flex h-screen px-5 md:pt-32 md:px-20 bg-dark-orange text-yellow">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <h1 className="font-serif text-headline" style={{ lineHeight: '188px' }}>
            Una economía en riesgo
          </h1>
        </Desktop>
        <Mobile>
          <h3 className="font-serif text-6xl" style={{ lineHeight: '61px' }}>
            Una economía en riesgo
          </h3>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default Headline;