import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpen: false, content: '' },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
