import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayerParams {
  opacity?: number;
  visibility?: boolean;
}

export interface LayerPayload {
  id: string;
  params: LayerParams;
}

// Define a type for the slice state
export interface LayerState {
  [key: string]: LayerPayload;
}

// Define the initial state using that type
const initialState = {};

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    setLayerParams: (state, action: PayloadAction<LayerPayload>) => ({
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        ...action.payload.params,
      },
    }),
  },
});

export const { setLayerParams } = layersSlice.actions;

export default layersSlice.reducer;
