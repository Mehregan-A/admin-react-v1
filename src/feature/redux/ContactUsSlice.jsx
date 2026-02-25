import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListContactUs = createAsyncThunk("contact/getAsyncListContactUs",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/contact/list`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditContactUs = createAsyncThunk("contact/postAsyncEditContactUs", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/contact/update`, payload, {});
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
    list_contact:[],
    result : false,
    isLoading: false,
    isError: false,
}

const ContactUsSlice = createSlice({
    name: 'contact',
    initialState,
    reducers : {
        contactUsClearResult : (state) => {
            state.result = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListContactUs.fulfilled,(state, action)=>{
            state.list_contact= action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListContactUs.pending,(state)=>{
            state.list_contact = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListContactUs.rejected,(state,action)=>{
            state.list_contact = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncEditContactUs.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditContactUs.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditContactUs.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
    }
})
export const { contactUsClearResult} = ContactUsSlice.actions

export default ContactUsSlice.reducer