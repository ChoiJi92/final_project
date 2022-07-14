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
import inside from "../assests/css/내륙.png";
import nearby from "../assests/css/관광지근처.png";
import nearbySea from "../assests/css/해변근처.png";
import quietVil from "../assests/css/조용한마을.png";
import { Link, useNavigate } from "react-router-dom";
import SlideImg from "../components/SlideImg";
import Map from "../components/Map";


const HouseInfo = () => {
    const [isList, setIsList] = useState([]);
    const [leftPosition, setLeftPosition] = useState("");
    const [rigthPosition, setRigthPosition] = useState("");
    const [fleftPosition, setFLeftPosition] = useState("");
    const [frigthPosition, setFRigthPosition] = useState("");

    const [secondPosition, setSecondPosition] = useState("");
    const [sRigthPosition, setSRigthPosition] = useState("");
    const [sFleftPosition, setSFLeftPosition] = useState("");
    const [sFrigthPosition, setSFRigthPosition] = useState("");

    const [firstUnderbar, setFirstUnderbar] = useState(false);
    const [secondUnderbar, setSecondtUnderbar] = useState(false);

    const liveUnderlineRef = useRef(null);
    const spotUnderlineRef = useRef(null); 
    const firstBox = useRef(null);
    const liveFirstBox = useRef(null);

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
        autoSpotClick();
        autoLiveClick();
    },[])
    const autoSpotClick = () => {
        spotUnderlineRef.current.style.left = firstBox.current.offsetLeft+"px"
        spotUnderlineRef.current.style.width = firstBox.current.offsetWidth+"px";
        setFLeftPosition(firstBox.current.offsetLeft+"px");
        setFRigthPosition(firstBox.current.offsetWidth+"px");
    }
    // 클릭시 메뉴 언더바 이동
    const menuOnClick = (e) => {
        spotUnderlineRef.current.style.left = e.currentTarget.offsetLeft+"px";
        spotUnderlineRef.current.style.width = e.currentTarget.offsetWidth+"px";
        setLeftPosition(e.currentTarget.offsetLeft+"px");
        setRigthPosition(e.currentTarget.offsetWidth+"px");
        setFirstUnderbar(true);
    }

    //마우스 올릴시 메뉴 언더바 이동
    const menuOnOver = (e) => {
        spotUnderlineRef.current.style.left = e.currentTarget.offsetLeft+"px";
        spotUnderlineRef.current.style.width = e.currentTarget.offsetWidth+"px";
    }
    //마우스 나오면 기존 클릭되어있던 position으로 이동
    const menuLeave = () => {
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
    const autoLiveClick = () => {
        liveUnderlineRef.current.style.left = liveFirstBox.current.offsetLeft+"px"
        liveUnderlineRef.current.style.width = liveFirstBox.current.offsetWidth+"px";
        setSFLeftPosition(liveFirstBox.current.offsetLeft+"px");
        setSFRigthPosition(liveFirstBox.current.offsetWidth+"px");
    }

    const liveOnLeave = () => {
        if(secondUnderbar === true){
            liveUnderlineRef.current.style.left = secondPosition;
            liveUnderlineRef.current.style.width = sRigthPosition;
        }else{
            liveUnderlineRef.current.style.left = sFleftPosition;
            liveUnderlineRef.current.style.width = sFrigthPosition;
        }  
    }
    const liveOnOver = (e) => {
        liveUnderlineRef.current.style.left = e.currentTarget.offsetLeft+"px";
        liveUnderlineRef.current.style.width = e.currentTarget.offsetWidth+"px";
    }
    const liveOnClick = (e) => {
        liveUnderlineRef.current.style.left = e.currentTarget.offsetLeft+"px";
        liveUnderlineRef.current.style.width = e.currentTarget.offsetWidth+"px";
        setSecondPosition(e.currentTarget.offsetLeft+"px");
        setSRigthPosition(e.currentTarget.offsetWidth+"px");
        setSecondtUnderbar(true);
    }
    return(
        <MainBox>
            <LiveMainBox>
                <div ref={liveFirstBox} onMouseLeave={liveOnLeave} onMouseOver={liveOnOver} onClick={liveOnClick} id="live" >
                    <p>편하게 한달 살기</p>
                </div>
                <div style={{}} onMouseLeave={liveOnLeave} onMouseOver={liveOnOver} onClick={liveOnClick} id="live1">
                    <p style={{}}>최소비용으로 한달 살기</p>
                </div>
                <LiveUnderBar ref={liveUnderlineRef} />
            </LiveMainBox>
            <SpotMainBox>
                
                <div ref={firstBox} onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick}  id="spot">
                    <SpotMiniBox>
                        <img src={nearbySea}/>
                    </SpotMiniBox>
                    <span>해변</span>
                    <SpotUnderBar ref={spotUnderlineRef}/>
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick}  id="spot">
                    <SpotMiniBox>
                        <img src={inside}/>
                    </SpotMiniBox>
                    <span>내륙</span>
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick} id="spot">
                    <SpotMiniBox>
                        <img src={nearby}/>
                    </SpotMiniBox>
                    <span >관광지 근처</span>
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick} id="spot">
                    <SpotMiniBox>
                        <img src={quietVil}/>
                    </SpotMiniBox>
                    <span>조용한 마을</span>
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick} id="spot">
                    <SpotMiniBox/>
                    <span>우도</span>
                </div>
                <div onMouseLeave={menuLeave} onMouseOver={menuOnOver} onClick={menuOnClick} id="spot">
                    <SpotMiniBox/>
                    <span >성산일출봉</span>
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
                <div id="houseCount">{isList.length} 개의 숙소</div>
                    {isList.map((item, idx)=>{
                        return(
                        <div id="testBox">
                        <ContentsListBox key={idx}>
                            <SlideImg listImg={listImg}/>
                            <DesBox>
                                <StyledLink to={`/house/${idx}`}>
                                <h3>해변근처의 게스트하우스ㅁㅁㅁ</h3>
                                </StyledLink>
                                <div id="infoHouse">
                                <span>한달살기의 조건에 관한 설명 ...한달살기의 조건에 관한 설명 ...한달살기의 조건에 관한 설명 ...
                                </span>
                                
                                </div>
                                <span>000,000원 1박</span>
                                <LikeBox>
                                    
                                    <StarIcon/>
                                    <HeartIcon onClick={()=>{onClick(isList[idx])}}/>
                                    
                                </LikeBox>
                            </DesBox>
                            
                        </ContentsListBox>
                        </div>
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
    padding: 0px 215px;
    #spot{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 7%;
        margin-top: 10px;
    }
    span{
        margin-top: 3px;
        font-size: 80%;
    }
`
const SpotUnderBar = styled.div`
    position: absolute;
    height: 4px;
    background-color: #bdc3c7;
    transition: 0.5s;
    top: 245px;
    /* left: 
    width: 152px; */
`

const LiveUnderBar = styled.div`
    position: absolute;
    height: 4px;
    transition: 0.5s;
    top:146px;
    background-color: #bdc3c7;
`

const SpotMiniBox = styled.div`
    width: 50px;
    height: 50px;
    border: 1px solid black;
    img{
        width: 100%;
        height: 50px;
    }
`

const LiveMainBox = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    padding: 0px 200px;
    align-items: center;
    div{
        cursor: pointer;
    }
        p{
            font-size: 20px;
        }
    #live1{
        margin-left: 40px;
    }
`

const ContentsBox = styled.div`
    width: 40%;
    height: 70vh;
    overflow-y: auto;
    margin-left: 190px;
    display: flex;
    flex-direction: column;
    #testBox{
        margin-right: 10px;
    }
    #houseCount{
        margin: 15px 0px 5px 15px;
    }
`
const OrderingBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-left: 10px;
    div{
        width: 18%;
        height: 30px;
        border: 1px solid black;
        margin: 0px 15px 0px 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        font-size: 15px;
    }
`

const ContentsListBox = styled.div`
    height: 220px;  
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 30px;
    margin-top: 10px;
    width: 99%;
    margin: 10px 10px 2px 10px;
    align-items: center;
    padding: 10px;
`
const DesBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    width: 100%;
    height: 180px;
    margin-left: 15px;
    h3{
 
    }
    span{

        margin-bottom: 10px;
    }
    #infoHouse{
        height: 200px;
        display: flex;
        align-items: center;
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

`
const StarIcon = styled(FaStar)`

`

const MapBox = styled.div`
    width: 50%;
    height: 545px;
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


// {isList.slice(0,4).map((item, idx)=>(
//     <ContentsListBox ref={contentsBox} key={idx}>
//         <SlideImg listImg={listImg}/>
//         <DesBox>
//             <StyledLink to={`/house/${idx}`}>
//             <h3>해변근처의 게스트하우스ㅁㅁㅁ</h3>
//             </StyledLink>
//             <div id="infoHouse">
//             <span>한달살기의 조건에 관한 설명 ...한달살기의 조건에 관한 설명 ...
//             한달살기의 조건에 관한 설명 ...
//             </span>
//             </div>
//             <span>000,000원 1박</span>
//             <LikeBox>
//                 <StarIcon/>
//                 <HeartIcon onClick={()=>{onClick(isList[idx])}}/>
//             </LikeBox>
//         </DesBox>
//     </ContentsListBox>
// )   
// )}
// {/* <AdContentsBox>
//     <div><span>이런 숙소는 어때요?</span></div>
//     <div id="adImg">
//         <img src={jeju1}/>
//         <img src={jeju2}/>
//         <img src={jeju3}/>

//     </div>
// </AdContentsBox> */}
// {isList.slice(5).map((item, idx)=>(
//     <ContentsListBox ref={contentsBox} key={idx}>
//     <SlideImg listImg={listImg}/>
//     <DesBox>
//         <StyledLink to={`/house/${idx}`}>
//         <h3>해변근처의 게스트하우스ㅁㅁㅁ</h3>
//         </StyledLink>
//         <div id="infoHouse">
//         <span>한달살기의 조건에 관한 설명 ...한달살기의 조건에 관한 설명 ...
//         한달살기의 조건에 관한 설명 ...
//         </span>
//         </div>
//         <span>000,000원 1박</span>
//         <LikeBox>
//             <StarIcon/>
//             <HeartIcon onClick={()=>{onClick(isList[idx])}}/>
//         </LikeBox>
//     </DesBox>
// </ContentsListBox>
// ))}
// </ContentsBox>
