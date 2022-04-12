/* eslint-disable @next/next/no-img-element */
import { FC, useState } from 'react';
import cx from 'classnames';
// import Link from 'next/link';
import { Link } from 'react-scroll';
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
    <div className="bg-white">
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
                      <Link
                        href={`#${section.url}`}
                        smooth={true}
                        duration={1000}
                        offset={50}
                        to={section.url}
                      >
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
            <div className="flex justify-between w-full max-w-full p-2 mx-auto overflow-x-hidden bg-white backdrop-blur-sm backdrop-filter bg-opacity-90">
              <div className="relative flex items-center top-2">
                <a href="#section-hero">
                  <img className="w-24" src="images/logo-coag.png" alt="COAG" />
                </a>
              </div>
              <div className="flex items-center">
                <Button theme="none" size="s" onClick={() => handleSideMenu()}>
                  <Icon icon={sideMenuOpen ? MENU_CLOSE_SVG : MENU_SVG}></Icon>
                </Button>
              </div>
            </div>
          </Headroom>
          <div
            className={cx({
              'fixed top-0 transition-all px-2 w-full bg-white backdrop-blur-sm backdrop-filter bg-opacity-90 items-center h-screen font-sans font-normal':
                true,
              'left-0': sideMenuOpen,
              'left-full': !sideMenuOpen,
            })}
            onClick={() => setSideMenuOpen(false)}
            style={{ zIndex: 999 }}
          >
            <div className="flex justify-between w-full max-w-full py-2 mx-auto overflow-x-hidden bg-white backdrop-blur-sm backdrop-filter bg-opacity-90">
              <div className="relative flex items-center top-2">
                <a href="#section-hero">
                  <img className="w-24" src="images/logo-coag.png" alt="COAG" />
                </a>
              </div>
              <div className="flex items-center">
                <Button theme="none" size="s" onClick={() => handleSideMenu()}>
                  <Icon icon={sideMenuOpen ? MENU_CLOSE_SVG : MENU_SVG}></Icon>
                </Button>
              </div>
            </div>
            <ul className="flex flex-col gap-6 px-2 pt-4">
              {SECTIONS.map((section) => (
                <li key={`menu-item-${section.id}`}>
                  <Link
                    href={`#${section.url}`}
                    smooth={true}
                    duration={1000}
                    offset={50}
                    to={section.url}
                  >
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
        </Mobile>
      </MediaContextProvider>
    </div>
  );
};

export default Menu;
