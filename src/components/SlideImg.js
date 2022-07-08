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
        dots:true,
        appendDots: (dots) => (
          <div
            style={{
              width: '100%',
              position: 'absolute',
              bottom: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ul> {dots} </ul>
          </div>
        ),
        dotsClass: 'dots_custom'
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
    height: 280px;
    margin-top: 15px;
    img{
        border-radius: 5px;
        width: 270px;
        height: 260px;      
    }
`

const SliderImg = styled(Slider)`
  
.dots_custom {
  display: inline-block;
  vertical-align: middle;
  margin: auto 0;
  padding: 0;
  
}

.dots_custom li {
  list-style: none;
  cursor: pointer;
  display: inline-block;
  margin: 0 6px;
  padding: 0;
  
}

.dots_custom li button {
  border: none;
  background: gray;
  color: transparent;
  cursor: pointer;
  display: block;
  height: 6px;
  width: 6px;
  border-radius: 100%;
  padding: 0;
  display: hidden;
}

.dots_custom li.slick-active button {
  background-color: #fff;
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

`