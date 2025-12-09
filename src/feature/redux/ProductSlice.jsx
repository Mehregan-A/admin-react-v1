import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";
import {putAsyncEditArticle} from "./ArticleSlice.jsx";

export const getAsyncListProduct = createAsyncThunk("product/getAsyncListProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/products/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncInfoProduct = createAsyncThunk("product/getAsyncInfoProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/products/get/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const putAsyncEditProduct = createAsyncThunk("product/putAsyncEditProduct", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.put(`/admin/products/update/${payload.id}`, payload, {});
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



const initialState = {
    result_delete:false,
    isLoading_action: false,
    isLoading_list:false,
    isError_list:false,
    info_product: false,
    list_product:[],
    result : false,
    isLoading: false,
    isError: false,
}

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers : {
        productClearResult : (state) => {
            state.result = false
        },
        productClearResultDelete : (state) => {
            state.result_delete = false
        },
        productClearInfo : (state) => {
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
        builder.addCase(getAsyncInfoProduct.fulfilled,(state, action)=>{
            state.info_product = action.payload.data.result
            state.isLoading = false
            state.isError = false
            // const user = action.payload.data.result.user;
            // state.usersData[user.id] = user;
        })
        builder.addCase(getAsyncInfoProduct.pending,(state)=>{
            state.info_product = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncInfoProduct.rejected,(state,action)=>{
            state.info_product = action.payload
            state.isLoading = false
            state.isError = true
        })
        builder.addCase(putAsyncEditProduct.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(putAsyncEditProduct.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(putAsyncEditProduct.rejected,(state,action)=>{
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
    }
})
export const { productClearResult,productClearInfo,productClearResultDelete} = ProductSlice.actions

export default ProductSlice.reducer