import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Comment from "../components/Comment";
import instance from "../shared/axios";

const CommunityDetail = () => {
  const params = useParams();
  const [comment, setComment] = useState();
  const commentChange = (e) => {
    setComment(e.target.value);
  };
  const postComment = useMutation(["postComment", comment], () =>
    instance.post(`/post/${params.id}`).then((res) => console.log(res.data))
  );
  // const postComment
  return (
    <Container>
      <Image></Image>
      <Wrap>
        <Content>
          <div>
            <h1>김녕해수욕장 근처에서 한달 살고 왔어요.</h1>
            <User>
              <div className="profileImage">
                <img alt="프로필"></img>
                <div className="profile">
                  <div className="nickname">글쓴이 이름</div>
                  <div className="time">2시간 전</div>
                </div>
              </div>
              <Button>
                <button>공유</button>
                <button>좋아요</button>
              </Button>
            </User>
          </div>
          <div className="post">컨텐츠 내용들</div>
        </Content>
        <div className="otherContent">관련글</div>
      </Wrap>
      <WrapBottom>
        <h2>포스팅에 나온 숙소보러가기</h2>
        <div></div>
      </WrapBottom>
      <Count>
        <p>좋아요 00개</p>
        <p>스크랩 00개</p>
        <p>댓글 00개</p>
      </Count>
      <CommentWrap>
        <h3>댓글 00</h3>
        <div className="comment">
          <img alt="기본이미지"></img>
          <div className="commentInput">
            <input onChange={commentChange} value={comment || ""} placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다."></input>
            <button onClick={() =>{
              postComment.mutate()
              setComment("")
            }}>입력</button>
          </div>
        </div>
      </CommentWrap>
      <Comment></Comment>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Image = styled.div`
  border: 1px solid;
  width: 80%;
  height: 550px;
  margin: 40px 0;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 80px;
  .otherContent {
    width: 29%;
    height: 600px;
    border: 1px solid;
    border-radius: 5px;
  }
`;
const Content = styled.div`
  border: 1px solid;
  width: 70%;
  height: 800px;
  h1 {
    margin-bottom: 30px;
  }
  .post {
    margin-top: 20px;
    border: 1px solid;
  }
`;
const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .profileImage {
    width: 50%;
    display: flex;
    flex-direction: row;
  }
  img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    border: 2px solid;
  }
  .profile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 0;
    margin-left: 10px;
    .nickname {
      font-size: 20px;
      font-weight: 500;
    }
  }
`;
const Button = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    width: 30%;
    height: 40px;
    border-radius: 5px;
    border: none;
    margin-left: 10px;
    font-size: 15px;
  }
`;
const WrapBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 20px 0;
  border-bottom: 1px solid;
  div {
    margin: 30px 0;
    width: 60%;
    height: 200px;
    border: 1px solid;
  }
`;
const Count = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-bottom: 50px;
  p {
    margin-right: 20px;
  }
`;
const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 30px;
  font-size: large;
  .comment {
    width: 100%;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    margin-top: 20px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .commentInput {
      width: 50%;
      display: flex;
      align-items: center;
      border: 1px solid;
      border-radius: 10px;
      margin-left: 20px;
      input {
        width: 90%;
        margin-left: 15px;
        height: 80px;
        border: none;
        outline: none;
        font-size: large;
      }
      button {
        height: 80px;
        background-color: transparent;
        border: none;
        font-size: large;
        cursor: pointer;
      }
    }
  }
`;
export default CommunityDetail;
