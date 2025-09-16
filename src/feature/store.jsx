import {configureStore} from "@reduxjs/toolkit";
import ThemeSlice from "./redux/ThemeSlice.jsx";



export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})