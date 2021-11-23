import React, { useState } from 'react';
import { AppContextType, SectionIDs, SubsectionIDs } from 'types';

const defaultState = {
  currentSection: SectionIDs.DesafioGlobal,
  currentSubsection: null,
};
const AppContext = React.createContext<AppContextType>(defaultState);


const AppContextProvider = ({ children }) => {
  const [currentSection, setCurrentSectionSt] = useState(defaultState.currentSection);
  const [currentSubsection, setCurrentSubsectionSt] = useState(defaultState.currentSubsection);
  const setCurrentSection = (section: SectionIDs) => setCurrentSectionSt(section);
  const setCurrentSubsection = (subsection: SubsectionIDs) => setCurrentSubsectionSt(subsection);

  return <AppContext.Provider value={{
    currentSection,
    setCurrentSection,
    currentSubsection,
    setCurrentSubsection,
  }}>
    {children}
    </AppContext.Provider>;
};

export { AppContext, AppContextProvider };
