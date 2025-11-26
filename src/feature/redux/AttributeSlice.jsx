import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListAttributeSelect = createAsyncThunk("attribute/getAsyncListAttributeSelect",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/attribute/select`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncListAttribute = createAsyncThunk("attribute/getAsyncListAttribute",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/attribute/list/${payload.row}/${payload.page}`,{})
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
export const putAsyncEditAttribute = createAsyncThunk("attribute/putAsyncEditAttribute", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.put(`/admin/attribute/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddAttribute = createAsyncThunk("attribute/postAsyncAddAttribute",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/attribute/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusAttribute = createAsyncThunk("attribute/getAsyncStatusAttribute",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/attribute/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncAttribute = createAsyncThunk("attribute/deleteAsyncAttribute",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/attribute/delete/${payload.del}`,{})
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
    list_attribute:[],
    list_attribute_select:[],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}

const AttributeSlice = createSlice({
    name: 'attribute',
    initialState,
    reducers : {
        attributeClearResult : (state) => {
            state.result = false
        },
        attributeClearResultDelete : (state) => {
            state.result_delete = false
        },
        categoryClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListAttributeSelect.fulfilled,(state, action)=>{
            state.list_attribute_select = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListAttributeSelect.pending,(state)=>{
            state.list_attribute_select = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListAttributeSelect.rejected,(state,action)=>{
            state.list_attribute_select = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncListAttribute.fulfilled,(state, action)=>{
            state.list_attribute = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListAttribute.pending,(state)=>{
            state.list_attribute = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListAttribute.rejected,(state,action)=>{
            state.list_attribute = action.payload
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
        builder.addCase(putAsyncEditAttribute.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(putAsyncEditAttribute.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(putAsyncEditAttribute.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddAttribute.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddAttribute.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddAttribute.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncStatusAttribute.fulfilled,(state, action)=>{
            const result = state.list_attribute.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusAttribute.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusAttribute.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncAttribute.fulfilled,(state, action)=>{
            state.list_attribute.data = state.list_attribute.data.filter(
                att => att.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncAttribute.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncAttribute.rejected,(state,action)=>{
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
export const {attributeClearResult, attributeClearResultDelete,categoryClearInfo,categoryClearResultDelete} = AttributeSlice.actions

export default AttributeSlice.reducer