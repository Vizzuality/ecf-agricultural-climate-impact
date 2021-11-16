import { FC } from 'react';
import { HeadlineProps } from './types';

export const Headline: FC<HeadlineProps> = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-dark-green text-yellow px-20% text-center">
      <img src="images/logo-coag.png" />
      <h1 className="mt-12 font-serif text-6xl">
        Impactos del cambio climático en la agricultura española
      </h1>
      <p className="mt-6 font-sans px-20% text-xl" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar consequat pulvinar nulla tempus vel pretium id ullamcorper lectus.</p>
      <button className="px-6 py-4 font-sans text-xl rounded bg-dark-orange mt-14">Descubrir</button>
    </section>
  );
};

export default Headline;
