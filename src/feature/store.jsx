import {configureStore} from "@reduxjs/toolkit";
import ThemeSlice from "./redux/ThemeSlice.jsx";
import LoginSlice from "./redux/LoginSlice.jsx";
import CategorySlice from "./redux/CategorySlice.jsx";
import AttributeSlice from "./redux/AttributeSlice.jsx";
import AdminSlice from "./redux/AdminSlice.jsx";
import UserSlice from "./redux/UserSlice.jsx";
import ProfileSlice from "./redux/ProfileSlice.jsx";
import categorySubSlice from "./redux/CategorySubSlice.jsx";



export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
        login: LoginSlice,
        category:CategorySlice,
        attribute:AttributeSlice,
        admin:AdminSlice,
        user:UserSlice,
        profile:ProfileSlice,
        subCategory:categorySubSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})