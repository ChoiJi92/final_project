import React from "react";
import styled from "styled-components";
import instagram from '../assests/css/instagram.png'
const Footer = () => {
  return (
    <Wrap>
      <div className="title">멘도롱제주</div>
      <div className="service">
        <p>서비스 소개</p>
        <p>운영정책</p>
        <p>문의하기</p>
        <p>광고문의</p>
      </div>
      <div className="ad">
        <img src={instagram} alt=""></img>
        <img src={instagram} alt=""></img>
        <img src={instagram} alt=""></img>
      </div>
    </Wrap>
  );
};

const Wrap = styled.footer`
  width: 100%;
  height: 100px;
  position : relative;
  border-top: 2px solid;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: large;
  .title {
    width: 25%;
    text-align: center;
    
  }
  .service {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 30%;
    white-space: nowrap;
  }
  .ad {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 25%;
    justify-content: center;
    img{
        width: 40px;
        height: 40px;
        margin-right: 15px;
    }
  }
`;
export default Footer;
