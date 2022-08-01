import React from "react";
import mobileHome from "../assests/css/mobileHome.webp";
import mobileSearch from "../assests/css/mobileSearch.webp";
import mobileCommunity from "../assests/css/mobileCommunity.webp";
import mobileChat from "../assests/css/mobileChat.webp";
import mobileMypage from "../assests/css/mobileMypage.webp";
import styled from "styled-components";
const MobileFooter = () => {
  return (
    <Container>
      <div>
        <img src={mobileHome} alt="홈"></img>
        <p>홈</p>
      </div>
      <div>
        <img src={mobileSearch} alt="숙소찾기"></img>
        <p>숙소 찾기</p>
      </div>
      <div>
        <img src={mobileCommunity} alt="커뮤니티"></img>
        <p>커뮤니티</p>
      </div>
      <div>
        <img src={mobileChat} alt="오픈 챗"></img>
        <p>오픈 챗</p>
      </div>
      <div>
        <img src={mobileMypage} alt="마이페이지"></img>
        <p>마이페이지</p>
      </div>
    </Container>
  );
};
const Container = styled.div`
  width: 375px;
  position: fixed;
  transform: translateY(-100%);
  border-top: 2px solid #e5e5ea;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      margin-bottom: 5px;
    }
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 150%;
      color: #4f4f4f;
    }
  }
`;
export default MobileFooter;
