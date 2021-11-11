import { FC } from 'react';
import { HeadlineProps } from './types';

export const Section: FC<HeadlineProps> = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-green-800">
      <h1 className="text-5xl text-white">Cambio climático, riesgo agrícola.</h1>
    </section>
  );
};

export default Section;
