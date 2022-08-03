import React, { useEffect } from 'react';
import Loading from '../pages/Loading';
import instance from '../shared/axios';

const GoogleRedirect = () => {
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code"); // 인가코드 받는 부분
  console.log(code)
  
  useEffect(()=>{
    async function googleLogin(){
      await instance
      .get(`/oauth/google/callback?code=${code}`)
      .then((response) => {
        sessionStorage.setItem('token',response.data.users.token)  
        sessionStorage.setItem('userId',response.data.users.userId)  
        sessionStorage.setItem('nickName',response.data.users.nickname)  
        sessionStorage.setItem('userImage',response.data.users.userImageURL)  
        sessionStorage.setItem('host',response.data.users.host)
        sessionStorage.setItem('email',response.data.users.email)
        window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        window.alert("로그인에 실패하였습니다.");
      });
    }
    googleLogin()
  },[])
    return (
      <Loading/>
    );
};

export default GoogleRedirect;