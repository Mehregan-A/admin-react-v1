import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListArticle = createAsyncThunk("article/getAsyncListArticle",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/article/list/${payload.row}/${payload.page}`,{})
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
export const putAsyncEditArticle = createAsyncThunk("article/putAsyncEditArticle", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.put(`/admin/article/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddArticle = createAsyncThunk("article/postAsyncAddArticle",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/article/add",payload,{})
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
export const deleteAsyncArticle = createAsyncThunk("article/deleteAsyncArticle",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/article/delete/${payload.del}`,{})
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
export const getAsyncGetInfoArticle = createAsyncThunk("article/getAsyncGetInfoArticle",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/article/get/${payload.Id}`,{
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
    list_article:[],
    list_category_select:[],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}


const ArticleSlice = createSlice({
    name: 'article',
    initialState,
    reducers : {
        articleClearResult : (state) => {
            state.result = false
        },
        articleClearResultDelete : (state) => {
            state.result_delete = false
        },
        articleClearInfo : (state) => {
            state.list_info_article = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListArticle.fulfilled,(state, action)=>{
            state.list_article = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListArticle.pending,(state)=>{
            state.list_article = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListArticle.rejected,(state,action)=>{
            state.list_article = action.payload
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
        builder.addCase(putAsyncEditArticle.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(putAsyncEditArticle.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(putAsyncEditArticle.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddArticle.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddArticle.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddArticle.rejected,(state,action)=>{
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
        builder.addCase(deleteAsyncArticle.fulfilled,(state, action)=>{
            state.list_article.data = state.list_article.data.filter(
                driver => driver.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncArticle.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncArticle.rejected,(state,action)=>{
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
        builder.addCase(getAsyncGetInfoArticle.fulfilled,(state, action)=>{
            state.list_info_article = action.payload.data.result
            state.isLoading = false
            state.isError = false
        })
        builder.addCase(getAsyncGetInfoArticle.pending,(state)=>{
            state.list_info_article = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncGetInfoArticle.rejected,(state,action)=>{
            state.list_info_article = action.payload
            state.isLoading = false
            state.isError = true
        })
    }
})
export const { articleClearResult,articleClearInfo,articleClearResultDelete} = ArticleSlice.actions

export default ArticleSlice.reducer