import { createSlice } from "@reduxjs/toolkit";
export const setErrorSlice = createSlice({
    name: "error",
    initialState: { value: false },
    reducers: {
        toggleError: state => {
            state.value =!state.value;
        },
        setErrorTrue: state => {
            state.value = true;
        },
        setErrorFalse: state => {
            state.value = false;
        }
    }
})

export const { toggleError, setErrorTrue, setErrorFalse } = setErrorSlice.actions;
export default setErrorSlice.reducer;