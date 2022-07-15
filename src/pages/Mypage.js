import React, { useEffect, useState } from 'react';
import jeju1 from "../assests/css/jeju1.jpeg"
import styled from 'styled-components';
import {FaChevronDown, FaChevronUp,FaStar,FaRegHeart,FaRegComment} from "react-icons/fa";


const Mypage = () => {
    const [isList, setIsList] = useState([]);
    const [myLike, setMyLike] = useState(true);
    const [myWrite, setMyWrite] = useState(true);
    const nickName = localStorage.getItem("nickName");
    const userImage = localStorage.getItem("userImage");
    const list = [1,2,3,4,5,6,7,8,9,10]
    
    useEffect(()=>{
    
        setIsList(list)
    }, [])

    const likeClick = () => {
        setMyLike((prev)=>!prev);
    };
    const writeClick = () => {
        setMyWrite((prev)=>!prev);
    };
    
    return (
        <MainBox>
            <ProfilBox>
                <div style={{"display":"flex","alignItems":"center"}}>
                    <img src={userImage} style={{"width":"75px","height":"75px","borderRadius":"50%"}}/>
                    <div id="profile">
                        <h3 style={{}}>{nickName}</h3>
                        <span style={{ "opacity":"0.6"}}>mail1234@mail.com</span>
                    </div>
                </div>
                <div id="btn">
                    <button>개인 정보 수정</button>
                    <button>호스트 되기</button>
                </div>
            </ProfilBox>



            <MyDefaultBox>
                <div id="mylike">
                    <h1>내 좋아요</h1>
                    <span>{myLike ? (<DownIcon onClick={likeClick}/>) : (<UpIcon onClick={likeClick}/>)}</span>
                </div>
                {myLike ? (
                <DefaultImgBox>
                        <img src={jeju1}/>
                        <img src={jeju1}/>
                        <img src={jeju1}/>
                </DefaultImgBox>) : ("")}
                {myLike ? (""):(
                <HiddenMyLikeBox>
                    {isList.map((item, idx)=>{
                        return(
                            <div key={idx} id="listBox">
                                <img src={jeju1}/>
                                <span style={{"marginTop":"5px"}}>해변가 근처 숙소</span>
                                <div id="icons">
                                    <div style={{"display":"flex","alignItems":"center"}}>
                                        <StarIcon/>
                                        <span  style={{"marginLeft":"10px"}}>4.5</span>
                                    </div>
                                    <HeartIcon/>
                                </div>
                            </div>
                    )})}
                </HiddenMyLikeBox>)}
            
            </MyDefaultBox>
                            


            <MyDefaultBox>
                <div id="myWrite">
                    <h1>내가 쓴 글</h1>
                    <span>{myWrite ? (<DownIcon onClick={writeClick}/>) : (<UpIcon onClick={writeClick}/>)}</span>
                </div>
                {myWrite ? (
                <DefaultImgBox>
                        <img src={jeju1}/>
                        <img src={jeju1}/>
                        <img src={jeju1}/>
                </DefaultImgBox>) : ("")}
                {myWrite ? (""):(
                <HiddenMyLikeBox>
                    {isList.map((item, idx)=>{
                        return(
                            <div key={idx} id="listBox">
                                <img src={jeju1}/>
                                <span style={{"marginTop":"5px"}}>내가 쓴 글 제목</span>
                                <div id="icons">
                                    <div style={{"display":"flex","alignItems":"center"}}>
                                        <CommentIcon/>
                                        <span  style={{"marginLeft":"10px"}}>00개</span>
                                    </div>
                                    <HeartIcon/>
                                </div>
                            </div>
                    )})}
                </HiddenMyLikeBox>)}
            </MyDefaultBox>

        </MainBox>
    );
};

const MainBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ProfilBox = styled.div`
    width: 42%;
    height: 110px;
    margin-top: 100px;
    #btn{
        display: flex;
        justify-content: space-between;
        margin-top:30px;
        button{
            padding: 15px 65px;
            border-radius:10px;
            border: none;
            background-color: #F2F2F7;
            font-size: 20px;
        }
    }
    #profile{
        display: flex;
        flex-direction: column;
        margin: 0px 0px 3px 20px;
    }
`

const MyDefaultBox = styled.div`
    width: 45%;
    margin-top: 100px;
    #mylike{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
    }
    #myWrite{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    span{
        cursor: pointer;
    }
    h1{
            margin-left: 35px;
            margin-bottom: 10px;
        }
`

const DefaultImgBox = styled.div`
    width: 100%;
    height: 270px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: #F2F2F7;
        img{
            width: 30%;
            height: 230px;
            margin: 0px 10px 0px 10px;
        }
`
const HiddenMyLikeBox = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: auto;
    #listBox{
        width: 30%;
        display: flex;
        flex-direction: column;
        margin: 25px 10px 0px 10px;
    }    
    img{
            width: 100%;
            height: 230px;
    }
    #icons{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }
`

const HeartIcon = styled(FaRegHeart)`
    font-size: 15px;
`
const StarIcon = styled(FaStar)`
   font-size: 15px;
`


const UpIcon = styled(FaChevronUp)`
    margin-top: 5px;
`

const DownIcon = styled(FaChevronDown)`
`

const CommentIcon = styled(FaRegComment)`
`


export default Mypage;