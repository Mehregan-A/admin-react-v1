import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListCategory = createAsyncThunk("category/getAsyncListCategory",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/category/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncInfoUser = createAsyncThunk("user/getAsyncInfoUser",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/user/get/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditUser = createAsyncThunk("user/postAsyncEditDriver", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/user/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddUser = createAsyncThunk("user/postAsyncAddDriver",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/user/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusUser = createAsyncThunk("user/getAsyncStatusUser",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/user/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncUser = createAsyncThunk("user/deleteAsyncUser",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/user/delete/${payload.del}`,{})
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
    info_edit: false,
    list_category:[],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}

//get / list / result / isLoading / isError / select



const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers : {
        userClearResult : (state) => {
            state.result = false
        },
        userClearResultDelete : (state) => {
            state.result_delete = false
        },
        userClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListCategory.fulfilled,(state, action)=>{
            state.list_category = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListCategory.pending,(state)=>{
            state.list_category = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListCategory.rejected,(state,action)=>{
            state.list_category = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncInfoUser.fulfilled,(state, action)=>{
            state.info_edit = action.payload.data.result
            state.isLoading = false
            state.isError = false
            const user = action.payload.data.result.user;
            state.usersData[user.id] = user;
        })
        builder.addCase(getAsyncInfoUser.pending,(state)=>{
            state.info_edit = false
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAsyncInfoUser.rejected,(state,action)=>{
            state.info_edit = action.payload
            state.isLoading = false
            state.isError = true
        })
        builder.addCase(postAsyncEditUser.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditUser.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditUser.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddUser.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddUser.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddUser.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncStatusUser.fulfilled,(state, action)=>{
            const result = state.list_user.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusUser.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusUser.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncUser.fulfilled,(state, action)=>{
            state.list_user.data = state.list_user.data.filter(
                driver => driver.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncUser.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncUser.rejected,(state,action)=>{
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
export const { userClearResult,userClearInfo,userClearResultDelete} = categorySlice.actions

export default categorySlice.reducer