import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListSms = createAsyncThunk("sms/getAsyncListSms",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/sms-setting/list`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditSetting = createAsyncThunk("setting/postAsyncEditSetting", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/setting/update`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddSms = createAsyncThunk("sms/postAsyncAddSms",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/sms-setting/update",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


const initialState = {
    result_delete:false,
    isLoading_action: false,
    isLoading_list:false,
    isError_list:false,
    info_att: [],
    list_sms:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}

const SmsSlice = createSlice({
    name: 'sms',
    initialState,
    reducers : {
        smsClearResult : (state) => {
            state.result = false
        },
        categoryClearResultDelete : (state) => {
            state.result_delete = false
        },
        categoryClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListSms.fulfilled,(state, action)=>{
            state.list_sms= action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListSms.pending,(state)=>{
            state.list_sms = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListSms.rejected,(state,action)=>{
            state.list_sms = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncEditSetting.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditSetting.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditSetting.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddSms.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddSms.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddSms.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
    }
})
export const { smsClearResult,categoryClearInfo,categoryClearResultDelete} = SmsSlice.actions

export default SmsSlice.reducer