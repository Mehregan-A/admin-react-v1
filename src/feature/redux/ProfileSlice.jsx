import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncProfile = createAsyncThunk("profile/getAsyncProfile",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/profile/get`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncPasswordProfile = createAsyncThunk("profile/postAsyncPasswordProfile",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post(`/admin/profile/password/change`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue({
            data: error.response,
            message: error.message,
        });
    }
})


const initialState = {
    profile:[],
    result : false,
    isLoading_list:false,
    isError_list:false,
    isLoading: false,
    isError: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers : {
        profileClearResult : (state) => {
            state.result = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncProfile.fulfilled,(state, action)=>{
            state.profile = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncProfile.pending,(state)=>{
            state.profile = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncProfile.rejected,(state,action)=>{
            state.profile = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncPasswordProfile.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncPasswordProfile.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncPasswordProfile.rejected,(state,action)=>{
            state.result = action.payload.data
            state.isLoading = false
        })
    }
})
export const { profileClearResult} = profileSlice.actions

export default profileSlice.reducer