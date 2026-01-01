import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListShippingMethod = createAsyncThunk("shippingMethod/getAsyncListShippingMethod",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/shipping-methods/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncListShippingMethodFree = createAsyncThunk("shippingMethod/getAsyncListShippingMethodFree",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/free-shipping/list`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditShippingMethod = createAsyncThunk("shippingMethod/postAsyncEditShippingMethod", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/shipping-methods/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncEditShippingMethodFree = createAsyncThunk("shippingMethod/postAsyncEditShippingMethodFree", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/free-shipping/update`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddShippingMethod = createAsyncThunk("shippingMethod/postAsyncAddShippingMethod",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/shipping-methods/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusShippingMethod = createAsyncThunk("shippingMethod/getAsyncStatusShippingMethod",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/shipping-methods/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncShippingMethod = createAsyncThunk("shippingMethod/deleteAsyncShippingMethod",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/shipping-methods/delete/${payload.del}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


const initialState = {
    result_delete:false,
    isLoading_action: false,
    isLoading_list:false,
    isLoading_list_free:false,
    isError_list:false,
    info_att: [],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
    isError_list_free:false,
}


const ShippingMethodSlice = createSlice({
    name: 'shippingMethod',
    initialState,
    reducers : {
        shippingClearResult : (state) => {
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
        builder.addCase(getAsyncListShippingMethod.fulfilled,(state, action)=>{
            state.list_shipping_method = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListShippingMethod.pending,(state)=>{
            state.list_shipping_method = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListShippingMethod.rejected,(state,action)=>{
            state.list_shipping_method = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncListShippingMethodFree.fulfilled,(state, action)=>{
            state.list_shipping_method_free = action.payload.data.result
            state.isLoading_list_free = false
            state.isError_list_free = false
        })
        builder.addCase(getAsyncListShippingMethodFree.pending,(state)=>{
            state.list_shipping_method_free = false
            state.isLoading_list_free = true
            state.isError_list_free = false
        })
        builder.addCase(getAsyncListShippingMethodFree.rejected,(state,action)=>{
            state.list_shipping_method_free = action.payload
            state.isLoading_list_free = false
            state.isError_list_free = true
        })
        builder.addCase(postAsyncEditShippingMethod.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditShippingMethod.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditShippingMethod.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditShippingMethodFree.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditShippingMethodFree.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditShippingMethodFree.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddShippingMethod.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddShippingMethod.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddShippingMethod.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncStatusShippingMethod.fulfilled,(state, action)=>{
            const result = state.list_shipping_method.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusShippingMethod.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusShippingMethod.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncShippingMethod.fulfilled,(state, action)=>{
            state.list_shipping_method.data = state.list_shipping_method.data.filter(
                method => method.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncShippingMethod.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncShippingMethod.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
    }
})
export const { shippingClearResult,categoryClearInfo,categoryClearResultDelete} = ShippingMethodSlice.actions

export default ShippingMethodSlice.reducer