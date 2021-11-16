import { FC } from 'react';
import { HeadlineProps } from './types';

export const Headline: FC<HeadlineProps> = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-dark-green text-yellow px-20% text-center">
      <h1 className="font-serif text-6xl">
        Impactos del cambio climático en la agricultura española
      </h1>
    </section>
  );
};

export default Headline;
