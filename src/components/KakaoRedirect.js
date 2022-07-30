import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import instance from "../shared/axios";
import Loading from "../pages/Loading";

const KakaoRedirect = () => {
  const navigate = useNavigate()
  // let params = new URL(document.location.toString()).searchParams;
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code"); // 인가코드 받는 부분
  console.log(code)
  // let grant_type = "authorization_code";
  // let client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
  
  useEffect(()=>{
    async function kakaoLogin(){
      // await dispatch(kakaoLoginDB(code))
      await instance
      .get(`/oauth/kakao/callback?code=${code}`)
      .then((response) => {
        // console.log(response)
        localStorage.setItem('token',response.data.users.token)  
        localStorage.setItem('userId',response.data.users.userId)
        localStorage.setItem('nickName',response.data.users.nickname)  
        localStorage.setItem('userImage',response.data.users.userImageURL)
        localStorage.setItem('host',response.data.users.host)
        localStorage.setItem('email',response.data.users.email)
        // console.log("로그인 확인");
        window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        // console.log("소셜로그인 에러", err);
        // window.alert("로그인에 실패하였습니다.");
        // window.location.replace("/");
      });
    }
    kakaoLogin()
  },[])

  return (
    <Loading/>
  )
};

export default KakaoRedirect;