import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
     userDetails:userSlice
    }
  });
  
  export default store;