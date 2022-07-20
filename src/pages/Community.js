import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../shared/axios";
import all from "../assests/css/해변근처.webp";
import land from "../assests/css/내륙.webp";
import tour from "../assests/css/관광지근처.webp";
import town from "../assests/css/조용한마을.webp";
import scrap from "../assests/css/scrap.png";
import unlike from "../assests/css/unlikeIcon.png";
import nextIcon from "../assests/css/nextIcon.png";
import jeju7 from "../assests/css/제주1.jpeg";
import jeju8 from "../assests/css/제주2.jpeg";
import jeju9 from "../assests/css/제주3.jpg";
import jeju10 from "../assests/css/제주4.jpeg";
import jeju11 from "../assests/css/제주5.jpg";
import jeju12 from "../assests/css/제주6.jpeg";
import jeju13 from "../assests/css/제주8.jpeg";
import jeju14 from "../assests/css/제주9.jpeg";

const Community = () => {
  const navigate = useNavigate();
  const { data } = useQuery(
    ["content"],
    () =>
      instance.get("/post").then((res) => {
        console.log(res.data.allPost);
        return res.data.allPost;
      }),
    {
      refetchOnWindowFocus: false, // 다른화면 갔다와도 재호출 안되게 함
    }
  );
    const title = "내 기준 제주에서 제일 예쁜 카페에요!!!"
  const listImg = [jeju7, jeju8, jeju9, jeju10, jeju11, jeju12, jeju13, jeju14];
  const [count, setCount] = useState(0);
  return (
    <Container>
      <Top>
        <div
          className="leftImage"
          style={{ backgroundImage: `url(${listImg[count]})` }}
        >
          <Wrap>
            <h2>이직 전 제주에서 한달동안 힐링하기</h2>
            <div className="wrap">
              <div className="user">
                <img alt="프로필"></img>
                <p>최지훈</p>
              </div>
              <div className="like">
                <div>
                  <img src={unlike} alt="좋아요"></img>
                  <p>00개</p>
                </div>
                <div>
                  <img src={scrap} alt="공유"></img>
                  <p>00개</p>
                </div>
                <button>보러가기</button>
              </div>
            </div>
          </Wrap>
        </div>
        <div
          className="rightImage"
          style={{
            backgroundImage: `url(${
              listImg[count < listImg.length - 1 ? count + 1 : 0]
            })`,
          }}
        >
          <div
            onClick={() => {
              if (count < listImg.length - 1) {
                setCount((prev) => prev + 1);
              } else {
                setCount(0);
              }
            }}
          >
            <img src={nextIcon} alt="다음"></img>
          </div>
          <h2>{title.slice(0,18)}...</h2>
        </div>
      </Top>
      <Middle>
        <div>
          <img src={all} alt="모두보기"></img>
          <p>모두보기</p>
        </div>
        <div>
          <img src={land} alt="내륙"></img>
          <p>내륙</p>
        </div>
        <div>
          <img src={tour} alt="관광지 근처"></img>
          <p>관광지 근처</p>
        </div>
        <div>
          <img src={town} alt="조용한 마을"></img>
          <p>조용한 마을</p>
        </div>
        <div>
          <div></div>
          <p>우도</p>
        </div>
        <div>
          <div></div>
          <p>성산일출봉</p>
        </div>
      </Middle>
      <Bottom>
        {data.map((v) => (
          <Card key={v.postId}>
            <div className="leftContent">
              <div className="user">{v.nickname}</div>
              <h1
                className="title"
                onClick={() => {
                  navigate(`/community/${v.postId}`);
                }}
              >
                {v.title}
              </h1>
              <div className="like">
                좋아요{v.likeNum}개, 댓글{v.commentNum}개
              </div>
            </div>
            <img src={v.thumbnailURL} alt="이미지"></img>
          </Card>
        ))}
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Top = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  margin: 40px 0 50px 0;
  overflow: hidden;
  .leftImage {
    /* width: 887px; */
    width: 66%;
    height: 500px;
    /* border: 1px solid; */
    border-radius: 20px;
    margin-right: 20px;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    /* background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%) */                     
  }
  .rightImage {
    /* width: 433px; */
    width: 32%;
    height: 500px;
    border-radius: 20px;
    /* border: 1px solid; */
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* align-items: center; */
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    :hover {
      div {
        display: flex;
      }
    }
    div {
      border: none;
      border-radius: 50%;
      margin-right: 20px;
      width: 50px;
      height: 50px;
      background-color: #f2f2f7;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      display: none;
      top: 50%;
      right: 10px;
      cursor: pointer;
    }
    h2 {
      /* border: 1px solid; */
      color: white;
      width: 55%;
      overflow: hidden;
      /* white-space: nowrap; */
      text-overflow: ellipsis;
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 46px;
    }
  }
`;
const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  /* justify-content: flex-end; */
  position: absolute;
  bottom: 0;
  padding: 0 26px 30px 30px;
  /* border: 1px solid black; */
  color: white;
  white-space: nowrap;
  h2 {
    font-weight: 700;
    font-size: 32px;
    line-height: 46px;
    margin-bottom: 20px;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
  }
  .user {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    width: 30%;
    img {
      width: 42px;
      height: 42px;
      border: 1px solid;
      border-radius: 50%;
      margin-right: 10px;
    }
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 35px;
    }
  }
  .like {
    width: 53%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 40px;
      p {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 29px;
      }
      img {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
    }
    button {
      width: 51%;
      /* width: 200px; */
      height: 56px;
      border-radius: 16px;
      border: none;
      font-weight: 700;
      font-size: 21px;
      line-height: 30px;
      background-color: white;
      color: #636366;
      cursor: pointer;
    }
  }
`;
const Middle = styled.div`
  width: 100%;
  padding: 0 280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid;
  div {
    /* border: 1px solid; */
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    cursor: pointer;
    :hover {
      border-bottom: 3px solid #9090a0;
    }
    img {
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    p {
      margin-top: 5px;
      color: #828282;
      text-align: center;
    }
  }
`;
const Bottom = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;
`;
const Card = styled.div`
  width: 100%;
  height: 362px;
  padding-bottom: 30px;
  border-bottom: 1px solid;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  cursor: pointer;
  :hover {
    .title {
      color: #64b5f6;
    }
    img {
      box-shadow: rgb(0 0 0 / 50%) 0px 5px 10px 0px;
      transform: translateY(-10px);
    }
  }
  .leftContent {
    height: 90%;
  }
  div {
    position: relative;
    width: 60%;
    /* height: 80%; */
    /* border: 1px solid; */
  }
  .user {
    color: #aeaeb2;
    margin-bottom: 28px;
    font-weight: 600;
    font-size: 27px;
    line-height: 32px;
  }
  .title {
    margin-bottom: 35px;
    font-style: normal;
    font-weight: 600;
    font-size: 52px;
    line-height: 62px;
  }
  .like {
    position: absolute;
    bottom: 0;
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    color: #636366;
  }
  img {
    border: none;
    width: 39%;
    border-radius: 20px;
    object-fit: cover;
  }
`;

export default Community;
