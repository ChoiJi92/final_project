import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import back from "../assests/css/images/배경1.webp";
import back2 from "../assests/css/images/배경2.webp";
import back3 from "../assests/css/images/배경3.webp";
import back4 from "../assests/css/images/배경4.webp";
import back5 from "../assests/css/images/배경5.webp";
import back6 from "../assests/css/images/배경6.webp";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

const OpenChatSlide = ({ rtl, data }) => {
  const userId =sessionStorage.getItem('userId')
  const [open, setOpen]=useState(false)
  
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: data.length >= 3 ? 3 : data.length,
    slidesToScroll: 1,
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
  };


  const backList = [back, back2, back3, back4, back5, back6];
  const navigate = useNavigate();
  return (
        <ImgBox>
          <SliderImg {...settings}>
            {data.length >= 1 &&
              data?.map((v, i) => (
                <Wrap key={v.roomId}>
                  <Card
                    onClick={() => {
                      if(userId){
                      navigate(`/chatroom/${v.roomId}`);
                      }else(
                        setOpen(true)
                      )
                    }}
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
          <LoginModal open={open} setOpen={setOpen}/>
        </ImgBox>
  );
};
const ImgBox = styled.div`
  width: 100%;
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
`;
const Wrap = styled.div`
  width: 100%;
  margin-right: 30px;
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


export default OpenChatSlide;
