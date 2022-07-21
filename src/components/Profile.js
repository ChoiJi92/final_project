import React from "react";
import styled from "styled-components";
import jeju2 from "../assests/css/jeju2.jpeg"



const Profile = () => {
    return(
    <Main>
        <img src={jeju2} alt="프로필"/>
        <div id="profileName">
            <SpanName style={{}}>글쓴이 이름</SpanName>
            <SpanTime>2시간 전</SpanTime>
        </div>
    </Main>)
};

const Main = styled.div`
    display: flex;
    align-items: center;
    margin: 15px 10px 0px 20px;
    img{
        width: 16.45%;
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