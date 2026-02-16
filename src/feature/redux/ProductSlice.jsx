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
export const getAsyncListProductAll = createAsyncThunk("product/getAsyncListProductAll",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/products/list/all`,{})
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
export const postAsyncEditProduct = createAsyncThunk("product/postAsyncEditProduct", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/products/update/${payload.id}`, payload, {});
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
export const deleteAsyncProduct = createAsyncThunk("product/deleteAsyncProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/products/delete/${payload.del}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})



const initialState = {
    result_delete:false,
    list_product_all:false,
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
            state.info_product = false
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
        builder.addCase(getAsyncListProductAll.fulfilled,(state, action)=>{
            state.list_product_all = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListProductAll.pending,(state)=>{
            state.list_product_all = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListProductAll.rejected,(state,action)=>{
            state.list_product_all = action.payload
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
        builder.addCase(postAsyncEditProduct.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditProduct.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditProduct.rejected,(state,action)=>{
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
        builder.addCase(deleteAsyncProduct.fulfilled,(state, action)=>{
            state.list_product.data = state.list_product.data.filter(
                product => product.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncProduct.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncProduct.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
    }
})
export const { productClearResult,productClearInfo,productClearResultDelete} = ProductSlice.actions

export default ProductSlice.reducer