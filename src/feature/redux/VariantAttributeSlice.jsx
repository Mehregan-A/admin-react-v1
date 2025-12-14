import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListVariantAttributeSelect = createAsyncThunk("variantAttribute/getAsyncListVariantAttributeSelect",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/variant-attribute/select`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncListVariantAttribute = createAsyncThunk("variantAttribute/getAsyncListVariantAttribute",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/variant-attribute/list/${payload.row}/${payload.page}`,{})
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
export const putAsyncEditVariantAttribute = createAsyncThunk("variantAttribute/putAsyncEditVariantAttribute", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.put(`/admin/variant-attribute/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddVariantAttribute = createAsyncThunk("variantAttribute/postAsyncAddVariantAttribute",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/variant-attribute/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusVariantAttribute = createAsyncThunk("variantAttribute/getAsyncStatusVariantAttribute",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/attribute/status/change/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncVariantAttribute = createAsyncThunk("variantAttribute/deleteAsyncVariantAttribute",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/variant-attribute/delete/${payload.del}`,{})
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
    variant_attribute_list:[],
    list_variant_attribute_select:[],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
    search: false,
    isLoading_search:false
}

const VariantAttributeSlice = createSlice({
    name: 'variantAttribute',
    initialState,
    reducers : {
        variantAttributeClearResult : (state) => {
            state.result = false
        },
        variantAttributeClearResultDelete : (state) => {
            state.result_delete = false
        },
        categoryClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListVariantAttributeSelect.fulfilled,(state, action)=>{
            state.list_variant_attribute_select = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListVariantAttributeSelect.pending,(state)=>{
            state.list_variant_attribute_select = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListVariantAttributeSelect.rejected,(state,action)=>{
            state.list_variant_attribute_select = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncListVariantAttribute.fulfilled,(state, action)=>{
            state.variant_attribute_list = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListVariantAttribute.pending,(state)=>{
            state.variant_attribute_list = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListVariantAttribute.rejected,(state,action)=>{
            state.variant_attribute_list = action.payload
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
        builder.addCase(putAsyncEditVariantAttribute.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(putAsyncEditVariantAttribute.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(putAsyncEditVariantAttribute.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddVariantAttribute.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddVariantAttribute.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddVariantAttribute.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncStatusVariantAttribute.fulfilled,(state, action)=>{
            const result = state.variant_attribute_list.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusVariantAttribute.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusVariantAttribute.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncVariantAttribute.fulfilled,(state, action)=>{
            state.variant_attribute_list.data = state.variant_attribute_list.data.filter(
                att => att.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncVariantAttribute.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncVariantAttribute.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
    }
})
export const {variantAttributeClearResult, variantAttributeClearResultDelete,categoryClearInfo,categoryClearResultDelete} = VariantAttributeSlice.actions

export default VariantAttributeSlice.reducer