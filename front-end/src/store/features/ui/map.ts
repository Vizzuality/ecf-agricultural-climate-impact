import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MapState {
  basemap: string;
  labels: string;
  boundaries: boolean;
}

// Define the initial state using that type
const initialState: MapState = {
  basemap: 'dark',
  labels: 'none',
  boundaries: false,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setBasemap: (state, action: PayloadAction<string>) => ({
      ...state,
      basemap: action.payload,
    }),
    setLabels: (state, action: PayloadAction<string>) => ({
      ...state,
      labels: action.payload,
    }),
    setBoundaries: (state, action: PayloadAction<boolean>) => ({
      ...state,
      boundaries: action.payload,
    }),
  },
});

export const { setBasemap, setLabels, setBoundaries } = mapSlice.actions;

export default mapSlice.reducer;
