/* eslint-disable @next/next/no-img-element */
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';

// utils
import { MediaContextProvider, Desktop, Mobile } from 'utils/responsive';
import { AppContext } from 'utils/app-context';

// types
import { SectionIDs } from 'types';

// hooks
import { useAppContext } from 'hooks/use-app-context';

// local types
import { MenuProps } from './types';
import { SECTIONS } from './constants';

export const Menu: FC<MenuProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { currentSection, setCurrentSection } = useAppContext();
  const variants = {
    open: { width: '44%' },
    closed: { width: '56px' },
  };

  return (
    <div>
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <motion.nav
            className="fixed top-0 left-0 flex flex-col items-end h-screen text-yellow bg-dark-orange"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            transition={{ duration: 1 }}
          >
            <button
              className={cx({
                'absolute top-4': true,
                'left-4': !open,
                'right-4': open,
              })}
              onClick={() => setOpen(!open)}
            >
              <img src="/images/hamburguer.svg" alt="menu" />
            </button>
            {open && (
              <div className="flex flex-col pt-4 w-full pl-10% font-serif font-normal">
                <span style={{ fontSize: '10px' }}>
                  Impactos del cambio climático en la agricultura española
                </span>
                <div className="mt-24">
                  {SECTIONS.map((section) => (
                    <div className="mb-5" key={`menu-item-${section.id}`}>
                      <span
                        className={cx({
                          'opacity-100': currentSection === section.id,
                          'text-2xl': true,
                          'opacity-60': currentSection !== section.id,
                        })}
                      >
                        {section.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!open && (
              <div className="flex items-center justify-center h-full">
                <div
                  className="absolute flex justify-center font-serif text-base transform -rotate-90"
                  style={{ width: '232px', right: '-88px' }}
                >
                  {currentSection}
                </div>
              </div>
            )}
          </motion.nav>
        </Desktop>
        <Mobile>
          <div></div>
        </Mobile>
      </MediaContextProvider>
    </div>
  );
};

export default Menu;
