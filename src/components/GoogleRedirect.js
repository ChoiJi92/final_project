import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLoginDB } from '../redux/modules/userSlice';
import instance from '../shared/axios';

const GoogleRedirect = () => {
    // const dispatch = useDispatch()
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code"); // 인가코드 받는 부분
  console.log(code)
  
  useEffect(()=>{
    async function googleLogin(){
      // await dispatch(GoogleLoginDB(code))
      await instance
      .get(`/oauth/google/callback?code=${code}`)
      .then((response) => {
        console.log(response)
        localStorage.setItem('token',response.data.user.token)  
        localStorage.setItem('userId',response.data.user.userId)  
        localStorage.setItem('nickName',response.data.user.nickname)  
        localStorage.setItem('userImage',response.data.user.userImage)  
        console.log("로그인 확인");
        window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        // window.location.replace("/");
      });
    }
    googleLogin()
  },[])
    return (
      <div>로그인 중입니다...</div>
    );
};

export default GoogleRedirect;