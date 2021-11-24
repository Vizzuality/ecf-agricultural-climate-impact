import { FC } from 'react';
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// types
// import { HeadlineProps } from './types';

export const EfectosSobreCultivosHeadline: FC = () => {
  return (
    <section className="relative flex h-screen px-5 md:pt-32 md:px-20 bg-light-orange text-yellow">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="absolute font-serif text-sm top-6">
            Impactos del cambio climático en la agricultura española
          </div>
          <h1 className="font-serif text-headline" style={{ lineHeight: '188px' }}>
            Efectos sobre cultivos
          </h1>
        </Desktop>
        <Mobile>
          <h3 className="font-serif text-6xl" style={{ lineHeight: '61px' }}>
            Efectos sobre cultivos
          </h3>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default EfectosSobreCultivosHeadline;
