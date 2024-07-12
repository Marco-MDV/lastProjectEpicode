import { createSlice } from "@reduxjs/toolkit";
export const setModalChangeAction = createSlice({
    name: "seeModalChange",
    initialState: { value: false },
    reducers: {
        toggleModal: state => {
            state.value =!state.value;
        }
    }
})

export const { toggleModal } = setModalChangeAction.actions;
export default setModalChangeAction.reducer;