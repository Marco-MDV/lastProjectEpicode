import { createSlice } from "@reduxjs/toolkit";

export const setLoaderSlice = createSlice({
    name: "loader",
    initialState: { value: true },
    reducers: {
        toggleLoader: state => {
            state.value = !state.value;
        },
        setLoaderTrue: state => {
            state.value = true;
        },
        setLoaderFalse: state => {
            state.value = false;
        }
    }
})
export const { toggleLoader, setLoaderTrue, setLoaderFalse } = setLoaderSlice.actions;
export default setLoaderSlice.reducer;
