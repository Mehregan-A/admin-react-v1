import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const postAsyncLogin = createAsyncThunk("login/postAsyncLogin",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/login",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const getAsyncLogout = createAsyncThunk("login/getAsyncLogout",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get("/admin/logout",{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncCheck = createAsyncThunk("login/getAsyncCheck",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get("/admin/check-login",{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncLoginIndex = createAsyncThunk("login/getAsyncLoginIndex",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get("/index/login",{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

const initialState = {
    login_index:[],
    isLoading_enter:false,
    isAuthenticated: null,
    profile:false,
    logout:false,
    login : false,
    result : [],
    isLoading: false,
    isError: false,
    checkLogin:false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers : {
        loginClearResult : (state) => {
            state.login = false
            state.logout = false
            state.checkLogin = false
        },
    },
    extraReducers : (builder)=> {
        builder.addCase(postAsyncLogin.fulfilled, (state, action) => {
            state.login = action.payload
            state.isLoading_enter = false
            state.isError = false
        })
        builder.addCase(postAsyncLogin.pending, (state) => {
            state.login = false
            state.isLoading_enter = true
            state.isError = false
        })
        builder.addCase(postAsyncLogin.rejected, (state, action) => {
            state.login = action.payload
            state.isLoading_enter = false
            state.isError = true
        })

        builder.addCase(getAsyncLogout.fulfilled, (state, action) => {
            state.logout = action.payload
            state.isLoading = false
            state.isError = false
        })
        builder.addCase(getAsyncLogout.pending, (state) => {
            state.logout = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncLogout.rejected, (state, action) => {
            state.logout = action.payload
            state.isLoading = false
            state.isError = true
        })
        builder.addCase(getAsyncCheck.fulfilled, (state, action) => {
            state.checkLogin = true
            state.isLoading = false
            state.isError = false
        })
        builder.addCase(getAsyncCheck.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncCheck.rejected, (state, action) => {
            state.checkLogin = false
            state.isLoading = false
            state.isError = true
        })
        builder.addCase(getAsyncLoginIndex.fulfilled, (state, action) => {
            state.login_index = action.payload.data.result
            state.isLoading = false
            state.isError = false
        })
        builder.addCase(getAsyncLoginIndex.pending, (state) => {
            state.login_index = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncLoginIndex.rejected, (state, action) => {
            state.login_index = action.payload
            state.isLoading = false
            state.isError = true
        })
    }

})
export const { loginClearResult} = loginSlice.actions

export default loginSlice.reducer