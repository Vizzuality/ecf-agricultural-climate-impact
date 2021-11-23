import { useContext } from "react";

import { AppContext } from 'utils/app-context';

export const useAppContext = () => useContext(AppContext);
