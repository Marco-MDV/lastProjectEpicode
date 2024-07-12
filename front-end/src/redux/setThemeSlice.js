import { createSlice } from "@reduxjs/toolkit"
export const themeSlice = createSlice({
    name: "theme",
    initialState: { value: false },
    reducers: {
        toggleDarkMode: state => {
            state.value = !state.value;
        }
    }
})
export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
