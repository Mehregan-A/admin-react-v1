import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListGateway = createAsyncThunk("gateway/getAsyncListGateway",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/gateway/list`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditGateway = createAsyncThunk("gateway/postAsyncEditGateway", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/gateway/update`, payload, {});
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
    list_gateway:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}

const GatewaySlice = createSlice({
    name: 'gateway',
    initialState,
    reducers : {
        gatewayClearResult : (state) => {
            state.result = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListGateway.fulfilled,(state, action)=>{
            state.list_gateway= action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListGateway.pending,(state)=>{
            state.list_gateway = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListGateway.rejected,(state,action)=>{
            state.list_gateway = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncEditGateway.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditGateway.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditGateway.rejected,(state,action)=>{
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
export const { gatewayClearResult} = GatewaySlice.actions

export default GatewaySlice.reducer