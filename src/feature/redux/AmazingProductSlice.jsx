import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";
import {putAsyncEditArticle} from "./ArticleSlice.jsx";
import {getAsyncStatusAttribute, postAsyncSearchAttribute} from "./AttributeSlice.jsx";

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
export const getAsyncInfoAmazingProduct = createAsyncThunk("amazingProduct/getAsyncInfoAmazingProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/products/amazing/get/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditAmazingProduct = createAsyncThunk("amazingProduct/postAsyncEditAmazingProduct", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/products/amazing/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});

export const postAsyncAddAmazingProduct = createAsyncThunk("amazingProduct/postAsyncAddAmazingProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/products/amazing/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusAmazingProduct = createAsyncThunk("amazingProduct/getAsyncStatusAmazingProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/products/amazing/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncAmazingProduct = createAsyncThunk("amazingProduct/deleteAsyncAmazingProduct",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/products/amazing/delete/${payload.del}`,{})
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
    info_amazing: false,
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
        productAmazingClearResult : (state) => {
            state.result = false
        },
        productAmazingClearResultDelete : (state) => {
            state.result_delete = false
        },
        productAmazingClearInfo : (state) => {
            state.info_amazing = false
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
        builder.addCase(getAsyncInfoAmazingProduct.fulfilled,(state, action)=>{
            state.info_amazing = action.payload.data.result
            state.isLoading = false
            state.isError = false
            // const user = action.payload.data.result.user;
            // state.usersData[user.id] = user;
        })
        builder.addCase(getAsyncInfoAmazingProduct.pending,(state)=>{
            state.info_amazing = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncInfoAmazingProduct.rejected,(state,action)=>{
            state.info_amazing = action.payload
            state.isLoading = false
            state.isError = true
        })
        builder.addCase(postAsyncEditAmazingProduct.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditAmazingProduct.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditAmazingProduct.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })

        builder.addCase(postAsyncAddAmazingProduct.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddAmazingProduct.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddAmazingProduct.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncStatusAmazingProduct.fulfilled,(state, action)=>{
            const result = state.list_product_amazing.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusAmazingProduct.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusAmazingProduct.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncAmazingProduct.fulfilled,(state, action)=>{
            state.list_product_amazing.data = state.list_product_amazing.data.filter(
                amazing => amazing.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncAmazingProduct.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncAmazingProduct.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
    }
})
export const { productAmazingClearResult,productAmazingSearchClearResult,productAmazingClearInfo,productAmazingClearResultDelete} = AmazingProductSlice.actions

export default AmazingProductSlice.reducer