import React from "react";
import styled from "styled-components";




const Profile = ({item, data}) => {
    return(
    <Main>
        {data ? (
        <>
        <img src={data.userImageURL} alt="프로필"/>
        <div id="profileName">
            <SpanName >{data.nickname}</SpanName>
            <SpanTime></SpanTime>
        </div>
        </>) : (
        <>
            <img src={item.userImageURL} alt="프로필"/>
        <div id="profileName">
            <SpanName>{item.nickname}</SpanName>
            <SpanTime></SpanTime>
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