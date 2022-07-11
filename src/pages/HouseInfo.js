import React, { useEffect, useRef, useState } from "react";
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
import Map from "../components/Map";


const HouseInfo = () => {
    const [isList, setIsList] = useState([]);
    const [leftPosition, setLeftPosition] = useState("");
    const [rigthPosition, setRigthPosition] = useState("");
    const [fleftPosition, setFLeftPosition] = useState("");
    const [frigthPosition, setFRigthPosition] = useState("");
    const [firstUnderbar, setFirstUnderbar] = useState(false);
    const liveUnderlineRef = useRef(null)
    const spotUnderlineRef = useRef(null)
    const firstBox = useRef(null)

    const list = [1,2,3,4,5,6,7,8,9]
    const listImg = [room2, room1, jeju1, jeju2, jeju3, jeju4,jeju5,jeju6];
    useEffect(()=>{
    
    setIsList(list)
    }, [])
    
    const onClick = (id) => {
        console.log(id);
        alert(id)
    }
  
    useEffect(()=>{
        autoClick();
    },[])
    const autoClick = () => {
        spotUnderlineRef.current.style.left = firstBox.current.offsetLeft+"px"
        spotUnderlineRef.current.style.width = firstBox.current.offsetWidth+"px";
        setFLeftPosition(firstBox.current.offsetLeft+"px");
        setFRigthPosition(firstBox.current.offsetWidth+"px");
    }
    // 클릭시 메뉴 언더바 이동
    const menuOnClick = (e) => {
        spotUnderlineRef.current.style.left = e.currentTarget.offsetLeft+"px";
        spotUnderlineRef.current.style.width = e.currentTarget.offsetWidth+"px";
        // liveUnderlineRef.current.style.left = e.currentTarget.offsetLeft+"px"
        // liveUnderlineRef.current.style.width = e.currentTarget.offsetWidth+"px"
        setLeftPosition(e.currentTarget.offsetLeft+"px");
        setRigthPosition(e.currentTarget.offsetWidth+"px");
        setFirstUnderbar(true);
    }

    //마우스 올릴시 메뉴 언더바 이동
    const menuOnOver = (e) => {
        // spotUnderlineRef.current.style.left =firstBox.current.offsetLeft+"px"
        // spotUnderlineRef.current.style.width = firstBox.current.offsetWidth+"px";
        spotUnderlineRef.current.style.left = e.currentTarget.offsetLeft+"px";
        spotUnderlineRef.current.style.width = e.currentTarget.offsetWidth+"px";
        // liveUnderlineRef.current.style.left = e.currentTarget.offsetLeft+"px"
        // liveUnderlineRef.current.style.width = e.currentTarget.offsetWidth+"px"

    }
    //마우스 나오면 기존 클릭되어있던 position으로 이동
    const menuLeave = () => {
        
        // spotUnderlineRef.current.style.left =firstBox.current.offsetLeft+"px"
        // spotUnderlineRef.current.style.width = firstBox.current.offsetWidth+"px";
        if(firstUnderbar === true){
            spotUnderlineRef.current.style.left = leftPosition;
            spotUnderlineRef.current.style.width = rigthPosition;
        }else{
            spotUnderlineRef.current.style.left = fleftPosition;
            spotUnderlineRef.current.style.width = frigthPosition;
        }  
    }
    
    // const isInfo = window.location.href.slice(22,27);
    // console.log(isInfo);
    // const isInfo = "500px";
    
    return(
        <MainBox>
            <LiveMainBox>
                <div >
                    <p>편하게 한달 살기</p>
                </div>
                <div >
                    <p style={{"marginLeft":"50px"}}>최소비용으로 한달 살기</p>
                </div>
                <LiveUnderBar />
            </LiveMainBox>
            <SpotMainBox>
                
                <div ref={firstBox} onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick}  id="spot">
                
                    <SpotMiniBox />
                    {/* <div id="defaultLine" /> */}
                    <span style={{"marginTop":"5px"}}>hello</span>
                    
                    <SpotUnderBar ref={spotUnderlineRef}/>
                    
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick}  id="spot">
                    <SpotMiniBox />
                    <span style={{"marginTop":"5px"}}>hello</span>
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick} id="spot">
                    <SpotMiniBox/>
                    <span style={{"marginTop":"5px"}}>hello</span>
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick} id="spot">
                    <SpotMiniBox/>
                    <span style={{"marginTop":"5px"}}>hello</span>
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick} id="spot">
                    <SpotMiniBox/>
                    <span style={{"marginTop":"5px"}}>hello</span>
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick} id="spot">
                    <SpotMiniBox/>
                    <span style={{"marginTop":"5px"}}>hello</span>
                </div>
            </SpotMainBox>
      
            <div id="contentsMapBox">
            <ContentsBox>
                <OrderingBox>
                    <div>날짜</div>
                    <div>인원</div>
                    <div>위치별</div>
                    <div>추천순</div>
                </OrderingBox>
                    {isList.map((item, idx)=>{
                        return(
                        <ContentsListBox key={idx}>
                            <SlideImg listImg={listImg}/>
                            <DesBox>
                                <StyledLink to={`/house/${idx}`}>
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
            <MapBox>
               <Map isinfo={true}/>
            </MapBox>
            </div>
        </MainBox>
    );
};
    



const MainBox = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;

    #contentsMapBox{
        display:flex;
    }
`

const SpotMainBox = styled.div`
    width: 100%;
    height: 100px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 200px;
    #spot{
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        width: 10%;
        border: 1px solid red;
    }
`
const SpotUnderBar = styled.div`
    position: absolute;
   
    height: 5px;
    background-color: red;
    transition: 0.5s;
    top: 244px;
    /* left: 
    width: 152px; */
`

const LiveUnderBar = styled.div`
    position: absolute;
    width: 7.5%;
    height: 5px;
    transition: 0.5s;
    top:145px;
`

const SpotMiniBox = styled.div`
    width: 50px;
    height: 50px;
    border: 1px solid black;
`

const LiveMainBox = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    padding: 0px 200px;
    align-items: center;
    div{
        p{
            font-size: 20px;
        }
    }
`

const ContentsBox = styled.div`
    width: 40%;
    height: 72vh;
    overflow-y: auto;
    margin-left: 200px;
    display: flex;
    flex-direction: column;
`
const OrderingBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    div{
        width: 13%;
        height: 30px;
        border: 1px solid black;
        margin: 0px 15px 0px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        font-size: 15px;
    }
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
    margin-top: -25px;
`
const StarIcon = styled(FaStar)`
    margin-top: -25px;
`

const MapBox = styled.div`
    width: 50%;
    height: 550px;
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
