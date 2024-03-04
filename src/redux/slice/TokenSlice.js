import { createSlice } from '@reduxjs/toolkit'


export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: null,
        userInfo: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
    },
})

export const { setToken, setUserInfo } = tokenSlice.actions
export default tokenSlice.reducer