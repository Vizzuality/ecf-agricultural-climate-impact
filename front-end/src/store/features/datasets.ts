import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: string[] = [];

export const datasetsSlice = createSlice({
  name: 'datasets',
  initialState,
  reducers: {
    setActiveDatasets: (state, action: PayloadAction<string[]>) => action.payload,
  },
});

export const { setActiveDatasets } = datasetsSlice.actions;

export default datasetsSlice.reducer;
