import { configureStore } from "@reduxjs/toolkit";
import userSlice from './features/user'

const store = configureStore({
    reducer: {
        user: userSlice
    }
})

export type rootState = ReturnType<typeof store.getState>
export default store