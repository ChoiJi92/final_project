import React from "react";
import styled from "styled-components";
import NaverBtn from "../assests/css/naver_login.png";
const Naver = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID
    // const clientId = "sMOCBVS1BTDo8BSkJsZB"
    const REDIRECT_URI = "http://localhost:3000/oauth/naver/callback";
    // const REDIRECT_URI = "https://choiji.shop/oauth/naver/callback";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=test&redirect_uri=${REDIRECT_URI}`
  return (
    <a href={NAVER_AUTH_URL} style={{margin:'10px 0'}}>
      <Img src={NaverBtn} alt=""></Img>
    </a>
  );
};

const Img = styled.img`
  width: 100%;
`;

export default Naver;
