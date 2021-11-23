import { FC } from 'react';
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// types
import { HeadlineProps } from './types';

export const Headline: FC<HeadlineProps> = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-dark-green text-yellow px-5 md:px-20% text-center">
      <MediaContextProvider>
        <img src="images/logo-coag.png" />
        <Desktop includeBiggerScreens>
          <h1 className="mt-12 font-serif text-6xl">
            Impactos del cambio climático en la agricultura española
          </h1>
        </Desktop>
        <Mobile>
          <h3 className="mt-3 font-serif text-4xl">
            Impactos del cambio climático en la agricultura española
          </h3>
        </Mobile>
        <p className="mt-6 font-sans px-20% text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar consequat pulvinar nulla
          tempus vel pretium id ullamcorper lectus.
        </p>
        <button className="px-6 py-4 font-sans text-xl rounded bg-dark-orange mt-14">
          Descubrir
        </button>
      </MediaContextProvider>
    </section>
  );
};

export default Headline;
