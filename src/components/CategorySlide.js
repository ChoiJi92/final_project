import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import beach from "../assests/css/해안가.png";
import land from "../assests/css/내륙2.png";
import town from "../assests/css/조용한마을2.png";
import trip from "../assests/css/관광지근처2.png";
import udo from "../assests/css/우도2.png";
import back from "../assests/css/배경1.png";
import back2 from "../assests/css/배경2.png";
import back3 from "../assests/css/배경3.png";
import back4 from "../assests/css/배경4.png";
import back5 from "../assests/css/배경5.png";
import back6 from "../assests/css/배경6.png";

const CategorySlide = (props) => {
  const [mouseOver, setMouseOver] = useState(false);
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onMouseLeave={mouseLeave}
        onMouseOver={mouseHover}
        className={className}
        style={{ ...style, display: "block", marginRight: "30px", opacity: 1 }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onMouseLeave={mouseLeave}
        onMouseOver={mouseHover}
        className={className}
        style={{
          ...style,
          display: "block",
          marginLeft: "25px",
          zIndex: 1,
          opacity: 1,
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // dots: true,
    arrows:mouseOver,
    variableWidth: true,
    responsive: [ // 반응형 웹 구현 옵션
		{  
			breakpoint: 960, //화면 사이즈 960px일 때
			settings: {
				//위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        arrows:mouseOver,
        variableWidth: true,

			} 
		},
		{ 
			breakpoint: 768, //화면 사이즈 768px일 때
			settings: {	
				//위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows:mouseOver,
        variableWidth: true,
			} 
		}
	],
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  const arrows = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const mouseHover = () => {
    setMouseOver(true);
  };
  const mouseLeave = () => {
    setMouseOver(false);
  };
  return (
    <ImgBox>
      <h2>Categories</h2>
      {mouseOver ? 
      <SliderImg {...settings} {...arrows}>
        <Wrap>
          <Card onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back})` }}>
            <img src={beach} alt="beach"></img>
            <p>해안가</p>
          </Card>
        </Wrap>
        <Wrap>
          <Card onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back2})` }}>
            <img src={land} alt="land"></img>
            <p>내륙</p>
          </Card>
        </Wrap>
        <Wrap>
          <Card onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back3})` }}>
            <img src={town} alt="town"></img>
            <p>조용한 마을</p>
          </Card>
        </Wrap>
        <Wrap>
          <Card onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back4})` }}>
            <img src={trip} alt="trip"></img>
            <p>관광지 근처</p>
          </Card>
        </Wrap>
        <Wrap>
          <Card  onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back6})` }}>
            <img src={udo} alt="udo"></img>
            <p>우도</p>
          </Card>
        </Wrap>
      </SliderImg>
      : <SliderImg {...settings}>
      <Wrap>
        <Card onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back})` }}>
          <img src={beach} alt="beach"></img>
          <p>해안가</p>
        </Card>
      </Wrap>
      <Wrap>
        <Card onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back2})` }}>
          <img src={land} alt="land"></img>
          <p>내륙</p>
        </Card>
      </Wrap>
      <Wrap>
        <Card onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back3})` }}>
          <img src={town} alt="town"></img>
          <p>조용한 마을</p>
        </Card>
      </Wrap>
      <Wrap>
        <Card onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back4})` }}>
          <img src={trip} alt="trip"></img>
          <p>관광지 근처</p>
        </Card>
      </Wrap>
      <Wrap>
        <Card onMouseLeave={mouseLeave} onMouseOver={mouseHover} style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back6})` }}>
          <img src={udo} alt="udo"></img>
          <p>우도</p>
        </Card>
      </Wrap>
    </SliderImg>}
    </ImgBox>
  );
};
const ImgBox = styled.div`
  width: 100%;
  height: 500px;
  margin: 100px 0;
  h2 {
    font-size: 56px;
    font-weight: 700;
    line-height: 61.6px;
  }
`;
const SliderImg = styled(Slider)`
width: 100%;
  /* height: 406px; */
  /* border: 1px solid; */
  .dots_custom {
    /* display: inline-block; */
    /* vertical-align: middle; */
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
`;
const Wrap = styled.div`
  width: 100%;
  margin-right: 20px;
  /* height: 300px; */
  
`;
const Card = styled.div`
  border-radius: 20px;
  margin-top: 30px;
  width: 321px;
  height: 406px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  cursor: pointer;
  :hover{
    box-shadow: rgb(0 0 0 / 50%) 0px 5px 10px 0px;
      transform: translateY(-10px);
  }
  img{
    width: 40%;
    margin-bottom: 20px;
  }
  p{
    font-size: 28px;
    font-weight: 700;
    line-height: 30.8px;
  }
`;
export default CategorySlide;
