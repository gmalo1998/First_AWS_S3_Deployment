import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  queue: [], // Array of {id, message, status, timeout, dismissAt}
  position: "top-right" // top-right, bottom-right, etc.
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      const { message, status = "info", duration = 5000, id } = action.payload;
      const toastId = id || nanoid();
      
      // Remove existing toast with same ID
      state.queue = state.queue.filter(toast => toast.id !== toastId);
      
      // Add to queue
      state.queue.unshift({
        id: toastId,
        message,
        status,
        dismissAt: Date.now() + duration,
        duration
      });
      
      // Keep only top 5
      if (state.queue.length > 5) {
        state.queue = state.queue.slice(0, 5);
      }
    },
    hideToast: (state, action) => {
      const toastId = action.payload;
      state.queue = state.queue.filter(toast => toast.id !== toastId);
    },
    removeOldestToast: (state) => {
      state.queue.pop();
    },
    clearAllToasts: (state) => {
      state.queue = [];
    }
  }
});

export const { showToast, hideToast, clearAllToasts } = toastSlice.actions;
export default toastSlice.reducer;
