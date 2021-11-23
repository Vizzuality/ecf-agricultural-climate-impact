import React, { useState } from 'react';
import { AppContextType, SectionIDs } from 'types';

const defaultState = {
  currentSection: SectionIDs.DesafioGlobal,
};
const AppContext = React.createContext<AppContextType>(defaultState);


const AppContextProvider = ({ children }) => {
  const [currentSection, setCurrentSectionSt] = useState(defaultState.currentSection);
  const setCurrentSection = (section: SectionIDs) => setCurrentSectionSt(section);
  return <AppContext.Provider value={{
    currentSection,
    setCurrentSection,
  }}>
    {children}
    </AppContext.Provider>;
};

export { AppContext, AppContextProvider };
