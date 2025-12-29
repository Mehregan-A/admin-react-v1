import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListSetting = createAsyncThunk("setting/getAsyncListSetting",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/setting/list`,{})
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


const initialState = {
    isLoading_action: false,
    isLoading_list:false,
    isError_list:false,
    list_setting:[],
    result : false,
    isLoading: false,
    isError: false,
}

const SettingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers : {
        settingClearResult : (state) => {
            state.result = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListSetting.fulfilled,(state, action)=>{
            state.list_setting= action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListSetting.pending,(state)=>{
            state.list_setting = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListSetting.rejected,(state,action)=>{
            state.list_setting = action.payload
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
    }
})
export const { settingClearResult,categoryClearInfo,categoryClearResultDelete} = SettingSlice.actions

export default SettingSlice.reducer