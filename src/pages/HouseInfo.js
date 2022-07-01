import React, { useEffect, useState } from "react";
import {FaHeart} from "react-icons/fa"
import styled from "styled-components";
import room2 from "../assests/css/room2.jpeg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNavigate } from "react-router-dom";
import { SampleNextArrow, settings } from "../components/Slide";

const HouseInfo = () => {
    const [isList, setIsList] = useState([]);

    const navigate = useNavigate();
    const list = [1,2,3,4,5,6,7,8,9]
    useEffect(()=>{
    
    setIsList(list)
    }, [])
    
    const onClick = (id) => {
        console.log(id);
        alert(id)
    }

    let slideSetting = settings;
    console.log(slideSetting.nextArrow)
    console.log(SampleNextArrow)
    
    const moveDetail = () => {
        navigate("/house/aaaa")
    }

    return(
        <MainBox>
            <ContentsBox>
                <ContentsList>
                    {isList.map((item, idx)=>{
                        return(
                        <ContentsListBox onClick={moveDetail} key={idx}>
                            <ImgBox >
                                <Slider {...slideSetting}>
                                    
                                <img src={room2} />
                                <img src={room2} />
                                <img src={room2} />
                                </Slider>
                            </ImgBox>
                            {/* <DesBox>
                                <h5>해변가에서의 한달살기</h5>
                                <span>한달살기의 조건에 관한 설명 ...</span>
                                <span>한달살기의 조건에 관한 설명 ...</span>
                            </DesBox>
                            <LikeBox>
                                <Icon onClick={()=>{onClick(isList[idx])}}/>
                            </LikeBox> */}

                            {/* <img src={room1} style={{"width" : "100px", "height":"100px"}}/>
                            <div style={{"display":"flex", "flexDirection" :"column","marginLeft":"10px"}}>
                                <h5>해변가에서의 한달살기</h5>
                                <span>한달살기의 조건에 관한 설명 ...</span>
                                <span>한달살기의 조건에 관한 설명 ...</span>
                            </div> */}
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
    width: 300px;
    height: 500px;
    overflow-y: auto;
    margin-right: 10px;
`

const ContentsList = styled.div`
    
   
`

const ContentsListBox = styled.div`
    width: 530px;
    height: 300px;  
    display: flex;
    border-bottom: 0.5px solid gray;
    align-items: center;
    justify-content: space-between;
    
`
const ImgBox = styled.div`
    width: 200px;
    height: 200px;
    img{
        border-radius: 5px;
        width: 200px;
        height: 200px;
    }
`
const DesBox = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    span{
        font-size: 5px;
    } */
    
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
