import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";
import {deleteAsyncAttributeVal} from "./AttributeValueSlice.jsx";


export const getAsyncInfoCategoryAtt = createAsyncThunk("categoryAtt/getAsyncInfoCategoryAtt",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/category/attribute/get/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const deleteAsyncCategoryAtt = createAsyncThunk("categoryAtt/deleteAsyncCategoryAtt",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post(`/admin/category/attribute/remove/${payload.del}`, { value: payload.value })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncCategoryAddAtt = createAsyncThunk("categoryAtt/postAsyncCategoryAddAtt",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post(`/admin/category/attribute/add/${payload.Id}`, { value: payload.value })
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
    result : false,
    isLoading: false,
    isError: false,
}

const CategoryAttSlice = createSlice({
    name: 'categoryAtt',
    initialState,
    reducers : {
        categoryAttClearResult : (state) => {
            state.result = false
        },
        categoryAttClearResultDelete : (state) => {
            state.result_delete = false
        },
        categoryAttClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
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
            state.result= action.payload
            state.isLoading_action = false
        })
        builder.addCase(postAsyncCategoryAddAtt.pending,(state)=>{
            state.result = false
            state.isLoading_action = true
        })
        builder.addCase(postAsyncCategoryAddAtt.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading_action = false
        })
    }
})
export const { categoryAttClearResult,categoryAttClearInfo,categoryAttClearResultDelete} = CategoryAttSlice.actions

export default CategoryAttSlice.reducer