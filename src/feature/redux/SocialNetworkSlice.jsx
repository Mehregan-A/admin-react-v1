import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListSocial = createAsyncThunk("social/getAsyncListSocial",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/social-network/list`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditSocial = createAsyncThunk("social/postAsyncEditSocial", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/social-network/update`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});


const initialState = {
    result_delete:false,
    isLoading_action: false,
    isLoading_list:false,
    isError_list:false,
    list_social:[],
    result : false,
    isLoading: false,
    isError: false,
}

const SocialNetworkSlice = createSlice({
    name: 'social',
    initialState,
    reducers : {
        socialClearResult : (state) => {
            state.result = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListSocial.fulfilled,(state, action)=>{
            state.list_social= action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListSocial.pending,(state)=>{
            state.list_social = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListSocial.rejected,(state,action)=>{
            state.list_social = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncEditSocial.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditSocial.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditSocial.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
    }
})
export const { socialClearResult} = SocialNetworkSlice.actions

export default SocialNetworkSlice.reducer