import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../shared/axios";

const Community = () => {

  const navigate = useNavigate()
  const { data } = useQuery(["content"], () =>
    instance.get("/post").then((res) => res.data),{
      refetchOnWindowFocus:false  // 다른화면 갔다와도 재호출 안되게 함
    }
  );
  return (
    <Container>
      <Top>
        <div className="leftImage"></div>
        <div className="rightImage"></div>
      </Top>
      <Middle>
        <div>
          <div></div>
          <p>모두보기</p>
        </div>
        <div>
          <div></div>
          <p>내륙</p>
        </div>
        <div>
          <div></div>
          <p>관광지 근처</p>
        </div>
        <div>
          <div></div>
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
          <Card key={v.id} onClick={()=>{
            navigate(`/community/${v.id}`)
          }}>
            <div>
              <div className="user">글쓴이</div>
              <h1 className="title" >{v.title}</h1>
              <div className="like">좋아요,댓글</div>
            </div>
            <img alt="이미지"></img>
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
  display: flex;
  flex-direction: row;
  margin: 40px 0;
  .leftImage {
    width: 887px;
    height: 550px;
    border: 1px solid;
    margin-right: 10px;
  }
  .rightImage {
    width: 433px;
    height: 550px;
    border: 1px solid;
  }
`;

const Middle = styled.div`
  width: 100%;
  padding: 0 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid;

  div {
    width: 100px;
    height: 100px;
    cursor: pointer;
    :hover {
      border-bottom: 2px solid;
    }
    div {
      width: 60px;
      height: 60px;
      border: 1px solid;
      margin: 0 auto;
    }
    p {
      margin-top: 5px;
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
  cursor: pointer;
  :hover{
    .title{
      color:#64b5f6
    }
    img{
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
