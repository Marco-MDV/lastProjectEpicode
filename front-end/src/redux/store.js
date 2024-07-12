import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../redux/setThemeSlice";
import setLoaderSlice from "../redux/setLoaderSlice";
import setErrorSlice from "../redux/setErrorSlice";
import setBoleanStateModal from "./setBoleanStateModal";
import setPostId from "./setPostId";
import seeModalChange from "./setModalChangeAction";

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        loader: setLoaderSlice,
        error: setErrorSlice,
        see: setBoleanStateModal,
        postId: setPostId,
        seeModalChange: seeModalChange
    }
})
