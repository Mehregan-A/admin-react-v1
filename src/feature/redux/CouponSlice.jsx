import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";
import {getAsyncInfoCategoryAtt} from "./CategorySlice.jsx";

export const getAsyncListCoupon = createAsyncThunk("coupon/getAsyncListCoupon",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/coupon/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const putAsyncEditAdmin = createAsyncThunk("admin/putAsyncEditAdmin", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.put(`/admin/admin/update/${payload.id}`, payload.values, {});

        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddAdmin = createAsyncThunk("admin/postAsyncAddAdmin",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/admin/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncAdmin = createAsyncThunk("admin/deleteAsyncAdmin",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/admin/delete/${payload.del}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusAdmin = createAsyncThunk("admin/getAsyncStatusAdmin",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/admin/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const putAsyncEditCoupon = createAsyncThunk("coupon/putAsyncEditCoupon",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.put(`/admin/coupon/update/${payload.id}`,payload.values,{
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
    list_coupon:[],
    info_coupon:false,
    isLoading_list:false,
    isError_list:false,
    result : false,
    isLoading: false,
    isError: false,
    result_delete:false
}

const CouponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers : {
        adminClearResult : (state) => {
            state.result = false
        },
        adminClearResultDelete : (state) => {
            state.result_delete = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListCoupon.fulfilled,(state, action)=>{
            state.list_coupon = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListCoupon.pending,(state)=>{
            state.list_coupon = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListCoupon.rejected,(state,action)=>{
            state.list_coupon = action.payload
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
        builder.addCase(putAsyncEditAdmin.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(putAsyncEditAdmin.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(putAsyncEditAdmin.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddAdmin.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddAdmin.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddAdmin.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(deleteAsyncAdmin.fulfilled,(state, action)=>{
            state.list_admin.data = state.list_admin.data.filter(
                driver => driver.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
            state.isError = false
        })
        builder.addCase(deleteAsyncAdmin.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
            state.isError = false
        })
        builder.addCase(deleteAsyncAdmin.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
            state.isError = true
        })
        builder.addCase(getAsyncStatusAdmin.fulfilled,(state, action)=>{
            const result = state.list_admin.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isLoading_action = false
            state.isError = false
        })
        builder.addCase(getAsyncStatusAdmin.pending,(state)=>{
            state.result = false
            state.isLoading_action = true
            state.isError = false
        })
        builder.addCase(getAsyncStatusAdmin.rejected,(state,action)=>{
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
export const { adminClearResult,adminClearResultDelete} = CouponSlice.actions

export default CouponSlice.reducer