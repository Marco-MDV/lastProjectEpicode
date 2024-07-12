import { createSlice } from "@reduxjs/toolkit";
export const setBoleanStateModal = createSlice({
    name: "see",
    initialState: { value: false },
    reducers: {
        toggleModal: state => {
            state.value =!state.value;
        }
    }
})

export const { toggleModal } = setBoleanStateModal.actions;
export default setBoleanStateModal.reducer;