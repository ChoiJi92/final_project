import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import back from "../assests/css/배경1.webp";
import back2 from "../assests/css/배경2.webp";
import back3 from "../assests/css/배경3.webp";
import back4 from "../assests/css/배경4.webp";
import back5 from "../assests/css/배경5.webp";
import back6 from "../assests/css/배경6.webp";
import { useNavigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

const OpenChatSlide = ({ rtl, data }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onMouseLeave={mouseLeave}
        onMouseOver={mouseHover}
        className={className}
        style={{ ...style, display: "block", marginRight: "25px", opacity: 1 }}
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
    slidesToShow: data.length >= 3 ? 3 : data.length,
    slidesToScroll: 1,
    // dots: true,
    // arrows: mouseOver,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 100,
    cssEase: "linear",
    pauseOnHover: true,
    rtl: rtl,
    arrows: false,
    variableWidth: true,
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 960, //화면 사이즈 960px일 때
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          // dots: true,
          // arrows: mouseOver,
          autoplay: true,
          speed: 5000,
          autoplaySpeed: 100,
          cssEase: "linear",
          pauseOnHover: true,
          rtl: rtl,
          arrows: false,
          variableWidth: true,
        },
      },
      {
        breakpoint: 768, //화면 사이즈 768px일 때
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          // dots: true,
          // arrows: mouseOver,
          autoplay: true,
          speed: 5000,
          autoplaySpeed: 100,
          cssEase: "linear",
          pauseOnHover: true,
          rtl: rtl,
          arrows: false,
          variableWidth: true,
        },
      },
      {
        breakpoint: 590, //화면 사이즈 768px일 때
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          // dots: true,
          // arrows: mouseOver,
          autoplay: true,
          speed: 5000,
          autoplaySpeed: 100,
          cssEase: "linear",
          pauseOnHover: true,
          rtl: rtl,
          arrows: false,
          variableWidth: true,
        },
      },
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
  const backList = [back, back2, back3, back4, back5, back6];
  const navigate = useNavigate();
  return (
    <>
      <MobileView>
        <MobileImgBox>
          <MobileSliderImg {...settings} {...arrows}>
            {data.length >= 1 &&
              data?.map((v, i) => (
                <MobileWrap key={v.roomId}>
                  <MobileCard
                    onClick={() => {
                      navigate(`/chatroom/${v.roomId}`);
                    }}
                    onMouseLeave={mouseLeave}
                    onMouseOver={mouseHover}
                    style={{
                      background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${backList[i]}) no-repeat center center`,
                      backgroundSize: "cover",
                    }}
                  >
                    <p>{v.title}</p>
                  </MobileCard>
                </MobileWrap>
              ))}
          </MobileSliderImg>
        </MobileImgBox>
      </MobileView>

      <BrowserView>
        <ImgBox>
          <SliderImg {...settings} {...arrows}>
            {data.length >= 1 &&
              data?.map((v, i) => (
                <Wrap key={v.roomId}>
                  <Card
                    onClick={() => {
                      navigate(`/chatroom/${v.roomId}`);
                    }}
                    onMouseLeave={mouseLeave}
                    onMouseOver={mouseHover}
                    style={{
                      background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${backList[i]}) no-repeat center center`,
                      backgroundSize: "cover",
                    }}
                  >
                    <p>{v.title}</p>
                  </Card>
                </Wrap>
              ))}
          </SliderImg>
        </ImgBox>
      </BrowserView>
    </>
  );
};
const ImgBox = styled.div`
  width: 100%;
  /* height: 300px; */
  margin: 10px auto 20px auto;
  display: flex;
  flex-wrap: nowrap;
  h2 {
    margin-bottom: 20px;
  }
`;
const SliderImg = styled(Slider)`
  width: 100%;
  height: 152px;
  .dots_custom {
    /* display: inline-block; */
    /* vertical-align: middle; */
    /* margin: auto 0; */
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
  margin-right: 30px;
  /* height: 300px; */
`;
const Card = styled.div`
  border-radius: 20px;
  width: 524px;
  height: 152px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
  cursor: pointer;
  img {
    width: 50%;
    margin-bottom: 20px;
  }
  p {
    font-size: large;
    font-weight: bold;
  }
`;

const MobileImgBox = styled.div`
  width: 100%;
  /* height: 300px; */
  margin: 10px auto 20px auto;
  display: flex;
  flex-wrap: nowrap;
  h2 {
    margin-bottom: 12px;
  }
`;
const MobileSliderImg = styled(Slider)`
  width: 100%;
  height: 35px;
  .dots_custom {
    /* display: inline-block; */
    /* vertical-align: middle; */
    /* margin: auto 0; */
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
const MobileWrap = styled.div`
  width: 100%;
  margin-right: 6.36px;
  /* height: 300px; */
`;
const MobileCard = styled.div`
  border-radius: 9.53704px;
  width: 160px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  background-blend-mode: multiply, normal;
  color: white;
  cursor: pointer;
  img {
    width: 50%;
    margin-bottom: 20px;
  }
  p {
    width: 80%;
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 110%;
  }
`;
export default OpenChatSlide;
