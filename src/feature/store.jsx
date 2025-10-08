import {configureStore} from "@reduxjs/toolkit";
import ThemeSlice from "./redux/ThemeSlice.jsx";
import LoginSlice from "./redux/LoginSlice.jsx";
import CategorySlice from "./redux/CategorySlice.jsx";
import AttributeSlice from "./redux/AttributeSlice.jsx";
import AdminSlice from "./redux/AdminSlice.jsx";



export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
        login: LoginSlice,
        category:CategorySlice,
        attribute:AttributeSlice,
        admin:AdminSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})