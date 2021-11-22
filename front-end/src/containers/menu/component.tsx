/* eslint-disable @next/next/no-img-element */
import { FC, useState, useContext } from 'react';
import { motion } from 'framer-motion';

// components
import Icon from 'components/icon';

// svgs
import HAMBURGUER_SVG from 'svgs/ui/hamburguer.svg?sprite';

// utils
import { MediaContextProvider, Desktop, Mobile } from 'utils/responsive';
import { AppContext } from 'utils/app-context';

// types
import { SectionIDs } from 'types';

// local types
import { MenuProps } from './types';

export const Menu: FC<MenuProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useContext(AppContext);
  const { currentSection } = state;
  const variants = {
    open: { width: '450px' },
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
            <button className="absolute top-4 left-4" onClick={() => setOpen(!open)}>
              <img src="/images/hamburguer.svg" alt="menu" />
            </button>
            {open && <div></div>}
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
