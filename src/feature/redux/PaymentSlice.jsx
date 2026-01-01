import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListPayment = createAsyncThunk("payment/getAsyncListPayment",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/payment/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusPayment = createAsyncThunk("payment/getAsyncStatusPayment",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/customers/status/change/${payload.Id}`,{
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

const PaymentSlice = createSlice({
    name: 'payment',
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
        builder.addCase(getAsyncListPayment.fulfilled,(state, action)=>{
            state.list_payment = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListPayment.pending,(state)=>{
            state.list_payment = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListPayment.rejected,(state,action)=>{
            state.list_payment = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncStatusPayment.fulfilled,(state, action)=>{
            const result = state.list_payment.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusPayment.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusPayment.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
    }
})
export const { categoryClearResult,categoryClearInfo,categoryClearResultDelete} = PaymentSlice.actions

export default PaymentSlice.reducer