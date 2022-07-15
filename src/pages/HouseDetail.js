import React, { useState } from "react";
import styled from "styled-components";
import room1 from "../assests/css/room1.jpeg";
import room2 from "../assests/css/room2.jpeg";
import jeju1 from "../assests/css/jeju1.jpeg";
import jeju2 from "../assests/css/jeju2.jpeg";
import jeju3 from "../assests/css/jeju3.jpeg";
import jeju4 from "../assests/css/jeju4.jpeg";
import jeju5 from "../assests/css/jeju5.jpeg";
import jeju6 from "../assests/css/jeju6.jpeg";
import jeju7 from '../assests/css/제주1.jpeg'
import jeju8 from '../assests/css/제주2.jpeg'
import jeju9 from '../assests/css/제주3.jpg'
import jeju10 from '../assests/css/제주4.jpeg'
import jeju11 from '../assests/css/제주5.jpg'
import jeju12 from '../assests/css/제주6.jpeg'
import jeju13 from '../assests/css/제주8.jpeg'
import jeju14 from '../assests/css/제주9.jpeg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import SlideImg from "../components/SlideImg";
import DialogImg from "../components/DialogImg";
import Map from "../components/Map";

const HouseInfoDetail = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isLoading, data } = useQuery(
    "house",
    () => {
      return axios.get("http://localhost:5001/post").then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return "loading...";
  }

  console.log(data, isLoading);
  // const slideSetting = useSelector((state)=>state);
  // const list = useSelector((state) => state.postSlice.contents);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };
  console.log(window.location.href);

  const listImg = [jeju7, jeju8, jeju9, jeju10, jeju11, jeju12,jeju13,jeju14];
  return (
    <Wrap>
      <div id="detailMainBox">
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
        <ImgBox>
          <SlideImg listImg={listImg} />
          <ImgInnerBox2>
            <img src={jeju1} alt="이미지"/>
            <img src={jeju2} alt="이미지"/>
            <button onClick={openDialog}>사진 모두보기</button>
            <DialogImg
              onClose={closeDialog}
              open={dialogOpen}
              listImg={listImg}
            />
          </ImgInnerBox2>
        </ImgBox>
        <InfoBox>
          <h1>해변 근처의 게스트하우스</h1>
          <hr />
          <div style={{ margin: "30px 0px 30px 0px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque quam consequat massa sit aliquam. Dignissim nibh at
            cras magna orci massa. Vehicula molestie facilisi eu, porta tempor
            magna quis eu aliquam. Eu sed risus dignissim sed eget. Accumsan,
            aliquam, urna id faucibus porttitor sagittis tristique tincidunt. Ac
            libero tristique risus et, dignissim. Congue risus sociis elementum,
            porta. Et justo mauris vehicula nulla ornare amet, gravida morbi.
            Massa, nulla duis imperdiet lorem viverra mattis facilisis fusce. Ac
            porta magna erat ut facilisis vel in donec ut. Sit phasellus
            malesuada viverra magna nec eget netus ultrices egestas. Nec dictum
            at dignissim fringilla vel. Senectus id lorem suscipit vehicula. Et
            aliquet arcu, tincidunt in justo posuere. Eu purus nibh ut ultrices
            pretium fermentum mi odio. Lorem massa elit morbi dolor. Orci tellus
            arcu, facilisis felis interdum.
          </div>
          <hr />
          <h1 style={{"marginTop":"20px"}}>숙소 위치</h1>
        </InfoBox>
        <MapBox>
          <Map/>
        </MapBox>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: auto;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  #detailMainBox {
    width: 70%;
    /* display: flex;
        justify-content: center;
        flex-direction: column; */
  }
`;

const ImgBox = styled.div`
  height: 400px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;
const ImgInnerBox1 = styled.div`
  position: relative;
  width: 500px;
  height: 300px;
  img {
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
`;

const ImgInnerBox2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 60%;
  height: 600px;
  img {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 265px;
    border-radius: 30px;
  }
  button {
    width: 90px;
    position: relative;
    font-size: 15px;
    left: 70%;
    top: -8%;
    opacity: 0.7;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: none;
  }
`;
const InfoBox = styled.div`
  width: 70%;
  height: auto;
  margin-top: 200px;
  h1{
    margin-bottom: 20px;
  }
`;
const MapBox = styled.div`
  width: 70%;
  height: 400px;
  border: 1px solid black;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

export default HouseInfoDetail;
