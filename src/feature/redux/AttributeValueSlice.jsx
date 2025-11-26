import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";
import {deleteAsyncAdmin} from "./AdminSlice.jsx";

export const getAsyncListAttributeVal = createAsyncThunk("attributeVal/getAsyncListAttributeVal",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`/admin/attribute/value/get/${payload.Id}`,{
        })
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncAddAttributeVal = createAsyncThunk("attributeVal/getAsyncAddAttributeVal", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/attribute/value/add/${payload.Id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncSearchAttributeVal = createAsyncThunk("attributeVal/postAsyncSearchAttributeVal", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.post(`/admin/attribute/value/search/${payload.Id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddCategory = createAsyncThunk("category/postAsyncAddCategory",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/category/add",payload,{})
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
export const deleteAsyncAttributeVal = createAsyncThunk("attributeVal/deleteAsyncAttributeVal",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post(`/admin/attribute/value/remove/${payload.del}`,payload,{})
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
    list_attribute_val:[],
    list_info_user:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
    search:false,
    isLoading_search:false
}

const AttributeValueSlice = createSlice({
    name: 'attributeVal',
    initialState,
    reducers : {
        attributeValClearSearch : (state) => {
            state.search = false
        },
        attributeValClearResult : (state) => {
            state.result = false
        },
        attributeValClearDelete : (state) => {
            state.result_delete = false
        },
        categoryClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListAttributeVal.fulfilled,(state, action)=>{
            state.list_attribute_val = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListAttributeVal.pending,(state)=>{
            state.list_attribute_val = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListAttributeVal.rejected,(state,action)=>{
            state.list_attribute_val = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(getAsyncAddAttributeVal.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncAddAttributeVal.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(getAsyncAddAttributeVal.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncSearchAttributeVal.fulfilled,(state, action)=>{
            state.search = action.payload
            state.isLoading_search = false
        })
        builder.addCase(postAsyncSearchAttributeVal.pending,(state)=>{
            state.search = false
            state.isLoading_search = true
        })
        builder.addCase(postAsyncSearchAttributeVal.rejected,(state,action)=>{
            state.search = action.payload
            state.isLoading_search = false
        })
        builder.addCase(postAsyncAddCategory.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddCategory.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddCategory.rejected,(state,action)=>{
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
        builder.addCase(deleteAsyncAttributeVal.fulfilled, (state, action) => {
            const deletedValue = action.payload?.result; // فرض می‌کنیم اینجا id/value حذف شده برمی‌گرده

            if (deletedValue !== undefined) {
                state.list_attribute_val.data = state.list_attribute_val.data.filter(
                    item => String(item.value) !== String(deletedValue)
                );
            }

            state.result_delete = action.payload;
            state.isLoading_action = false;
            state.isError = false;
        });
        builder.addCase(deleteAsyncAttributeVal.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
            state.isError = false
        })
        builder.addCase(deleteAsyncAttributeVal.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
            state.isError = true
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
export const { attributeValClearSearch,attributeValClearResult,categoryClearInfo,attributeValClearDelete} = AttributeValueSlice.actions

export default AttributeValueSlice.reducer