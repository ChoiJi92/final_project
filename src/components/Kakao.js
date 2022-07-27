import React from "react";
import styled from "styled-components";
import kakaoBtn from '../assests/css/카카오 버튼.png'

const Kakao = () => {
  const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  // const REDIRECT_URI = "https://mendorong-jeju.co.kr/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email`;
  return (
    <a href={KAKAO_AUTH_URL} style={{display:'flex'}}>
      <Img src={kakaoBtn} alt="카카오"></Img>
    </a>
  );
};

const Img = styled.img`
  width: 100%;

`

export default Kakao;
