import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { kakaoLoginDB } from "../redux/modules/userSlice";
import instance from "../shared/axios";

const KakaoRedirect = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
      // .get('/oauth/kakao/callback')
      .then((response) => {
        console.log(response)
        localStorage.setItem('token',response.data.users.token)  
        localStorage.setItem('userId',response.data.users.userId)
        localStorage.setItem('nickName',response.data.users.nickname)  
        localStorage.setItem('userImage',response.data.users.userImage)  
        console.log("로그인 확인");
        // window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        // window.alert("로그인에 실패하였습니다.");
        // window.location.replace("/");
      });
    }
    kakaoLogin()
  },[])

  return (
    <div>로그인 중입니다...</div>
  )
};

export default KakaoRedirect;