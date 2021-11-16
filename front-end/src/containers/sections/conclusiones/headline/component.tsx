import { FC } from 'react';
import { HeadlineProps } from './types';

export const ConclusionesHeadline: FC<HeadlineProps> = () => {
  return (
    <section className="flex h-screen px-20 pt-32 bg-light-green text-yellow">
      <h1 className="font-serif text-headline" style={{ lineHeight: '188px' }}>
        Conclusiones
      </h1>
    </section>
  );
};

export default ConclusionesHeadline;
