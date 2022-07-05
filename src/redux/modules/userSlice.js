import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";

//미들웨어
//login

// 카카오로그인
export const kakaoLoginDB = (code) => {
  return async function (dispatch) {
    await instance
      .get(`/oauth/kakao/callback?code=${code}`)
      // .get('/oauth/kakao/callback')
      .then((response) => {
        console.log(response)
        localStorage.setItem('token',response.data.user.token)  
        localStorage.setItem('userId',response.data.user.userId)  
        localStorage.setItem('nickName',response.data.user.nickName)  
        localStorage.setItem('userImage',response.data.user.userImg)  
        console.log("로그인 확인");
        window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        // window.alert("로그인에 실패하였습니다.");
        // window.location.replace("/");
      });
  };
};
export const GoogleLoginDB = (code) => {
  return async function (dispatch) {
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
  };
};
export const NaverLoginDB = (code) => {
  return async function (dispatch) {
    await instance
      .get(`/oauth/naver/callback?code=${code}`)
      .then((response) => {
        console.log(response)
        localStorage.setItem('token',response.data.user.token)  
        localStorage.setItem('userId',response.data.user.userId)  
        localStorage.setItem('nickName',response.data.user.nickname)  
        localStorage.setItem('userImage',response.data.user.userImage)  
        // console.log("로그인 확인");
        window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        // window.location.replace("/");
      });
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
  },

  reducers: {
    loginUser: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});


export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
