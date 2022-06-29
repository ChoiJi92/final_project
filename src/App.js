import React from 'react'
import Main from "./pages/Main";
import GlobalStyles from "./assests/css/GlobalStyles";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HostWrite from "./pages/HostWrite";
import Mypage from "./pages/Mypage";
import Posts from "./pages/Posts";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/write" element={<HostWrite />} />
        <Route path="/write/:id" element={<HostWrite />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
