import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListRules = createAsyncThunk("rules/getAsyncListRules",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/rules/list`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const postAsyncEditRules = createAsyncThunk("rules/postAsyncEditRules", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/rules/update`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});


const initialState = {
    isLoading_action: false,
    isLoading_list:false,
    isError_list:false,
    list_rules:[],
    result : false,
    isLoading: false,
    isError: false,
}

const RulesSlice = createSlice({
    name: 'rules',
    initialState,
    reducers : {
        rulesClearResult : (state) => {
            state.result = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListRules.fulfilled,(state, action)=>{
            state.list_rules= action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListRules.pending,(state)=>{
            state.list_rules = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListRules.rejected,(state,action)=>{
            state.list_rules = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncEditRules.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditRules.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditRules.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
    }
})
export const {rulesClearResult} = RulesSlice.actions

export default RulesSlice.reducer