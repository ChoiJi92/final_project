import React from "react";
import styled from "styled-components";
import mobileMain from "../assests/css/mobileMain.webp";
import OpenChatSlide from "../components/OpenChatSlide";
import CategorySlide from "../components/CategorySlide";
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
import { useNavigate } from "react-router-dom";
import MetaTag from "../pages/MetaTag";

const MobileMain = () => {
  const { data } = useQuery(
    ["loadChatRoom"],
    () =>
      instance.get("/room").then((res) => {
        // console.log(res.data);
        return res.data.allRoom;
      }),
    {
      // retry:0,
      refetchOnWindowFocus: false,
    }
  );
  const navigate = useNavigate();
  return (
    <>
      <MetaTag title={"멘도롱 제주"} />
      {/* <Event2/>
      <Event/> */}
      <Container>
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px auto 0 auto",
          }}
        >
          <img className="mainImage" src={mobileMain} alt="메인"></img>
        </div>
        <div
          style={{
            width: "90%",
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
              <div
                onClick={() => {
                  navigate("/house", { state: { address: "Eastarea" } });
                }}
              >
                <p className="title">East area</p>
                <p>Gujwa-eup, Seongsan-eup, Pyoseon-myeon Udo-myeon</p>
              </div>
              <div className="imageWrap">
                <img src={lighthouse} alt="등대"></img>
                <img src={parasol} alt="파라솔"></img>
              </div>
            </div>
            <div className="westArea">
              <div
                onClick={() => {
                  navigate("/house", { state: { address: "Westarea" } });
                }}
              >
                <p className="title">West area</p>
                <p>Hallim-eup, Hangyeong-myeon, Daejeong-eup, Andeok-myeon</p>
              </div>
              <div className="imageWrap">
                <img src={dolhaleubang} alt="돌하르방"></img>
                <img src={palmTree} alt="야자수"></img>
              </div>
            </div>
            <div className="southArea">
              <div
                onClick={() => {
                  navigate("/house", { state: { address: "Southarea" } });
                }}
              >
                <p className="title">South area</p>
                <p>Jungmun, Seogwipo-si, Namwon-eup</p>
              </div>
              <div className="imageWrap">
                <img src={flower} alt="꽃"></img>
                <img src={flower2} alt="꽃"></img>
              </div>
            </div>
            <div className="northArea">
              <div
                onClick={() => {
                  navigate("/house", { state: { address: "Northarea" } });
                }}
              >
                <p className="title">North area</p>
                <p>Jeju-si, Jocheon-eup, Aewol-eup</p>
              </div>
              <div className="imageWrap">
                <img src={jeju} alt="해녀"></img>
                <img src={hanrabong} alt="한라봉"></img>
              </div>
            </div>
          </div>
        </RegionWrap>
        <OpenChat>
          <h2>Popular openchat</h2>
          <OpenChatSlide
            data={data.length > 5 ? data?.slice(0, 5) : data}
            rtl={false}
          />
          <OpenChatSlide
            data={data.length > 5 ? data?.slice(0, 5) : data}
            rtl={true}
          />
        </OpenChat>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

const Container = styled.div`
  /* height: auto; */
  /* min-height: 100vh; */
  width: 100%;
  padding-bottom: 100px;

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
  width: 90%;
  margin: 0 auto 40px auto;

  h2 {
    margin-bottom: 12px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 110%;
  }
  .region {
    width: 100%;
  }
  .eastArea {
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
    background: #f7f3ef;
    border-radius: 12px;
    border: none;
    width: 343px;
    height: 100px;
    padding: 14px;
    div {
      width: 70%;
      height: auto;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        color: #4f4f4f;
        width: 50%;
        opacity: 1;
      }
      p {
        width: 70%;
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 150%;
        color: #000000;
        opacity: 0.2;
      }
      /* :hover {
        background: #eee9e4;
        .title {
          opacity: 1;
        }
      } */
    }
    .imageWrap {
      width: 30%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
  .westArea {
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
    background: #f7f3ef;
    border-radius: 12px;
    border: none;
    width: 343px;
    height: 100px;
    padding: 14px;
    div {
      width: 70%;
      height: auto;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        color: #4f4f4f;
        width: 50%;
        opacity: 1;
      }
      p {
        width: 70%;
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 150%;
        color: #000000;
        opacity: 0.2;
      }
      /* :hover {
        background: #eee9e4;
        .title {
          opacity: 1;
        }
      } */
    }
    .imageWrap {
      width: 30%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
  .southArea {
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
    background: #f7f3ef;
    border-radius: 12px;
    border: none;
    width: 343px;
    height: 100px;
    padding: 14px;
    div {
      width: 70%;
      height: auto;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        color: #4f4f4f;
        width: 50%;
        opacity: 1;
      }
      p {
        width: 70%;
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 150%;
        color: #000000;
        opacity: 0.2;
      }
      /* :hover {
        background: #eee9e4;
        .title {
          opacity: 1;
        }
      } */
    }
    .imageWrap {
      width: 30%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
  .northArea {
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
    background: #f7f3ef;
    border-radius: 12px;
    border: none;
    width: 343px;
    height: 100px;
    padding: 14px;
    div {
      width: 70%;
      height: auto;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        color: #4f4f4f;
        width: 50%;
        opacity: 1;
      }
      p {
        width: 70%;
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 150%;
        color: #000000;
        opacity: 0.2;
      }
      /* :hover {
        background: #eee9e4;
        .title {
          opacity: 1;
        }
      } */
    }
    .imageWrap {
      width: 30%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const OpenChat = styled.div`
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 110%;
    color: #333333;
    width: 90%;
    margin: 0 auto 12px auto;
  }
`;
export default MobileMain;
