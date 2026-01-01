import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListSeo = createAsyncThunk("seo/getAsyncListSeo",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/seo-site/list`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditSeo = createAsyncThunk("seo/postAsyncEditSeo", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/seo-site/update`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});


const initialState = {
    result_delete:false,
    isLoading_action: false,
    isLoading_list:false,
    isError_list:false,
    info_att: [],
    list_seo:[],
    list_category_select:[],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}

const SeoSiteSlice = createSlice({
    name: 'seo',
    initialState,
    reducers : {
        seoClearResult : (state) => {
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
        builder.addCase(getAsyncListSeo.fulfilled,(state, action)=>{
            state.list_seo = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListSeo.pending,(state)=>{
            state.list_seo = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListSeo.rejected,(state,action)=>{
            state.list_seo = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncEditSeo.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditSeo.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditSeo.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
    }
})
export const { seoClearResult,categoryClearInfo,categoryClearResultDelete} = SeoSiteSlice.actions

export default SeoSiteSlice.reducer