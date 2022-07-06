import React from "react";
import styled from "styled-components";
import room1 from "../assests/css/room1.jpeg"
import room2 from "../assests/css/room2.jpeg"
import jeju1 from "../assests/css/jeju1.jpeg"
import jeju2 from "../assests/css/jeju2.jpeg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import SlideImg from "../components/SlideImg";



const HouseInfoDetail = () => {
    const { isLoading, data,  } = useQuery("house", () => {
        return axios.get("http://localhost:5001/post").then((res) =>
            res.data
        )
    },
    {
        refetchOnWindowFocus: false 
    })

    if (isLoading) {
        return "loading..."
    }
    
    console.log(data, isLoading)
    // const slideSetting = useSelector((state)=>state);
    // const list = useSelector((state) => state.postSlice.contents);
    const listImg = [room2, room1, jeju1, jeju2];
    return (
        <Wrap>
            <div id="detailMainBox">
                <div>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <ImgBox>
                    <SlideImg listImg={listImg}  />
                    <ImgInnerBox2>
                        <img src={jeju1} />
                        <img src={jeju2} />
                        <button>사진 더보기</button>
                    </ImgInnerBox2>
                </ImgBox>
            <InfoBox>
                <h2>해변 근처의 게스트하우스</h2>
                <hr />
                <div style={{ "margin": "10px 0px 10px 0px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quam consequat massa sit aliquam. Dignissim nibh at cras magna orci massa. Vehicula molestie facilisi eu, porta tempor magna quis eu aliquam. Eu sed risus dignissim sed eget. Accumsan, aliquam, urna id faucibus porttitor sagittis tristique tincidunt. Ac libero tristique risus et, dignissim. Congue risus sociis elementum, porta. Et justo mauris vehicula nulla ornare amet, gravida morbi. Massa, nulla duis imperdiet lorem viverra mattis facilisis fusce. Ac porta magna erat ut facilisis vel in donec ut. Sit phasellus malesuada viverra magna nec eget netus ultrices egestas. Nec dictum at dignissim fringilla vel. Senectus id lorem suscipit vehicula. Et aliquet arcu, tincidunt in justo posuere. Eu purus nibh ut ultrices pretium fermentum mi odio. Lorem massa elit morbi dolor. Orci tellus arcu, facilisis felis interdum.</div>
                <hr />
                <h2>숙소 위치</h2>
            </InfoBox>
            <MapBox>맵 들어갈 예정</MapBox>
            </div>
        </Wrap>
    )
}

const Wrap = styled.div`
    height: auto;
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    #detailMainBox{
        width: 70%;
        border: 1px solid black;
        /* display: flex;
        justify-content: center;
        flex-direction: column; */
    }
`

const ImgBox = styled.div`
    height: 320px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    
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

const ImgInnerBox2 = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 50%;
    img{
       margin-top: 10px;
       width: 100%;
       height: 195px;
    }
    button{
        width: 20%;
        position: relative;
        font-size: 20px;
        left: 75%;
        top:-10%;
        opacity: 0.7;
        cursor: pointer;
    }
`
const InfoBox = styled.div`
    width: 60%;
    height: auto;
    margin-top: 120px;
`
const MapBox = styled.div`
    width: 60%;
    height: 400px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default HouseInfoDetail;