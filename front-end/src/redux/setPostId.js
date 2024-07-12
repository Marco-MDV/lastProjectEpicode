import { createSlice } from "@reduxjs/toolkit"
export const postIdSlice = createSlice({
    name: "postId",
    initialState: { value: '' },
    reducers: {
        togglePostId: (state, action) => {
            state.value = action.payload;
        }
    }
})
export const { togglePostId } = postIdSlice.actions;
export default postIdSlice.reducer;