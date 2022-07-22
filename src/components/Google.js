import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import styled from 'styled-components';
import google_logo from '../assests/css/구글 로고.png'


const Google = () => {
  //  const secretcode='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'
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000/oauth/google/callback";
  // const REDIRECT_URI = "https://mendorong-jeju.co.kr/oauth/google/callback";
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email`;

    return (
      <Button onClick={()=>{
        window.location.href=GOOGLE_AUTH_URL
      }}>
        <img src={google_logo} alt='구글'></img>
      <a href={GOOGLE_AUTH_URL}>구글 로그인
    </a>
    </Button>
    );
};

const Button= styled.div`
 border: 1px solid;
  width: 100%;
  height: 55px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #FFFFFF;
  padding-left:18px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  a{
    margin-left: 103px;
    font-size: 18px;
    text-decoration: none;
    color: #828282;
  }
`

export default Google;