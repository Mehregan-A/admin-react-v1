import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListFaq = createAsyncThunk("faq/getAsyncListFaq",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/faq/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncSelectCategory = createAsyncThunk("category/getAsyncSelectCategory",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/category/select`,{})
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
export const putAsyncEditFaq = createAsyncThunk("faq/putAsyncEditFaq", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.put(`/admin/faq/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddFaq = createAsyncThunk("faq/postAsyncAddFaq",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/faq/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusFaq = createAsyncThunk("faq/getAsyncStatusFaq",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/faq/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncFaq = createAsyncThunk("faq/deleteAsyncFaq",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/faq/delete/${payload.del}`,{})
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
    list_category:[],
    list_category_select:[],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}


const FaqSlice = createSlice({
    name: 'faq',
    initialState,
    reducers : {
        faqClearResult : (state) => {
            state.result = false
        },
        faqClearResultDelete : (state) => {
            state.result_delete = false
        },
        faqClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListFaq.fulfilled,(state, action)=>{
            state.list_faq = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListFaq.pending,(state)=>{
            state.list_faq = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListFaq.rejected,(state,action)=>{
            state.list_faq = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncSelectCategory.fulfilled,(state, action)=>{
            state.list_category_select = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncSelectCategory.pending,(state)=>{
            state.list_category_select = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncSelectCategory.rejected,(state,action)=>{
            state.list_category_select = action.payload
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
        builder.addCase(putAsyncEditFaq.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(putAsyncEditFaq.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(putAsyncEditFaq.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddFaq.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddFaq.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddFaq.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncStatusFaq.fulfilled,(state, action)=>{
            const result = state.list_faq.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusFaq.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusFaq.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncFaq.fulfilled,(state, action)=>{
            state.list_faq.data = state.list_faq.data.filter(
                driver => driver.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncFaq.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncFaq.rejected,(state,action)=>{
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
export const { faqClearResult,faqClearInfo,faqClearResultDelete} = FaqSlice.actions

export default FaqSlice.reducer