import React, { useState } from "react";
import styled from "styled-components";
import jeju1 from "../assests/css/jeju1.jpeg";
import jeju2 from "../assests/css/jeju2.jpeg";
import jeju7 from '../assests/css/제주1.jpeg';
import jeju8 from '../assests/css/제주2.jpeg';
import jeju9 from '../assests/css/제주3.jpg';
import jeju10 from '../assests/css/제주4.jpeg';
import jeju11 from '../assests/css/제주5.jpg';
import jeju12 from '../assests/css/제주6.jpeg';
import jeju13 from '../assests/css/제주8.jpeg';
import jeju14 from '../assests/css/제주9.jpeg';
import shareIcon2 from '../assests/css/shareIcon2.png';
import scrap from '../assests/css/scrap.png';
import {FaHeart,FaStar} from "react-icons/fa"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import SlideImg from "../components/SlideImg";
import DialogImg from "../components/DialogImg";
import Map from "../components/Map";

const HouseInfoDetail = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const { isLoading, data } = useQuery(
  //   "house",
  //   () => {
  //     return axios.get("http://localhost:5001/post").then((res) => res.data);
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // if (isLoading) {
  //   return "loading...";
  // }

  // console.log(data, isLoading);
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
  const hashList = [0,1,3,4,5]

  const MapRadius = '20px';
  return (
    <Wrap>
      <div id="detailMainBox">
        
        <ImgBox>
          {/* <SlideImg listImg={listImg} /> */}
          <ImgInnerBox1>
            <img src={jeju10} alt="이미지"/>
          </ImgInnerBox1>
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
          <HashMainBox>
            {hashList.map((item,idx)=>(
              <HashTagBox>#Hello</HashTagBox>
            ))}
          </HashMainBox>
          <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
            <div>
              <h1 style={{"fontSize": '48px'}}>해변 근처의 게스트하우스</h1>
            </div>
            <div style={{"display":"flex","alignItems":"center", "marginLeft":"170px","marginBottom":"25px"}}>
              <span style={{"fontSize": '21px'}}>공유하기</span>
              <IconImg  src={shareIcon2}/>
            </div>
            <div style={{"display":"flex","alignItems":"center","marginBottom":"25px"}}>
              <span style={{"fontSize": '21px'}}>저장하기</span>
              <IconImg src={scrap}/>
            </div>
          </div>
          <hr />
          <div style={{ margin: "30px 0px 30px 0px","fontSize": '18px' }}>
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
          <h1 style={{"marginTop":"20px","fontSize": "48px"}}>숙소 위치</h1>
          <MapBox>
            <Map MapRadius={MapRadius}/>
          </MapBox>
          <div style={{"marginBottom":"30px"}}>
            <h2 style={{"marginTop":"20px","fontSize": "32px"}}>제주도 어딘가, 어딘가</h2>
            <h2 style={{"fontSize": "32px", "opacity":"0.2"}}>제주도 어딘가, 조용한 마을</h2>
          </div>
          <hr />
          <ReviewMainBox>
              <div>
                <StarIcon/>
                <span>4.99</span>
                <span style={{"marginLeft":"10px"}}> 후기 00개</span>
              </div>
              <div>
                <span style={{"fontSize":"32px","textDecoration":"underline"}}>나도 후기 남기기</span>
              </div>
          </ReviewMainBox>
        </InfoBox>
        
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
  margin-top: 25px;
`;
const ImgInnerBox1 = styled.div`
    width: 73.5%;
    height: 600px;
    img{
        width: 100%;
        height: 550px;
        margin-top: 10px;
        border-radius:30px;
        
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
  width: 30%;
  height: 600px;
  img {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 265px;
    border-radius: 30px;
  }
  button {
    width: 8%;
    height: 46px;
    position: absolute;
    font-size: 18px;
    z-index: 1;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: #fff;
    top: 65%;
    right:17%;
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

const HashMainBox = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

const HashTagBox = styled.div`
  width: 173px;
  height: 45px;
  border-radius: 10px;
  background-color: #F2F2F7;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`

const IconImg = styled.img`
  width: 42px;
  height: 42px;
  margin-left: 10px;
  margin-bottom: 5px;
`

const MapBox = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const ReviewMainBox = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  span{
    font-size: 48px;
  }
`

const StarIcon = styled(FaStar)`
    font-size:35px;
    margin-right: 20px;
`

export default HouseInfoDetail;
