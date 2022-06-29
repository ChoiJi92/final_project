import { createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const postContentsDB = (data) => {
    return function (dispatch) {
        axios.post("http://localhost:5001/post", data)
        .then((res)=>{
            console.log(res, "post data")
            dispatch(postContents(data))
        })
        .catch((error)=>{
            console.log(error)
        })
    };
};

export const loadContentsDB = () => {
    return function (dispatch) {
        axios.get("http://localhost:5001/post")
        .then((res)=>{
            console.log(res, "get data")
            dispatch(loadContents(res.data))
        })
    }
};

export const deleteContentsDB = (id) => {
    return function (dispatch) {
        axios.delete(`http://localhost:5001/pos${id}`)
    }
}

export const updateContentsDB = (data, id) => {
    return function (dispatch) {
        axios.put(`http://localhost:5001/pos${id}`, data)
        .then((res)=>{
            console.log(res)
            dispatch(updateContents(res.data))
        }).catch((error)=>{
            console.log(error)
        })
    }
}

const postSlice = createSlice({
    name:"contents",
    initialState:{
        contents:[]
    },
    reducers:{
        loadContents(state, action){
            state.contents = action.payload;
        },
        postContents(state, action){
            state.contents.push(action.payload);
        },
        updateContents(state, action){
            const idx = state.contents.findIndex((v)=> v.id === action.payload.id)
        }
    },
        
});


export const {loadContents, postContents, updateContents} = postSlice.actions;
export default postSlice.reducer;