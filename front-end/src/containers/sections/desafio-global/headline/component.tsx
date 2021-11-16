import { FC } from 'react';
import { HeadlineProps } from './types';

export const Headline: FC<HeadlineProps> = () => {
  return (
    <section className="flex h-screen px-20 pt-32 bg-dark-orange text-yellow">
      <h1 className="font-serif text-headline" style={{ lineHeight: '188px' }}>
        Un desafío Global
      </h1>
    </section>
  );
};

export default Headline;
