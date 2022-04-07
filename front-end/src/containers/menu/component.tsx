/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Headroom from 'react-headroom';

// utils
import { MediaContextProvider, Desktop, Mobile } from 'utils/responsive';

// hooks
import { useAppContext } from 'hooks/use-app-context';

// local types
// import { MenuProps } from './types';
import { SECTIONS } from './constants';

export const Menu: FC = () => {
  const { currentSection, setCurrentSection } = useAppContext();
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
            <div className="flex justify-between w-full px-2 mx-auto">
              <div className="flex items-center">
                <a href="#section-hero">
                  <img className="w-24" src="images/logo-coag.png" alt="COAG" />
                </a>
              </div>
              <div className="relative flex items-center h-16 font-sans font-normal flex-end">
                {/* <ul className="flex gap-6">
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
                </ul> */}
              </div>
            </div>
          </Headroom>
        </Mobile>
      </MediaContextProvider>
    </div>
  );
};

export default Menu;
