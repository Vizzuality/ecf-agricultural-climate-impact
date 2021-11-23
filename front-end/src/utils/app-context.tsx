import React, { useState } from 'react';
import { AppContextType, SectionIDs } from 'types';

const AppContext = React.createContext([{}, () => {}]);

const AppContextProvider = (props) => {
  const [state, setState] = useState<AppContextType>({
    currentSection: SectionIDs.DesafioGlobal,
  });
  return <AppContext.Provider value={[state, setState]}>{props.children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
