import { configureStore } from "@reduxjs/toolkit" ;
import authReducer from "./index.js"
export const store = configureStore({
    reducer: authReducer
  });