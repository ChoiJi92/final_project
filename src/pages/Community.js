import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../shared/axios";
import all from "../assests/css/모두보기.png";
import land from "../assests/css/내륙.png";
import tour from "../assests/css/관광지근처.png";
import town from "../assests/css/조용한마을.png";
import scrap from "../assests/css/scrap.png";
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
  const { data } = useQuery(["content"], () =>
    instance.get("/post").then((res) => {
      console.log(res.data.allPost)
      return res.data.allPost
      // return res.data
    }),{
      refetchOnWindowFocus:false  // 다른화면 갔다와도 재호출 안되게 함
    }
  );
 
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
                  {/* <img src={like} alt="좋아요"></img> */}
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

          <h2>내 기준 제주에서 <br/>제일 예쁜 카페에요!!!</h2>
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
          <Card key={v.postId} >
            <div>
              <div className="user">글쓴이</div>
              <h1 className="title" onClick={()=>{navigate(`/community/${v.postId}`)}}>{v.title}</h1>
              <div className="like">좋아요,댓글</div>
            </div>
            <img src={v.thumbnailURL}alt="이미지"></img>
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
  width: 80%;
  display: flex;
  flex-direction: row;
  margin: 40px 0;
  overflow: hidden;
  .leftImage {
    /* width: 887px; */
    width: 80%;
    height: 500px;
    /* border: 1px solid; */
    border-radius: 20px;
    margin-right: 10px;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .rightImage {
    /* width: 433px; */
    width: 40%;
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
      color: white;
      width: 40%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
  padding: 20px;
  color: white;
  white-space: nowrap;
  h2 {
    margin-bottom: 10px;
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
      width: 40px;
      height: 40px;
      border: 1px solid;
      border-radius: 50%;
      margin-right: 5px;
    }
    p {
      font-size: large;
    }
  }
  .like {
    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    /* border: 1px solid; */
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    }
    button {
      width: 40%;
      height: 40px;
      border-radius: 5px;
      border: none;
      font-size: medium;
      background-color: white;
      color: black;
      cursor: pointer;
    }
  }
`;
const Middle = styled.div`
  width: 100%;
  padding: 0 170px;
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
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;
`;
const Card = styled.div`
  width: 100%;
  height: 200px;
  padding-bottom: 30px;
  border-bottom: 1px solid;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  img{
    object-fit: cover;
  }
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
  div {
    position: relative;
    width: 60%;
  }
  .user {
    color: gray;
    margin-bottom: 10px;
  }
  .title {
    margin-bottom: 10px;
    font-size: 40px;
  }
  .like {
    position: absolute;
    bottom: 0;
    font-size: 20px;
  }
  img {
    border: 1px solid;
    width: 32%;
    border-radius: 10px;
  }
`;

export default Community;
