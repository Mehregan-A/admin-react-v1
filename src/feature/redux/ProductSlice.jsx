import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListProduct = createAsyncThunk("product/getAsyncListProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/products/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncInfoCategoryAtt = createAsyncThunk("category/getAsyncInfoCategoryAtt",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/category/attribute/get/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditCategory = createAsyncThunk("category/postAsyncEditCategory", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/category/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddProduct = createAsyncThunk("product/postAsyncAddProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/products/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusCategory = createAsyncThunk("category/getAsyncStatusCategory",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/category/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncCategory = createAsyncThunk("category/deleteAsyncCategory",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/category/delete/${payload.del}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncCategoryAtt = createAsyncThunk("category/deleteAsyncCategoryAtt",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post(`/admin/category/attribute/remove/${payload.del}`, { value: payload.value })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncCategoryAddAtt = createAsyncThunk("category/postAsyncCategoryAddAtt",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post(`/admin/category/attribute/add/${payload.del}`, { value: payload.value })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncGetInfo = createAsyncThunk("user/getAsyncGetInfo",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/user/get/${payload.Id}`,{
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
    list_product:[],
    list_category_select:[],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}

//get / list / result / isLoading / isError / select



const ProductSlice = createSlice({
    name: 'product',
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
        builder.addCase(getAsyncListProduct.fulfilled,(state, action)=>{
            state.list_product = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListProduct.pending,(state)=>{
            state.list_product = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListProduct.rejected,(state,action)=>{
            state.list_product = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncInfoCategoryAtt.fulfilled,(state, action)=>{
            state.info_att = action.payload.data.result
            state.isLoading = false
            state.isError = false
            // const user = action.payload.data.result.user;
            // state.usersData[user.id] = user;
        })
        builder.addCase(getAsyncInfoCategoryAtt.pending,(state)=>{
            state.info_att = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncInfoCategoryAtt.rejected,(state,action)=>{
            state.info_att = action.payload
            state.isLoading = false
            state.isError = true
        })
        builder.addCase(postAsyncEditCategory.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditCategory.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditCategory.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddProduct.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddProduct.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddProduct.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncStatusCategory.fulfilled,(state, action)=>{
            const result = state.list_category.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusCategory.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusCategory.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncCategory.fulfilled,(state, action)=>{
            state.list_category.data = state.list_category.data.filter(
                driver => driver.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncCategory.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncCategory.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncCategoryAtt.fulfilled,(state, action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncCategoryAtt.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncCategoryAtt.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(postAsyncCategoryAddAtt.fulfilled,(state, action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(postAsyncCategoryAddAtt.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(postAsyncCategoryAddAtt.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(getAsyncGetInfo.fulfilled,(state, action)=>{
            state.list_info_user = action.payload.data.result
            state.isLoading = false
            state.isError = false
        })
        builder.addCase(getAsyncGetInfo.pending,(state)=>{
            state.list_info_user = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncGetInfo.rejected,(state,action)=>{
            state.list_info_user = action.payload
            state.isLoading = false
            state.isError = true
        })
    }
})
export const { categoryClearResult,categoryClearInfo,categoryClearResultDelete} = ProductSlice.actions

export default ProductSlice.reducer