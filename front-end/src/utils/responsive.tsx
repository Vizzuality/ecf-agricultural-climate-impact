/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import { createMedia } from '@artsy/fresnel';

const breakpoints = {
  xs: 0,
  sm: 768,
  md: 1000,
  lg: 1200,
};

const { MediaContextProvider, Media } = createMedia({ breakpoints });

interface ResponsiveProps {
  className?: string;
  children: ReactNode;
  includeBiggerScreens?: boolean;
}

const Mobile: React.FC<ResponsiveProps> = ({ className, children }: ResponsiveProps) => (
  <Media lessThan="sm" {...(!!className && { className })}>
    {children}
  </Media>
);

const Desktop: React.FC<ResponsiveProps> = ({
  children,
  className,
  includeBiggerScreens = true,
}: ResponsiveProps) => (
  <Media
    {...(includeBiggerScreens && { greaterThanOrEqual: 'sm' })}
    {...(!includeBiggerScreens && { at: 'sm' })}
    {...(!!className && { className })}
  >
    {children}
  </Media>
);

const DesktopLarge: React.FC<ResponsiveProps> = ({
  children,
  className,
  includeBiggerScreens = true,
}: ResponsiveProps) => (
  <Media
    {...(includeBiggerScreens && { greaterThanOrEqual: 'lg' })}
    {...(!includeBiggerScreens && { at: 'lg' })}
    {...(!!className && { className })}
  >
    {children}
  </Media>
);

export { breakpoints, Desktop, DesktopLarge, Mobile, MediaContextProvider };
