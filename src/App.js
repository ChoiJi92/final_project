import React, { useEffect } from 'react'
import Main from "./pages/Main";
import GlobalStyles from "./assests/css/GlobalStyles";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Mypage from "./pages/Mypage";
import Posts from "./pages/Posts";
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
import Share from './components/Share';
import UserPolicy from './pages/UserPolicy';
import TestMap from './pages/TestMap';

function App() {
 
  return (
    <div className="App">
      <GlobalStyles />
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/userwrite" element={<UserWrite />} />
        <Route path="/userwrite/:id" element={<UserWrite />} />
        <Route path="/hostwrite" element={<HostWrite/>} />
        <Route path="/hostwrite/:id" element={<HostWrite/>} />
        <Route path="/house" element={<HouseInfo/>} />
        <Route path="/house/:id" element={<HouseDetail/>} />
        <Route path="/chat" element={<ChatList/>} />
        <Route path="/chatroom" element={<ChatRoom/>} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/test" element={<Share />} />
        <Route path="/maptest" element={<TestMap />} />
        <Route path="/userpolicy" element={<UserPolicy />} />
        <Route path='/oauth/kakao/callback' element={<KakaoRedirect/>}/>
        <Route path='/oauth/google/callback' element={<GoogleRedirect/>}/>
        <Route path='/oauth/naver/callback' element={<NaverRedirect/>}/>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
