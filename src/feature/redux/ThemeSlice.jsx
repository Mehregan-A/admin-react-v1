import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    theme:false
}
const ThemeSlice=createSlice({
    name: "theme",
    initialState,
    reducers: {
        set_theme: (state, action) => {
            state.theme = action.payload
        }
    }
})
export const {set_theme}=ThemeSlice.actions;
export default ThemeSlice.reducer;