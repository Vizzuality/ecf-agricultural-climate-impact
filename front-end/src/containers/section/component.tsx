import { FC } from 'react';
import { SectionProps } from './types';

export const Section: FC<SectionProps> = ({ id, children }: SectionProps) => {
  return <section id={id}>{children}</section>;
};

export default Section;
