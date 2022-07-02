import React from "react";
import styled from "styled-components";
import kakaoBtn from "../assests/css/kakao_login.png";

const Kakao = () => {
  const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  // const REDIRECT_URI = "http://13.125.112.232/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  return (
    <a href={KAKAO_AUTH_URL}>
      <Img src={kakaoBtn} alt=""></Img>
    </a>
  );
};

const Img = styled.img`
  width: 100%;

`

export default Kakao;
