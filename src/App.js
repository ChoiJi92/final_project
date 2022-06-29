import React, { useEffect } from 'react'
import Main from "./pages/Main";
import GlobalStyles from "./assests/css/GlobalStyles";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import Posts from "./pages/Posts";
import KakaoRedirect from './components/KakaoRedirect';
import GoogleRedirect from './components/GoogleRedirect';
import Footer from './components/Footer';
import NaverRedirect from './components/NaverRedirect';
import UserWrite from './pages/UserWrite';
import HostWrite from './pages/HostWrite';

function App() {
 
  return (
    <div className="App">
      <GlobalStyles />
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/userwrite" element={<UserWrite />} />
        <Route path="/userwrite/:id" element={<UserWrite />} />
        <Route path="/hostwrite/" element={<HostWrite />} />
        <Route path="/hostwrite/:id" element={<HostWrite />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path='/oauth/kakao/callback' element={<KakaoRedirect/>}/>
        <Route path='/oauth/google/callback' element={<GoogleRedirect/>}/>
        <Route path='/oauth/naver/callback' element={<NaverRedirect/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
