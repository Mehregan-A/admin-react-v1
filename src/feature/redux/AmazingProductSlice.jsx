import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";
import {putAsyncEditArticle} from "./ArticleSlice.jsx";
import {postAsyncSearchAttribute} from "./AttributeSlice.jsx";

export const getAsyncListAmazingProduct = createAsyncThunk("amazingProduct/getAsyncListAmazingProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/products/amazing/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncSearchAmazingProduct = createAsyncThunk("amazingProduct/postAsyncSearchAmazingProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/products/amazing/search",payload,{})
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
    isLoading_action: false,
    isLoading_list:false,
    isError_list:false,
    info_product: false,
    list_product_amazing:[],
    result : false,
    isLoading: false,
    isError: false,
    search:false
}

const AmazingProductSlice = createSlice({
    name: 'amazingProduct',
    initialState,
    reducers : {
        productAmazingSearchClearResult : (state) => {
            state.search = false
        },
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
        builder.addCase(getAsyncListAmazingProduct.fulfilled,(state, action)=>{
            state.list_product_amazing = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListAmazingProduct.pending,(state)=>{
            state.list_product_amazing = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListAmazingProduct.rejected,(state,action)=>{
            state.list_product_amazing = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncSearchAmazingProduct.fulfilled,(state, action)=>{
            state.search = action.payload
            state.isLoading_search = false
        })
        builder.addCase(postAsyncSearchAmazingProduct.pending,(state)=>{
            state.search = false
            state.isLoading_search = true
        })
        builder.addCase(postAsyncSearchAmazingProduct.rejected,(state,action)=>{
            state.search = action.payload
            state.isLoading_search = false
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
export const { productClearResult,productAmazingSearchClearResult,productClearInfo,productClearResultDelete} = AmazingProductSlice.actions

export default AmazingProductSlice.reducer