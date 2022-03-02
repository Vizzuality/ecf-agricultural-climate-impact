/* eslint-disable @next/next/no-img-element */
import { FC, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';
import Link from 'next/link';

// utils
import { MediaContextProvider, Desktop, Mobile } from 'utils/responsive';

// types
import { SectionIDs } from 'types';

// hooks
import { useAppContext } from 'hooks/use-app-context';

// local types
// import { MenuProps } from './types';
import { SECTIONS } from './constants';

export const Menu: FC = () => {
  // const [open, setOpen] = useState<boolean>(false);
  const { currentSection, setCurrentSection, currentSubsection, setCurrentSubsection } =
    useAppContext();
  // const variants = {
  //   open: { left: 0 },
  //   closed: { left: '-345px' },
  // };

  // const currentSectionLabel = useMemo(
  //   () => SECTIONS.find((s) => s.id === currentSection).label,
  //   [currentSection],
  // );

  return (
    <div>
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <motion.nav
            className="fixed top-0 left-0 z-30 flex w-full h-16 text-black bg-white"
            // transition={{ duration: 1 }}
          >
            <div className="relative flex justify-between w-full max-w-screen-xl mx-auto">
              <div className="flex items-center">
                <img className="w-24" src="images/logo-coag.png" alt="COAG" />
              </div>
              <div className="relative flex items-center h-16 font-sans font-normal flex-end">
                <ul className="flex gap-6">
                  {SECTIONS.map((section) => (
                    <li key={`menu-item-${section.id}`}>
                      <Link href={section.url}>
                        <a
                          className={cx({
                            'opacity-100': currentSection === section.id,
                            'opacity-60': currentSection !== section.id,
                          })}
                          onClick={() => {
                            // setOpen(false);
                            setCurrentSection(section.id);
                            setCurrentSubsection(null);
                          }}
                        >
                          {section.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
