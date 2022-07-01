import React from "react";
import styled from "styled-components";
import room2 from "../assests/css/room2.jpeg"
import jeju1 from "../assests/css/jeju1.jpeg"
import jeju2 from "../assests/css/jeju2.jpeg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";
import { useSelector } from "react-redux";
import { settings } from "../components/Slide";



const HouseDetail = () => {
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
    const slideSetting = settings;
    // const list = useSelector((state) => state.postSlice.contents);
    return (
        <Wrap>
            <div>
                <button>수정</button>
                <button>삭제</button>
            </div>
            <ImgBox>
                <ImgInnerBox1>
                    <Slider {...slideSetting}>
                        
                            <Img src={room2} />
                            <Img src={room2} />
                            
                        {/* <div>
                            <Img src={room2} />
                        </div> */}
                    </Slider>
                </ImgInnerBox1>
                {/* <ImgInnerBox1>
                <img src={room2}/>
            </ImgInnerBox1> */}
                <ImgInnerBox2>
                    <img src={jeju1} />
                    <img src={jeju2} />
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
            
        </Wrap>
    )
}

const Wrap = styled.div`
    height: auto;
    margin: auto;
    width: 800px;
   
  
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
    img{
       margin-top: 10px;
       width: 300px;
       height: 145px;
    }
`
const Img = styled.img`
    width: 500px;
    height: 300px;
    margin-top: 10px;
    
`

const InfoBox = styled.div`
    width: 500px;
    height: auto;
`
const MapBox = styled.div`
    width: 500px;
    height: 200px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default HouseDetail;