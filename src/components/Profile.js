import React from "react";
import styled from "styled-components";




const Profile = ({item, data}) => {
    // console.log(item);
    // console.log(data);
    return(
    <Main>
        {data ? (
        <>
        <img src={data.user.userImageURL} alt="프로필"/>
        <div id="profileName">
            <SpanName >{data.user.nickname}</SpanName>
            <SpanTime>{data.createdAt}</SpanTime>
        </div>
        </>) : (
        <>
            <img src={item.user.userImageURL} alt="프로필"/>
        <div id="profileName">
            <SpanName>{item.user.nickname}</SpanName>
            <SpanTime>{item.createdAt}</SpanTime>
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