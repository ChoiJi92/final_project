import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";

const SlideImg = (props) => {

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block",marginRight:"25px", opacity:0.7}}
            onClick={onClick}
          />
        );
      };
      
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", marginLeft:"25px", zIndex:1 ,opacity:0.7}}
            onClick={onClick}
          />
        );
      };
    
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow:true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    };
 
    const {listImg} = props;

    const params = useParams();
 
    return(
        <>
        {!params.id ? (
        <ImgBox>
            <Slider {...settings}>
                {listImg.map((item, idx)=>{return(<img src={item}/>)})}
            </Slider>
        </ImgBox>
    ) : 
    (
        <ImgInnerBox1>
            <Slider {...settings}>
                {listImg.map((item, idx)=>{return(<img src={item}/>)})}
            </Slider>
        </ImgInnerBox1>)
        }
    </>
    );
};

export default SlideImg;



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

const ImgInnerBox1 = styled.div`
    position: relative;
    width: 500px;
    height: 300px;
    img{
        width: 500px;
        height: 300px;
        margin-top: 10px;
    }
    /* .slick-prev:before {
    display: block;
    opacity: 1; // 기존에 숨어있던 화살표 버튼이 보이게
    color: black; // 버튼 색은 검은색으로
    left: 0;
    margin-right: -30px;
    z-index: 3;
  }
  .slick-next:before {
    display: block;
    opacity: 1;
    color: black;
    margin-left: -50px;
  } */
`