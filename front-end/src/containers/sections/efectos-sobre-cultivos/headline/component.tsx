import { FC } from 'react';
import { HeadlineProps } from './types';

export const EfectosSobreCultivosHeadline: FC<HeadlineProps> = () => {
  return (
    <section className="flex h-screen px-20 pt-32 bg-light-orange text-yellow">
      <h1 className="font-serif text-headline" style={{ lineHeight: '188px' }}>
        Efectos sobre cultivos{' '}
      </h1>
    </section>
  );
};

export default EfectosSobreCultivosHeadline;
