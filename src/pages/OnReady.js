import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import readyPage from "../assests/css/준비중.webp";
import refreshIcon from '../assests/css/refreshIcon.webp'


const OnReady = () => {
    const navigate = useNavigate();
    
    return(
        <Container>
        <img className="error" src={readyPage} alt="준비중" />
        <p>페이지를 준비중입니다.</p>
        <p>조그만 더 기다려주세요!</p>
        <button onClick={()=>{
          navigate(-1)
        }}>이전페이지로 돌아가기 <img src={refreshIcon} alt="숙소로 돌아가기"></img></button>
      </Container>
    )
}


const Container = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .error{
    margin-bottom: 20px;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
  }
  button {
    margin-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 434px;
    height: 73px;
    border: none;
    border-radius: 10px;
    background: #EEE9E4;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 150%;
    cursor: pointer;
    img{
      margin-left: 10px;
    }
  }
`;
export default OnReady;