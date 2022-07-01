import { createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




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
        contents:[],
        // settings : {
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 1,
        //     slidesToScroll: 1,
        //     arrow:true,
        //     nextArrow: <SampleNextArrow/>,
        //     prevArrow: <SamplePrevArrow/>
        // },
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
        },
        
    },
        
});


export const {loadContents, postContents, updateContents} = postSlice.actions;
export default postSlice.reducer;