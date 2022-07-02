import React, { useEffect, useState } from "react";
import {FaHeart} from "react-icons/fa"
import styled from "styled-components";
import room2 from "../assests/css/room2.jpeg"
import room1 from "../assests/css/room1.jpeg"
import jeju1 from "../assests/css/jeju1.jpeg"
import jeju2 from "../assests/css/jeju2.jpeg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link, useNavigate } from "react-router-dom";
import { SampleNextArrow, settings } from "../components/Slide";
import HouseInfoImg from "../components/HouseInfoImg";

const HouseInfo = () => {
    const [isList, setIsList] = useState([]);

    const navigate = useNavigate();
    const list = [1,2,3,4,5,6,7,8,9]
    useEffect(()=>{  
    setIsList(list)
    }, [])
    const listImg = [room2, room1, jeju1, jeju2];
    const onClick = (id) => {
        console.log(id);
        alert(id)
    }

    let slideSetting = settings;
    console.log(slideSetting.nextArrow)
    console.log(SampleNextArrow)
    
    // const moveDetail = () => {
    //     navigate("/house/aaaa")
    // }
    console.log(listImg)
    return(
        <MainBox>
            <ContentsBox>
                <ContentsList>
                    {isList.map((item, idx)=>{
                        return(
                        <ContentsListBox key={idx}>
                            {/* <Link to={{pathname:"/house/dddd"}}> */}
                                <HouseInfoImg listImg={listImg}/>
                                {/* <Slider {...slideSetting}>
                                    
                                <img src={room2} />
                                <img src={room2} />
                                <img src={room2} />
                                </Slider> */}
                            
                            {/* </Link> */}
                            <DesBox>
                                <h3>해변가에서의 한달살기</h3>
                                <span>한달살기의 조건에 관한 설명 ...</span>
                                <span>한달살기의 조건에 관한 설명 ...</span>
                            </DesBox>
                            <LikeBox>
                                <Icon onClick={()=>{onClick(isList[idx])}}/>
                            </LikeBox>
                        </ContentsListBox>
                        )  
                    })}
                    
                </ContentsList>
            </ContentsBox> 
            <Map></Map>
        </MainBox>
    );
};
    

const Wrap = styled.div`

`

const MainBox = styled.div`
    display: flex;
    justify-content: space-between;
    justify-content: center;
    margin-top: 80px;
`

const Map = styled.div`
    width: 400px;
    height: 350px;
    border: 1px solid black;
` 
const ContentsBox = styled.div`
    width: 450px;
    height: 400px;
    overflow-y: auto;
    margin-right: 10px;
    
`

const ContentsList = styled.div`
    
    border: 1px solid black;
`

const ContentsListBox = styled.div`
    width: 530px;
    height: 300px;  
    display: flex;
    border-bottom: 0.5px solid gray;
    align-items: center;
    justify-content: space-between;
    
`
// const ImgBox = styled.div`
//     width: 200px;
//     height: 200px;
//     img{
//         border-radius: 5px;
//         width: 200px;
//         height: 200px;
//     }
// `
const DesBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
   
    margin-right: 35px;
    width: 350px;
    span{
        display: flex;
        margin-top: 2px;
        font-size: 5px; 
    }
    margin-bottom: 50px;
`
const LikeBox = styled.div`
    width: 80px;
  
    height: 100px;
    
`

const Icon = styled(FaHeart)`
    font-size: 12px;
    color: gray;
    margin-top: 90px;
    margin-left: 30px;
    cursor: pointer;
`
export default HouseInfo;
