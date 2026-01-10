import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";
import toastReducer from "./toastSlice";


export const store=configureStore({
    reducer:{
        counter:counterReducer,
        toast:toastReducer,

    }
});