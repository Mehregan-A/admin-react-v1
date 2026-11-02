import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/Services.jsx";

export const postAsyncLogin = createAsyncThunk("login/postAsyncLogin",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/verify",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncVerify = createAsyncThunk("login/postAsyncVerify",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/OTP",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncAuth = createAsyncThunk("login/postAsyncAuth",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/user/profile/update/form",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const getAsyncLogout = createAsyncThunk("login/getAsyncLogout",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get("/user/logout",{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncCheck = createAsyncThunk("login/getAsyncCheck",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get("/user/check-login",{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncCaptcha = createAsyncThunk("login/getAsyncCaptcha",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get("/captcha",{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

const initialState = {
    open:false,
    isLoading_auth:false,
    isLoading_verify:false,
    captcha:false,
    verify:false,
    login_index:[],
    isLoading_enter:false,
    isAuthenticated: null,
    profile:false,
    logout:false,
    login : false,
    result : [],
    checkLogin:null,
    isLoading: false,
    isError: false,
    auth:false,
    isLoading_captcha: false,
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
        authClearResult : (state) => {
            state.auth = false
            state.checkLogin = true
        },
        verifyClearResult : (state) => {
            state.verify = false
            state.checkLogin = true

        },
        openLoginState: (state, action) => {
            state.open = action.payload;
        }
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
        builder.addCase(postAsyncAuth.fulfilled, (state, action) => {
            state.auth = action.payload
            state.isLoading_auth = false
            state.isError = false
        })
        builder.addCase(postAsyncAuth.pending, (state) => {
            state.auth = false
            state.isLoading_auth = true
            state.isError = false
        })
        builder.addCase(postAsyncAuth.rejected, (state, action) => {
            state.auth = action.payload
            state.isLoading_auth = false
            state.isError = true
        })
        builder.addCase(postAsyncVerify.fulfilled, (state, action) => {
            state.verify = action.payload
            state.isLoading_verify = false
            state.isError = false
        })
        builder.addCase(postAsyncVerify.pending, (state) => {
            state.verify = false
            state.isLoading_verify = true
            state.isError = false
        })
        builder.addCase(postAsyncVerify.rejected, (state, action) => {
            state.verify = action.payload
            state.isLoading_verify = false
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
        builder.addCase(getAsyncCaptcha.fulfilled, (state, action) => {
            state.captcha = action.payload.data.result
            state.isLoading_captcha = false
            state.isError = false
        })
        builder.addCase(getAsyncCaptcha.pending, (state) => {
            state.captcha = false
            state.isLoading_captcha = true
            state.isError = false
        })
        builder.addCase(getAsyncCaptcha.rejected, (state, action) => {
            state.captcha = action.payload
            state.isLoading_captcha = false
            state.isError = true
        })
    }

})
export const {openLoginState, loginClearResult,authClearResult,verifyClearResult} = loginSlice.actions

export default loginSlice.reducer