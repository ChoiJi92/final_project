import React from "react";
import styled from "styled-components";
// import main from "../assests/css/메인.png";
import main from "../assests/css/메인.webp";
import OpenChatSlide from "../components/OpenChatSlide";
import CategorySlide from "../components/CategorySlide";
import map from "../assests/css/map.webp";
import flower from "../assests/css/flower.webp";
import flower2 from "../assests/css/flower2.webp";
import hanlabong from "../assests/css/hanrabong.webp";
import parasol from "../assests/css/parasol.webp";
import lighthouse from "../assests/css/lighthouse.webp";
import palmTree from "../assests/css/palmtree.webp";
import dolhaleubang from "../assests/css/dolhaleubang.webp";
const Main = () => {
  return (
    <Container>
      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px auto 0 auto",
        }}
      >
        <img className="mainImage" src={main} alt="메인"></img>
      </div>
      <div
        style={{
          width: "70%",
          display: "flex",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <CategorySlide></CategorySlide>
      </div>
      <RegionWrap>
        <h2>Find accommodation by region</h2>
        <div className="region">
          <div className=" dolhaleubang">
            <div></div>
          </div>
          <div className="flower">
            <div></div>
          </div>
          <div className="lighthouse">
            <div></div>
          </div>
          <div className="parasol">
            <div></div>
          </div>
          <div className="palmTree">
            <div></div>
          </div>
          <div className="hanlabong">
            <div></div>
          </div>
          <div className="flower2">
            <div></div>
          </div>
        </div>
      </RegionWrap>
      <OpenChat>
        <h2>Popular openchat</h2>
        <OpenChatSlide rtl={false}/>
        <OpenChatSlide rtl={true}/>
      </OpenChat>
    </Container>
  );
};

const Container = styled.div`
  /* height: auto; */
  /* min-height: 100vh; */
  width: 100%;
  padding-bottom: 80px;

  .mainImage {
    width: 100%;
  }
  h2 {
    font-size: 56px;
    font-weight: 700;
    line-height: 61.6px;
  }
`;
const RegionWrap = styled.div`
  position: relative;
  width: 70%;
  margin: 0 auto 166px auto;

  h2 {
    margin-bottom: 166px;
    white-space: nowrap;
    font-style: normal;
    font-weight: 700;
    font-size: 56px;
    line-height: 110%;
  }
  .region {
    background: url(${map}) no-repeat;
    background-size: cover;
    transform-origin: center;
    width: 1200px;
    /* width: 88.87%; */
    height: 691px;
    margin: 0 auto;
    @media screen and (min-width: 1366px) and (max-width: 1919px) {
      transform: scale(0.75);
    }
    @media screen and (min-width: 865px) and (max-width: 1365px) {
      transform: scale(0.55);
    }
    @media screen and (min-width: 601px) and (max-width: 864px) {
      transform: scale(0.35);
    }
  }
  .dolhaleubang{
    position: absolute;
    div {
      left: 40px;
      top: 350px;
      position: relative;
      width: 200px;
      height: 200px;
      background: url(${dolhaleubang}) no-repeat;
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      }
    }
  }
  .flower {
    position: absolute;
    div {
      left: 280px;
      top: 30px;
      position: relative;
      width: 200px;
      height: 200px;
      background: url(${flower}) no-repeat;
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      }
    }
  }
  .lighthouse {
    div {
      position: relative;
      left: 440px;
      bottom: 30px;
      width: 200px;
      height: 200px;
      background: url(${lighthouse}) no-repeat;
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      }
    }
  }
  .parasol {
    div {
      position: relative;
      left: 900px;
      bottom: 250px;
      width: 200px;
      height: 200px;
      background: url(${parasol}) no-repeat;
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      }
    }
  }
  .palmTree {
    div {
      position: relative;
      left: 810px;
      bottom: 140px;
      width: 226.75px;
      height: 221.3px;
      background: url(${palmTree}) no-repeat;
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      }
    }
  }
  .hanlabong {
    div {
      position: relative;
      left: 650px;
      bottom: 200px;
      width: 200px;
      height: 200px;
      background: url(${hanlabong}) no-repeat;
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      }
    }
  }
  .flower2 {
    div {
      position: relative;
      left: 230px;
      bottom: 380px;
      width: 200px;
      height: 200px;
      background: url(${flower2}) no-repeat;
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      }
    }
  }
`;
const OpenChat = styled.div`
  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 56px;
    line-height: 110%;
    width: 70%;
    margin: 0 auto 50px auto;
    white-space: nowrap;
  }
`;
export default Main;
