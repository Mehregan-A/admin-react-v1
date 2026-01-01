import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListOrder = createAsyncThunk("order/getAsyncListOrder",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/order/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncInfoOrder = createAsyncThunk("order/getAsyncInfoOrder",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/order/get/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusOrder = createAsyncThunk("order/getAsyncStatusOrder",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/order/status/change/cancelled/${payload.Id}`,{
        })
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
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers : {
        categoryClearResult : (state) => {
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
        builder.addCase(getAsyncListOrder.fulfilled,(state, action)=>{
            state.list_order = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListOrder.pending,(state)=>{
            state.list_order = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListOrder.rejected,(state,action)=>{
            state.list_order = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncInfoOrder.fulfilled,(state, action)=>{
            state.info_order = action.payload.data.result
            state.isLoading = false
            state.isError = false
            // const user = action.payload.data.result.user;
            // state.usersData[user.id] = user;
        })
        builder.addCase(getAsyncInfoOrder.pending,(state)=>{
            state.info_order = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncInfoOrder.rejected,(state,action)=>{
            state.info_order = action.payload
            state.isLoading = false
            state.isError = true
        })
        builder.addCase(getAsyncStatusOrder.fulfilled,(state, action)=>{
            const result = state.list_order.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusOrder.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusOrder.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
    }
})

export default OrderSlice.reducer