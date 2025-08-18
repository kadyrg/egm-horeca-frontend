import { configureStore } from "@reduxjs/toolkit";
import editCategoryWindowReducer from './edit-category-window-slice'
import addCategoryWindowReducer from './add-category-window-slice'

export const adminStore = configureStore({
  reducer: {
    editCategoryWindowState: editCategoryWindowReducer,
    addCategoryWindowState: addCategoryWindowReducer,
  },
});

export type AdminState = ReturnType<typeof adminStore.getState>;
export type AppDispatch = typeof adminStore.dispatch;
