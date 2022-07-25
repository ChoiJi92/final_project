import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import errorPage from "../assests/css/errorPage.webp";
import refreshIcon from '../assests/css/refreshIcon.webp'
const Error = () => {
    const navigate = useNavigate()
  return (
    <Container>
      <img className="error" src={errorPage} alt="에러" />
      <p>앗, 일시적인 오류가 발생했습니다.</p>
      <p>아래의 버튼을 눌러 메인으로 돌아가주세요.</p>
      <button onClick={()=>{
        navigate('/')
      }}>메인으로 돌아가기 <img src={refreshIcon} alt="메인으로 돌아가기"></img></button>
    </Container>
  );
};

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
export default Error;
