import React from "react";
import styled from "styled-components";
import { settings } from "./Slide";
import Slider from "react-slick";
const HouseInfoImg = (props) => {
    // console.log(props.listImg);
    const {listImg} = props;
    let slideSetting = settings;
    console.log(listImg)
    return(
    <ImgBox>
        <Slider {...slideSetting}>
            {listImg.map((item, idx)=>{return(<img src={item}/>)})}
        </Slider>
    </ImgBox>
    );
};

export default HouseInfoImg;



const ImgBox = styled.div`
    width: 250px;
    height: 200px;
   
    img{
        border-radius: 5px;
        width: 200px;
        height: 200px;
        object-fit: contain;
    }
`