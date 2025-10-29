import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slice/postSlice";
import userReducer from "../slice/userSlice";  
import authReducer from "../slice/authSlice"; 
import profileReducer from "../slice/profileSlice";


import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,   
    user: userReducer,
    profile: profileReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
