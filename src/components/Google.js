import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import styled from 'styled-components';
import google_login from '../assests/css/btn_google_light_normal_ios.png'
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';

const Google = () => {
  //  const secretcode='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'
  // const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  const clientId = "715387401721-ncqt2bukuavi3a9ebuft0ge23mu4989t.apps.googleusercontent.com"
  // const REDIRECT_URI = "http://localhost:3000/oauth/google/callback";
  const REDIRECT_URI = "https://choiji.shop/oauth/google/callback";
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;

    return (
      <Button onClick={()=>{
        window.location.href=GOOGLE_AUTH_URL
      }}>
        <img src={google_login} alt=''></img>
      <a href={GOOGLE_AUTH_URL}>구글로 시작하기
    </a>
    </Button>
    );
};

const Button= styled.div`
  width: 78%;
  height: 10%;
  background-color: #FFFFFF;
  /* background-color: #000000; */
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  a{
    margin-left: 50px;
    font-size: 14px;
    text-decoration: none;
    color: black;
  }
`

export default Google;