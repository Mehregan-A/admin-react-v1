import {configureStore} from "@reduxjs/toolkit";
import ThemeSlice from "./redux/ThemeSlice.jsx";
import LoginSlice from "./redux/LoginSlice.jsx";



export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
        login: LoginSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})