import React, { useEffect } from 'react'
import Main from "./pages/Main";
import GlobalStyles from "./assests/css/GlobalStyles";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import KakaoRedirect from './components/KakaoRedirect';
import GoogleRedirect from './components/GoogleRedirect';
import Footer from './components/Footer';
import NaverRedirect from './components/NaverRedirect';
import UserWrite from './pages/UserWrite';


import Community from './pages/Community';
import CommunityDetail from './pages/CommunityDetail';
import ChatList from './pages/ChatList';
import HouseInfo from './pages/HouseInfo';
import HouseDetail from './pages/HouseDetail';
import ChatRoom from './pages/ChatRoom';
import HostWrite from './pages/HostWrite';
import UserPolicy from './pages/UserPolicy';


import Error from './pages/Error';
import LoginError from './pages/LoginError';
import UserPage from './pages/UserPage';
import Mypage from './pages/Mypage'

import MetaTag from './pages/MetaTag';
import OnReady from './pages/OnReady';
import Event from './pages/Event';


function App() {
 const userId = localStorage.getItem('userId')
  return (
    <div className="App">
       <MetaTag title={'멘도롱 제주'}></MetaTag>
      <GlobalStyles />
      <Event/>
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/community" element={<Community/>} />
        <Route path="/community/:id" element={<CommunityDetail/>} />
        <Route path="/userwrite" element={userId ? <UserWrite /> : <LoginError/>} />
        <Route path="/userwrite/:id" element={userId ? <UserWrite /> : <LoginError/>} />
        <Route path="/hostwrite" element={userId ? <HostWrite/> : <LoginError/>} />
        <Route path="/hostwrite/:id" element={userId ? <HostWrite/> : <LoginError/>} />
        <Route path="/house" element={<HouseInfo/>} />
        <Route path="/house/:id" element={<HouseDetail/>} />
        <Route path="/chat" element={<ChatList/>} />
        <Route path="/chatroom/:id" element={userId ? <ChatRoom/> : <LoginError/>} />
        <Route path="/mypage" element={userId ? <Mypage /> : <LoginError/>} />
        <Route path="/userpage/:id" element={<UserPage />}/>
        <Route path="/userpolicy" element={<UserPolicy />} />
        <Route path="/onready" element={<OnReady />} />
        <Route path="/loginerror" element={<LoginError />} />
        <Route path='/oauth/kakao/callback' element={<KakaoRedirect/>}/>
        <Route path='/oauth/google/callback' element={<GoogleRedirect/>}/>
        <Route path='/oauth/naver/callback' element={<NaverRedirect/>}/>
        <Route path="*" element={<Error/>} />
      </Routes>

    </div>
  );
}

export default App;
