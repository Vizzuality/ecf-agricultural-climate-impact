/* eslint-disable @next/next/no-img-element */
import { FC, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Headroom from 'react-headroom';

import Button from 'components/button';
import Icon from 'components/icon';

// utils
import { MediaContextProvider, Desktop, Mobile } from 'utils/responsive';

// hooks
import { useAppContext } from 'hooks/use-app-context';

// local types
// import { MenuProps } from './types';
import { SECTIONS } from './constants';
import MENU_SVG from 'svgs/ui/menu.svg?sprite';
import MENU_CLOSE_SVG from 'svgs/ui/menu-close.svg?sprite';

export const Menu: FC = () => {
  const { currentSection, setCurrentSection } = useAppContext();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  // const variants = {
  //   open: { left: 0 },
  //   closed: { left: '-345px' },
  // };

  // const currentSectionLabel = useMemo(
  //   () => SECTIONS.find((s) => s.id === currentSection).label,
  //   [currentSection],
  // );
  const handleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <div>
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <Headroom>
            <div className="flex justify-between w-full max-w-screen-xl mx-auto">
              <div className="flex items-center">
                <a href="#section-hero">
                  <img className="w-24" src="images/logo-coag.png" alt="COAG" />
                </a>
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
          </Headroom>
        </Desktop>
        <Mobile>
          <Headroom>
            <div className="flex justify-between w-full p-2 mx-auto overflow-hidden bg-white backdrop-blur-sm backdrop-filter bg-opacity-90 max-w-screen">
              <div className="relative flex items-center top-2">
                <a href="#section-hero">
                  <img className="w-24" src="images/logo-coag.png" alt="COAG" />
                </a>
              </div>
              <div className="flex items-center">
                <Button theme="none" size="sm" onClick={() => handleSideMenu()}>
                  <Icon icon={sideMenuOpen ? MENU_CLOSE_SVG : MENU_SVG}></Icon>
                </Button>
              </div>
              <div
                className={cx({
                  'absolute top-full transition-all px-4 w-full bg-white backdrop-blur-sm backdrop-filter bg-opacity-90 items-center h-screen font-sans font-normal':
                    true,
                  'left-0': sideMenuOpen,
                  'left-full': !sideMenuOpen,
                })}
                onClick={() => setSideMenuOpen(false)}
              >
                <ul className="flex flex-col gap-6 pt-4">
                  {SECTIONS.map((section) => (
                    <li key={`menu-item-${section.id}`}>
                      <Link href={section.url}>
                        <a className="opacity-100">{section.label}</a>
                      </Link>
                      {section?.subsections?.length && (
                        <ul className="flex flex-col gap-6 px-6 pt-4">
                          {section.subsections.map((subSection) => (
                            <li key={`menu-item-${subSection.id}`}>
                              <Link href={subSection.url}>
                                <a className="opacity-100">{subSection.label}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Headroom>
        </Mobile>
      </MediaContextProvider>
    </div>
  );
};

export default Menu;
