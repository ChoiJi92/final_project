import React from "react";
import styled from "styled-components";
import naverLogo from '../assests/css/네이버로고.png'
const Naver = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID
    const REDIRECT_URI = "http://localhost:3000/oauth/naver/callback";
    // const REDIRECT_URI = "https://mendorong-jeju.co.kr//oauth/naver/callback";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=test&redirect_uri=${REDIRECT_URI}`
  return (
    <Button onClick={()=>{
      window.location.href=NAVER_AUTH_URL
    }}>
      <img src={naverLogo} alt=''></img>
    <a href={NAVER_AUTH_URL}>네이버 로그인
  </a>
  </Button>
  );
};

const Button= styled.div`
 border: 1px solid;
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 10px;
  background-color: #FFFFFF;
  padding-left:22px;
  margin: 10px 0;
  background-color: #03C75A;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  a{
    margin-left: 95px;
    font-size: 18px;
    text-decoration: none;
    color: white;
  }
`

export default Naver;
