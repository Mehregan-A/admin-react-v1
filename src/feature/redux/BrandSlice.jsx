import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListBrand = createAsyncThunk("brand/getAsyncListBrand",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/brand/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncSelectBrand = createAsyncThunk("brand/getAsyncSelectBrand",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/brand/select`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditBrand = createAsyncThunk("brand/postAsyncEditBrand", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.put(`/admin/brand/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddBrand = createAsyncThunk("brand/postAsyncAddBrand",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/brand/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusBrand = createAsyncThunk("brand/getAsyncStatusBrand",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/brand/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncBrand = createAsyncThunk("brand/deleteAsyncBrand",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/brand/delete/${payload.del}`,{})
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
    list_brand:[],
    list_brand_select:[],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}


const BrandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers : {
        BrandClearResult : (state) => {
            state.result = false
        },
        BrandClearResultDelete : (state) => {
            state.result_delete = false
        },
        BrandClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListBrand.fulfilled,(state, action)=>{
            state.list_brand = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListBrand.pending,(state)=>{
            state.list_brand = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListBrand.rejected,(state,action)=>{
            state.list_brand = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncSelectBrand.fulfilled,(state, action)=>{
            state.list_brand_select = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncSelectBrand.pending,(state)=>{
            state.list_brand_select = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncSelectBrand.rejected,(state,action)=>{
            state.list_brand_select = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncEditBrand.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditBrand.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditBrand.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddBrand.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddBrand.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddBrand.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncStatusBrand.fulfilled,(state, action)=>{
            const result = state.list_brand.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusBrand.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusBrand.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncBrand.fulfilled,(state, action)=>{
            state.list_brand.data = state.list_brand.data.filter(
                brand => brand.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncBrand.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncBrand.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
    }
})
export const { BrandClearResult,BrandClearInfo,BrandClearResultDelete} = BrandSlice.actions

export default BrandSlice.reducer