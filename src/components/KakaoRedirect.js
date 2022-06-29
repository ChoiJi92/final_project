import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { kakaoLoginDB } from "../redux/modules/userSlice";

const KakaoRedirect = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // let params = new URL(document.location.toString()).searchParams;
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code"); // 인가코드 받는 부분
  console.log(code)
  // let grant_type = "authorization_code";
  let client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
  console.log(client_id)
  
  useEffect(()=>{
    async function kakaoLogin(){
      await dispatch(kakaoLoginDB(code))
    }
    kakaoLogin()
  },[])

  return (
  <div>사실 이페이지는 크게 의미 없다. 첫화면으로 로직이 끝나면 이동시켜주면 된다.</div>
  )
};

export default KakaoRedirect;