import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import jeju2 from "../assests/css/jeju2.jpeg"
import { reviewStarList } from "../recoil/atoms";



const Profile = ({item, data}) => {
    const userProfile = useRecoilValue(reviewStarList);
    // console.log(!data)
//    console.log(userProfile[idx])
    // console.log(item, "잇냐?");
    return(
    <Main>
        {data ? (
        <>
        <img src={data.images[0].userImageURL} alt="프로필"/>
        <div id="profileName">
            <SpanName >{data.nickname}</SpanName>
            <SpanTime>2시간 전</SpanTime>
        </div>
        </>) : (
        <>
            <img src={item?.images[0]?.userImageURL} alt="프로필"/>
        <div id="profileName">
            <SpanName style={{}}>{item.nickname}</SpanName>
            <SpanTime>2시간 전</SpanTime>
        </div>
        </>
        )}
        
    </Main>)
};

const Main = styled.div`
    display: flex;
    align-items: center;
    margin: 15px 10px 0px 20px;
    width: 100%;
    img{
        width: 22.7%;
        height: 70px;
        border-radius: 50%;
    }
    #profileName{
        display: flex;
        flex-direction: column;
        margin-left: 25px;
    }
`

const SpanName = styled.span`

`

const SpanTime = styled.span`
    margin-top: 5px;
    opacity: 0.4;
`

export default Profile;