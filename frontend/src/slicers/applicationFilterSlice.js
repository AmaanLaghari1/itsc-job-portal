// store/slices/applicationFilterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDeptId: '',
  selectedAnnouncementId: ''
};

const applicationFilterSlice = createSlice({
  name: 'applicationFilter',
  initialState,
  reducers: {
    setSelectedDeptId(state, action) {
      state.selectedDeptId = action.payload;
    },
    setSelectedAnnouncementId(state, action) {
      state.selectedAnnouncementId = action.payload;
    },
    clearFilters(state) {
      state.selectedDeptId = '';
      state.selectedAnnouncementId = '';
    }
  }
});

export const {
  setSelectedDeptId,
  setSelectedAnnouncementId,
  clearFilters
} = applicationFilterSlice.actions;

export default applicationFilterSlice.reducer;
