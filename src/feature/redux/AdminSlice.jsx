import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListAdmin = createAsyncThunk("admin/getAsyncListAdmin",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/admin/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncEditAdmin = createAsyncThunk("admin/postAsyncEditAdmin", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/admin/update/${payload.id}`, payload.values, {});

        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddAdmin = createAsyncThunk("admin/postAsyncAddAdmin",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/admin/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncAdmin = createAsyncThunk("admin/deleteAsyncAdmin",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/admin/delete/${payload.del}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusAdmin = createAsyncThunk("admin/getAsyncStatusAdmin",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/admin/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncPassword = createAsyncThunk("admin/postAsyncPassword",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post(`/admin/admin/password/change/${payload.id}`,payload.values,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})



const initialState = {
    isLoading_action: false,
    list_admin:[],
    isLoading_list:false,
    isError_list:false,
    result : false,
    isLoading: false,
    isError: false,
    result_delete:false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers : {
        adminClearResult : (state) => {
            state.result = false
        },
        adminClearResultDelete : (state) => {
            state.result_delete = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListAdmin.fulfilled,(state, action)=>{
            state.list_admin = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListAdmin.pending,(state)=>{
            state.list_admin = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListAdmin.rejected,(state,action)=>{
            state.list_admin = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncEditAdmin.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncEditAdmin.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncEditAdmin.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddAdmin.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddAdmin.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddAdmin.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(deleteAsyncAdmin.fulfilled,(state, action)=>{
            state.list_admin.data = state.list_admin.data.filter(
                driver => driver.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
            state.isError = false
        })
        builder.addCase(deleteAsyncAdmin.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
            state.isError = false
        })
        builder.addCase(deleteAsyncAdmin.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
            state.isError = true
        })
        builder.addCase(getAsyncStatusAdmin.fulfilled,(state, action)=>{
            const result = state.list_admin.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isLoading_action = false
            state.isError = false
        })
        builder.addCase(getAsyncStatusAdmin.pending,(state)=>{
            state.result = false
            state.isLoading_action = true
            state.isError = false
        })
        builder.addCase(getAsyncStatusAdmin.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading_action = false
            state.isError = true
        })
        builder.addCase(postAsyncPassword.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false

        })
        builder.addCase(postAsyncPassword.pending,(state)=>{
            state.result = false
            state.isLoading = true

        })
        builder.addCase(postAsyncPassword.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false

        })
    }
})
export const { adminClearResult,adminClearResultDelete} = adminSlice.actions

export default adminSlice.reducer