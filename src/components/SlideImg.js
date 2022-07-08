import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";

const SlideImg = (props) => {
  const [mouseOver, setMouseOver] = useState(false)
    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
          onMouseLeave={mouseLeave} onMouseOver={mouseHover}
            className={className}
            style={{ ...style, display: "block",marginRight:"25px", opacity:1}}
            onClick={onClick}
          />
        );
      };
      
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            onMouseLeave={mouseLeave} onMouseOver={mouseHover}
            className={className}
            style={{ ...style, display: "block", marginLeft:"25px", zIndex:1 ,opacity:1}}
            onClick={onClick}
          />
        );
      };
    
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots : true, 
    };

    const arrows = {
      nextArrow: <SampleNextArrow/>,
      prevArrow: <SamplePrevArrow/>,
    }
 
    const {listImg} = props;

    const params = useParams();
    const mouseHover = () => {
      setMouseOver(true)
    }
    const mouseLeave = () => {
      setMouseOver(false)
    } 
    return(
        <>
        {!params.id ? (
        <ImgBox >
          {mouseOver ? (
          <SliderImg {...settings} {...arrows}>
                {listImg.map((item, idx)=>{return(<img onMouseLeave={mouseLeave} onMouseOver={mouseHover} src={item}/>)})}
            </SliderImg>): (
            <SliderImg {...settings}>
                {listImg.map((item, idx)=>{return(<img onMouseLeave={mouseLeave} onMouseOver={mouseHover} src={item}/>)})}
            </SliderImg>)
            }
        </ImgBox>
    ) : 
    (
        <DetailImgBox >
            <SliderImg  {...settings}>
                {listImg.map((item, idx)=>{return(<img src={item}/>)})}
            </SliderImg>
        </DetailImgBox>)
        }
    </>
    );
};

export default SlideImg;



const ImgBox = styled.div`
    width: 55%;
    height: 290px;
    margin-top: 15px;
 
    img{
        border-radius: 5px;
        width: 270px;
        height: 260px;      
    }
`

const SliderImg = styled(Slider)`
  .slick-dots {
      bottom: -20px;
      color: #fff;
    }
  .slick-active button:before {
  opacity: .75;
  color: #ffffff;
}
  
`

const DetailImgBox = styled.div`
    position: relative;
    width: 60%;
    height: 500px;
    img{
        height: 400px;
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