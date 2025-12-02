import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";
import {deleteAsyncAdmin} from "./AdminSlice.jsx";

export const getAsyncListVariantAttributeVal = createAsyncThunk("variantAttributeVal/getAsyncListVariantAttributeVal",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/variant-attribute/value/get/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncAddVariantAttributeVal = createAsyncThunk("variantAttributeVal/postAsyncAddVariantAttributeVal", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/variant-attribute/value/add/${payload.Id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const deleteAsyncVariantAttributeVal = createAsyncThunk("variantAttributeVal/deleteAsyncVariantAttributeVal",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post(`/admin/variant-attribute/value/remove/${payload.del}`,payload,{})
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
    list_variant_attribute_val:[],
    result : false,
    isLoading: false,
    isError: false,
    search:false,
}

const VariantAttributeValueSlice = createSlice({
    name: 'variantAttributeVal',
    initialState,
    reducers : {
        variantAttributeValClearResult : (state) => {
            state.result = false
        },
        variantAttributeValClearDelete : (state) => {
            state.result_delete = false
        },
        categoryClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListVariantAttributeVal.fulfilled,(state, action)=>{
            state.list_variant_attribute_val = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListVariantAttributeVal.pending,(state)=>{
            state.list_variant_attribute_val = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListVariantAttributeVal.rejected,(state,action)=>{
            state.list_variant_attribute_val = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(postAsyncAddVariantAttributeVal.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddVariantAttributeVal.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddVariantAttributeVal.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(deleteAsyncVariantAttributeVal.fulfilled, (state, action) => {
            const deletedValue = action.payload?.result;

            if (deletedValue !== undefined) {
                state.list_variant_attribute_val.data = state.list_variant_attribute_val.data.filter(
                    item => String(item.value) !== String(deletedValue)
                );
            }

            state.result_delete = action.payload;
            state.isLoading_action = false;
            state.isError = false;
        });
        builder.addCase(deleteAsyncVariantAttributeVal.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
            state.isError = false
        })
        builder.addCase(deleteAsyncVariantAttributeVal.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
            state.isError = true
        })
    }
})
export const { variantAttributeValClearResult,categoryClearInfo,variantAttributeValClearDelete} = VariantAttributeValueSlice.actions

export default VariantAttributeValueSlice.reducer