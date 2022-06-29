import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLoginDB } from '../redux/modules/userSlice';

const GoogleRedirect = () => {
    const dispatch = useDispatch()
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code"); // 인가코드 받는 부분
  console.log(code)
  
  useEffect(()=>{
    async function googleLogin(){
      await dispatch(GoogleLoginDB(code))
    }
    googleLogin()
  },[])
    return (
        <div>사실 이페이지는 크게 의미 없다. 첫화면으로 로직이 끝나면 이동시켜주면 된다.</div>
    );
};

export default GoogleRedirect;