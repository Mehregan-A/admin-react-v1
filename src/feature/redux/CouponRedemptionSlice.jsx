import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListCouponRedemption = createAsyncThunk("couponRedemption/getAsyncListCouponRedemption",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/coupon/list/${payload.id}/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncAddCoupon = createAsyncThunk("coupon/postAsyncAddCoupon",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/coupon/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncCoupon = createAsyncThunk("coupon/deleteAsyncCoupon",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/coupon/delete/${payload.del}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusCoupon = createAsyncThunk("coupon/getAsyncStatusCoupon",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/coupon/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const putAsyncEditCoupon = createAsyncThunk("coupon/putAsyncEditCoupon",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.put(`/admin/coupon/update/${payload.id}`,payload,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncInfoCoupon = createAsyncThunk("coupon/getAsyncInfoCoupon",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/coupon/get/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})



const initialState = {
    isLoading_action: false,
    list_coupon_redemption:[],
    info_coupon:false,
    isLoading_list:false,
    isError_list:false,
    result : false,
    isLoading: false,
    isError: false,
    result_delete:false
}

const CouponRedemptionSlice = createSlice({
    name: 'couponRedemption',
    initialState,
    reducers : {
        couponClearResult : (state) => {
            state.result = false
        },
        couponClearResultDelete : (state) => {
            state.result_delete = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListCouponRedemption.fulfilled,(state, action)=>{
            state.list_coupon_redemption = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListCouponRedemption.pending,(state)=>{
            state.list_coupon_redemption = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListCouponRedemption.rejected,(state,action)=>{
            state.list_coupon_redemption = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncInfoCoupon.fulfilled,(state, action)=>{
            state.info_coupon= action.payload.data.result
            state.isLoading = false
            state.isError = false
            // const user = action.payload.data.result.user;
            // state.usersData[user.id] = user;
        })
        builder.addCase(getAsyncInfoCoupon.pending,(state)=>{
            state.info_coupon = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncInfoCoupon.rejected,(state,action)=>{
            state.info_coupon = action.payload
            state.isLoading = false
            state.isError = true
        })
        builder.addCase(postAsyncAddCoupon.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddCoupon.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddCoupon.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(deleteAsyncCoupon.fulfilled,(state, action)=>{
            state.list_coupon.data = state.list_coupon.data.filter(
                coupon => coupon.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
            state.isError = false
        })
        builder.addCase(deleteAsyncCoupon.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
            state.isError = false
        })
        builder.addCase(deleteAsyncCoupon.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
            state.isError = true
        })
        builder.addCase(getAsyncStatusCoupon.fulfilled,(state, action)=>{
            const result = state.list_coupon.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isLoading_action = false
            state.isError = false
        })
        builder.addCase(getAsyncStatusCoupon.pending,(state)=>{
            state.result = false
            state.isLoading_action = true
            state.isError = false
        })
        builder.addCase(getAsyncStatusCoupon.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading_action = false
            state.isError = true
        })
        builder.addCase(putAsyncEditCoupon.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false

        })
        builder.addCase(putAsyncEditCoupon.pending,(state)=>{
            state.result = false
            state.isLoading = true

        })
        builder.addCase(putAsyncEditCoupon.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false

        })
    }
})
export const { couponClearResult,couponClearResultDelete} = CouponSlice.actions

export default CouponRedemptionSlice.reducer