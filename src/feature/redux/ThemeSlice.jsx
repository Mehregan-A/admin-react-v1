import { createSlice } from '@reduxjs/toolkit';

const initialTheme = localStorage.getItem("theme") === "dark";

const initialState = {
    theme: initialTheme
};

const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        set_theme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("theme", action.payload ? "dark" : "light");
        }
    }
});

export const { set_theme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
