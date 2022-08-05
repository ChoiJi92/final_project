import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import beach from "../assests/css/images/해안가.webp";
import land from "../assests/css/images/내륙2.webp";
import town from "../assests/css/images/조용한마을2.webp";
import tour from "../assests/css/images/관광지근처2.webp";
import icecream from "../assests/css/images/icecream2.webp";
import sunrise from "../assests/css/images/sunrise2.webp";
import prevIcon from "../assests/css/images/prevIcon.webp";
import nextIcon from "../assests/css/images/nextIcon.webp";
import back from "../assests/css/images/배경1.webp";
import back2 from "../assests/css/images/배경2.webp";
import back3 from "../assests/css/images/배경3.webp";
import back6 from "../assests/css/images/배경6.webp";
import back7 from "../assests/css/images/배경7.webp";
import back8 from "../assests/css/images/배경8.webp";
import { useNavigate } from "react-router-dom";

const CategorySlide = () => {
  const [mouseOver, setMouseOver] = useState(false);
  const navigate = useNavigate();
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onMouseLeave={mouseLeave}
        onMouseOver={mouseHover}
        className={className}
        style={{
          ...style,
          display: "block",
          marginRight: "-20px",
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background: `url(${nextIcon})`,
          backdropFilter: "blur(10px)",
        }}
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
          marginLeft: "-20px",
          width: "90px",
          height: "90px",
          background: `url(${prevIcon})`,
          borderRadius: "50%",
          zIndex: 1,
          opacity: 1,
          backdropFilter: "blur(10px)",
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
    arrows: mouseOver,
    variableWidth: true,
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1459, //화면 사이즈 960px일 때
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: mouseOver,
          variableWidth: true,
        },
      },
      {
        breakpoint: 768, //화면 사이즈 768px일 때
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: mouseOver,
          variableWidth: true,
        },
      },
    ],
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
          {mouseOver ? (
            <SliderImg {...settings} {...arrows}>
              <Wrap>
                <Card
                  onClick={() => {
                    navigate("/house", { state: { category: "all" } });
                  }}
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back7})`,
                  }}
                >
                  <img src={beach} alt="beach"></img>
                  <p>모두보기</p>
                </Card>
              </Wrap>
              <Wrap>
                <Card
                  onClick={() => {
                    navigate("/house", { state: { category: "내륙" } });
                  }}
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back3})`,
                  }}
                >
                  <img src={land} alt="land"></img>
                  <p>내륙</p>
                </Card>
              </Wrap>

              <Wrap>
                <Card
                  onClick={() => {
                    navigate("/house", { state: { category: "관광지근처" } });
                  }}
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back2})`,
                  }}
                >
                  <img src={tour} alt="tour"></img>
                  <p>관광지 근처</p>
                </Card>
              </Wrap>
              <Wrap>
                <Card
                  onClick={() => {
                    navigate("/house", { state: { category: "조용한마을" } });
                  }}
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back8})`,
                  }}
                >
                  <img src={town} alt="town"></img>
                  <p>조용한 마을</p>
                </Card>
              </Wrap>
              <Wrap>
                <Card
                  onClick={() => {
                    navigate("/house", { state: { category: "우도" } });
                  }}
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back6})`,
                  }}
                >
                  <img src={icecream} alt="icecream"></img>
                  <p>우도</p>
                </Card>
              </Wrap>
              <Wrap>
                <Card
                  onClick={() => {
                    navigate("/house", { state: { category: "해변근처" } });
                  }}
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back})`,
                  }}
                >
                  <img src={sunrise} alt="sunrise"></img>
                  <p>해변근처</p>
                </Card>
              </Wrap>
            </SliderImg>
          ) : (
            <SliderImg {...settings}>
              <Wrap>
                <Card
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back7})`,
                  }}
                >
                  <img src={beach} alt="beach"></img>
                  <p>모두보기</p>
                </Card>
              </Wrap>
              <Wrap>
                <Card
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back3})`,
                  }}
                >
                  <img src={land} alt="land"></img>
                  <p>내륙</p>
                </Card>
              </Wrap>
              <Wrap>
                <Card
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back2})`,
                  }}
                >
                  <img src={tour} alt="trip"></img>
                  <p>관광지 근처</p>
                </Card>
              </Wrap>
              <Wrap>
                <Card
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back8})`,
                  }}
                >
                  <img src={town} alt="town"></img>
                  <p>조용한 마을</p>
                </Card>
              </Wrap>
              <Wrap>
                <Card
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back6})`,
                  }}
                >
                  <img src={icecream} alt="icecream"></img>
                  <p>우도</p>
                </Card>
              </Wrap>
              <Wrap>
                <Card
                  onMouseLeave={mouseLeave}
                  onMouseOver={mouseHover}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${back})`,
                  }}
                >
                  <img src={sunrise} alt="sunrise"></img>
                  <p>해변근처</p>
                </Card>
              </Wrap>
            </SliderImg>
          )}
        </ImgBox>
  );
};
const ImgBox = styled.div`
  width: 100%;
  height: 500px;
  margin: 100px 0;
  .slick-prev:before {
    display: none;
  }
  .slick-next:before {
    display: none;
  }
  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 56px;
    line-height: 110%;
  }
`;
const SliderImg = styled(Slider)`
  width: 100%;
  height: auto;
`;
const Wrap = styled.div`
  width: 100%;
  margin-right: 20px;
`;
const Card = styled.div`
  border-radius: 20px;
  margin-top: 30px;
  width: 317px;
  height: 406px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-blend-mode: multiply, normal;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  color: white;
  cursor: pointer;
  :hover {
    box-shadow: rgb(0 0 0 / 50%) 0px 5px 10px 0px;
    transform: translateY(-10px);
  }
  img {
    width: 40%;
    margin-bottom: 20px;
  }
  p {
    font-size: 28px;
    font-weight: 700;
    line-height: 30.8px;
  }
`;

export default CategorySlide;
