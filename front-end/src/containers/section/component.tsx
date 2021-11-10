import { FC } from 'react';
import { SectionProps } from './types';

export const Section: FC<SectionProps> = ({ id, title, children }: SectionProps) => {
  return (
    <section id={id} className="h-screen p-8">
      <article>
        <h1>{title}</h1>
        {children}
      </article>
    </section>
  );
};

export default Section;
