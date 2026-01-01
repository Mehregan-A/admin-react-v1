import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from "../../services/services.jsx";

export const getAsyncListSlider = createAsyncThunk("slider/getAsyncListSlider",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.get(`admin/slider/list/${payload.row}/${payload.page}`,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const putAsyncEditSlider = createAsyncThunk("slider/putAsyncEditSlider", async (payload, { rejectWithValue }) => {
    try {
        const res = await http.put(`/admin/slider/update/${payload.id}`, payload, {});
        return res;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
});
export const postAsyncAddSlider = createAsyncThunk("slider/postAsyncAddSlider",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post("/admin/slider/add",payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncStatusSlider = createAsyncThunk("slider/getAsyncStatusSlider",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.post(`/admin/slider/status/change/${payload.Id}`,payload,{})
        return await res
    }catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteAsyncSlider = createAsyncThunk("slider/deleteAsyncSlider",async (payload,{rejectWithValue})=>{
    try {
        const res = await http.delete(`/admin/slider/delete/${payload.del}`,{})
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
    list_slider:[],
    usersData: {},
    result : false,
    isLoading: false,
    isError: false,
}

const SliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers : {
        sliderClearResult : (state) => {
            state.result = false
        },
        sliderClearResultDelete : (state) => {
            state.result_delete = false
        },
        sliderClearInfo : (state) => {
            state.info_edit = false
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAsyncListSlider.fulfilled,(state, action)=>{
            state.list_slider = action.payload.data.result
            state.isLoading_list = false
            state.isError_list = false
        })
        builder.addCase(getAsyncListSlider.pending,(state)=>{
            state.list_slider = false
            state.isLoading_list = true
            state.isError_list = false
        })
        builder.addCase(getAsyncListSlider.rejected,(state,action)=>{
            state.list_slider = action.payload
            state.isLoading_list = false
            state.isError_list = true
        })
        builder.addCase(putAsyncEditSlider.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(putAsyncEditSlider.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(putAsyncEditSlider.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddSlider.fulfilled,(state, action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(postAsyncAddSlider.pending,(state)=>{
            state.result = false
            state.isLoading = true
        })
        builder.addCase(postAsyncAddSlider.rejected,(state,action)=>{
            state.result = action.payload
            state.isLoading = false
        })
        builder.addCase(getAsyncStatusSlider.fulfilled,(state, action)=>{
            const result = state.list_slider.data.find(val => val.id == action.payload.data.result.id)
            result.status = action.payload.data.result.status
            state.isError = false
            state.isLoading_action = false
        })
        builder.addCase(getAsyncStatusSlider.pending,(state)=>{
            state.result = false
            state.isError = false
            state.isLoading_action = true
        })
        builder.addCase(getAsyncStatusSlider.rejected,(state,action)=>{
            state.result = action.payload
            state.isError = true
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncSlider.fulfilled,(state, action)=>{
            state.list_slider.data = state.list_slider.data.filter(
                driver => driver.id !== Number(action.payload.data.result)
            );
            state.result_delete = action.payload
            state.isLoading_action = false
        })
        builder.addCase(deleteAsyncSlider.pending,(state)=>{
            state.result_delete = false
            state.isLoading_action = true
        })
        builder.addCase(deleteAsyncSlider.rejected,(state,action)=>{
            state.result_delete = action.payload
            state.isLoading_action = false
        })
    }
})
export const { sliderClearResult,sliderClearInfo,sliderClearResultDelete} = SliderSlice.actions

export default SliderSlice.reducer