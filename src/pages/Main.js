import React from "react";
import styled from "styled-components";
// import main from "../assests/css/메인.png";
import main from "../assests/css/메인.webp";
import OpenChatSlide from "../components/OpenChatSlide";
import CategorySlide from "../components/CategorySlide";
import map from "../assests/css/map.webp";
import flower from "../assests/css/flower.webp";
import flower2 from "../assests/css/flower2.webp";
import hanrabong from "../assests/css/hanrabong.webp";
import parasol from "../assests/css/parasol.webp";
import lighthouse from "../assests/css/lighthouse.webp";
import palmTree from "../assests/css/palmtree.webp";
import dolhaleubang from "../assests/css/dolhaleubang.webp";
import jeju from "../assests/css/jeju.webp";
import { useQuery } from "react-query";
import instance from "../shared/axios";
import Footer from "../components/Footer";
const Main = () => {
  // const { data } = useQuery(
  //   ["loadChatRoom"],
  //   () =>
  //     instance.get("/room").then((res) => {
  //       console.log(res.data);
  //       return res.data.allRoom;
  //     }),
  //   {
  //     // retry:0,
  //     refetchOnWindowFocus: false,
  //   }
  // );
  return (
    <>
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
          <div className=" eastArea">
            <div>
              <p className="title">East area</p>
              <p>Jeju-si, Jocheon-eup, Aewol-eup</p>
            </div>
            <img src={lighthouse} alt="등대"></img>
            <img src={parasol} alt="파라솔"></img>
          </div>
          <div className="westArea">
            <img src={dolhaleubang} alt="돌하르방"></img>
            <div>
              <p className="title">West area</p>
              <p>Hallim-eup, Hangyeong-myeon, Daejeong-eup, Andeok-myeon</p>
            </div>
            <img src={palmTree} alt="야자수"></img>
          </div>
          <div className="southArea">
            <img src={flower} alt="꽃"></img>
            <img src={flower2} alt="꽃"></img>
            <div>
              <p className="title">South area</p>
              <p>Jungmun, Seogwipo-si, Namwon-eup</p>
            </div>
          </div>
          <div className="northArea">
            <div>
              <p className="title">North area</p>
              <p>Gujwa-eup, Seongsan-eup, Pyoseon-myeon Udo-myeon</p>
            </div>
            <img src={jeju} alt="해녀"></img>
            <img src={hanrabong} alt="한라봉"></img>
          </div>
        </div>
      </RegionWrap>
      <OpenChat>
        <h2>Popular openchat</h2>
        {/* <OpenChatSlide data={data.slice(0,5)} rtl={false}/> */}
        {/* <OpenChatSlide data={data.slice(0,5)} rtl={true}/> */}
      </OpenChat>
      
    </Container>
    <Footer/>
    </>
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
  width: 70%;
  margin: 0 auto 114px auto;

  h2 {
    margin-bottom: 50px;
    white-space: nowrap;
    font-style: normal;
    font-weight: 700;
    font-size: 56px;
    line-height: 110%;
  }
  .region {
    width: 100%;
    /* width: 88.87%; */
    /* @media screen and (min-width: 1366px) and (max-width: 1919px) {
      transform: scale(0.75);
    }
    @media screen and (min-width: 865px) and (max-width: 1365px) {
      transform: scale(0.55);
    }
    @media screen and (min-width: 601px) and (max-width: 864px) {
      transform: scale(0.35); */
  }
  .eastArea {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    width: 100%;
    div {
      width: 63.76%;
      height: 200px;
      background: #f7f3ef;
      border-radius: 60px;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 72px;
        line-height: 110%;
        color: #2c2c2e;
      }
      p {
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 42px;
        color: #000000;
        opacity: 0.2;
      }
      :hover {
        background: #eee9e4;
        .title {
          opacity: 1;
        }
      }
    }
    img {
      margin-left: 20px;
    }
  }
  .westArea {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    width: 100%;
    div {
      width: 63.76%;
      height: 200px;
      background: #f7f3ef;
      border-radius: 60px;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 20px;
      cursor: pointer;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 72px;
        line-height: 110%;
        color: #2c2c2e;
      }
      p {
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 42px;
        color: #000000;
        opacity: 0.2;
      }
      :hover {
        background: #eee9e4;
        .title {
          opacity: 1;
        }
      }
    }
  }
  .southArea {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    width: 100%;
    div {
      width: 63.76%;
      height: 200px;
      background: #f7f3ef;
      border-radius: 60px;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 72px;
        line-height: 110%;
        color: #2c2c2e;
      }
      p {
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 42px;
        color: #000000;
        opacity: 0.2;
      }
      :hover {
        background: #eee9e4;
        .title {
          opacity: 1;
        }
      }
    }
    img {
      margin-right: 20px;
    }
  }
  .northArea {
    display: flex;
    flex-direction: row;
    width: 100%;
    div {
      width: 63.76%;
      height: 200px;
      background: #f7f3ef;
      border-radius: 60px;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 72px;
        line-height: 110%;
        color: #2c2c2e;
      }
      p {
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 42px;
        color: #000000;
        opacity: 0.2;
      }
      :hover {
        background: #eee9e4;
        .title {
          opacity: 1;
        }
      }
    }
    img {
      margin-left: 20px;
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
