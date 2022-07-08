import React, { useEffect, useState } from "react";
import {FaHeart,FaStar} from "react-icons/fa"
import styled from "styled-components";
import room2 from "../assests/css/room2.jpeg"
import room1 from "../assests/css/room1.jpeg"
import jeju1 from "../assests/css/jeju1.jpeg"
import jeju2 from "../assests/css/jeju2.jpeg"
import jeju3 from "../assests/css/jeju3.jpeg"
import jeju4 from "../assests/css/jeju4.jpeg"
import jeju5 from "../assests/css/jeju5.jpeg"
import jeju6 from "../assests/css/jeju6.jpeg"
import { Link, useNavigate } from "react-router-dom";
import SlideImg from "../components/SlideImg";


const HouseInfo = () => {
    const [isList, setIsList] = useState([]);

    const navigate = useNavigate();
    const list = [1,2,3,4,5,6,7,8,9]
    const listImg = [room2, room1, jeju1, jeju2, jeju3, jeju4,jeju5,jeju6];
    useEffect(()=>{
    
    setIsList(list)
    }, [])
    
    const onClick = (id) => {
        console.log(id);
        alert(id)
    }

    return(
        <MainBox>
            <ContentsBox>
                    {isList.map((item, idx)=>{
                        return(
                        <ContentsListBox key={idx}>
                            <SlideImg listImg={listImg}/>
                            <DesBox>
                                <StyledLink style={{ textDecoration: 'none' }} to={`/house/${idx}`}>
                                <h3>해변근처의 게스트하우스ㅁㅁㅁ</h3>
                                </StyledLink>
                                <div id="infoHouse">
                                <span>한달살기의 조건에 관한 설명 ...한달살기의 조건에 관한 설명 ...
                                한달살기의 조건에 관한 설명 ...
                                </span>
                                
                                </div>
                                <span>000,000원 1박</span>
                                <LikeBox>
                                    
                                    <StarIcon/>
                                    
                                    
                                    <HeartIcon onClick={()=>{onClick(isList[idx])}}/>
                                    
                                </LikeBox>
                            </DesBox>
                            
                        </ContentsListBox>
                        )  
                    })}
            </ContentsBox> 
            <Map>
                지도 들어갈 예정
            </Map>
        </MainBox>
    );
};
    



const MainBox = styled.div`
    display: flex;
    width: 100%;
    margin-top: 30px;
`
const ContentsBox = styled.div`
    width: 40%;
    height: 700px;
    overflow-y: auto;
    border: 1px solid black;
    margin-left: 200px;
    display: flex;
    flex-direction: column;
`
const ContentsListBox = styled.div`
    height: 300px;  
    display: flex;
    border-bottom: 0.5px solid gray;
    
`
const DesBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    width: 35%;
    height: 270px;
    margin-left: 20px;
    margin-top: 15px;
    h3{

    }
    span{
        margin-bottom: 30px;
    }
    #infoHouse{
        height: 200px;
        display: flex;
        align-items: center;
        margin-top: 25px;
    }
`
const LikeBox = styled.div`
    display:flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    margin-top: 10px;
`

const HeartIcon = styled(FaHeart)`
    color: gray;
    cursor: pointer;
    margin-top: -5px;
`
const StarIcon = styled(FaStar)`
    margin-top: -5px;
`



const Map = styled.div`
    width: 50%;
    height: 500px;
    border: 1px solid black;
    margin-right: 5px;
    display: flex ;
    justify-content: center;
    align-items: center;
` 


const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
    }
    :hover{
        color: #3498db;
    }
`;


export default HouseInfo;
