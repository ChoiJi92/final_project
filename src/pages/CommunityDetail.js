import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Comment from "../components/Comment";
import instance from "../shared/axios";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import KakaoShare from "../components/KakaoShare";
import shareIcon from "../assests/css/shareIcon.png";

const CommunityDetail = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  console.log(params.id);
  const navigate = useNavigate();
  // const [comment, setComment] = useState();
  const commentRef = useRef();
  // const commentChange = (e) => {
  //   setComment(e.target.value);
  // };
  const userId = localStorage.getItem("userId");
  const userImage = localStorage.getItem("userImage");
  const { data } = useQuery(
    ["detailContent"],
    () =>
      instance.get(`/post/${params.id}`).then((res) => {
        console.log(res.data);
        // return res.data.post[0];
        return res.data.post[0];
      }),
    {
      // retry: false, // 재호출 안하기
      refetchOnWindowFocus: false, // 다른화면 갔다와도 재호출 안되게 함
    }
  );
  // 코멘트 로드
  const loadComment = useQuery(
    ["loadComment"],
    () =>
      instance.get(`/post/${params.id}/comment`).then((res) => {
        console.log(res.data);
        // return res.data.post[0];
        return res.data;
      }),
    {
      // retry: false, // 재호출 안하기
      refetchOnWindowFocus: false, // 다른화면 갔다와도 재호출 안되게 함
    }
  );
  const commentData = loadComment.data
  console.log(commentData)
  // 코멘트 생성
  const createComment = useMutation(
    ["createComment"],
    (comment) =>
      instance
        .post(`/post/${params.id}`,{comment})
        .then((res) => console.log(res.data)),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("detailContent");
      },
    }
  );
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(commentRef.current.value)
      createComment.mutate(commentRef.current.value);
      commentRef.current.value = "";
    }
  };
  const deleteContent = useMutation(
    ["deleteContent"],
    (postId) =>
      instance.delete(`/post/${postId}`).then((res) => console.log(res.data)),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("content");
      },
    }
  );
  return (
    <Container>
      <Image image={data.thumbnailURL}></Image>
      <Wrap>
        <Content>
          <div>
            <h1>{data.title}</h1>
            <User>
              <div className="profileImage">
                <img src={data.userImage} alt="프로필"></img>
                <div className="profile">
                  <div className="nickname">{data.nickname}</div>
                  <div className="time">2시간 전</div>
                </div>
              </div>
              <Button>
                {userId !== data.userId ? (
                  <>
                    <KakaoShare></KakaoShare>
                    <button>좋아요</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate(`/userwrite/${params.id}`);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        deleteContent.mutate(data.postId);
                        navigate("/community");
                      }}
                    >
                      삭제
                    </button>
                  </>
                )}
              </Button>
            </User>
          </div>
          <div className="post">
            <Viewer initialValue={data.content}></Viewer>
          </div>
        </Content>
        <div className="otherContent">관련글</div>
      </Wrap>
      <WrapBottom>
        <h2>포스팅에 나온 숙소보러가기</h2>
        <div></div>
      </WrapBottom>
      <Count>
        <div className="likeShare">
          <div>
            <p>좋아요 00개</p>
            <p>스크랩 00개</p>
            <p>댓글 00개</p>
          </div>
          <img src={shareIcon} alt="공유하기" />
        </div>
      </Count>
      <CommentWrap>
        <h3>댓글 00</h3>
        <div className="comment">
          <img src={userImage} alt="기본이미지"></img>
          <div className="commentInput">
            <input
              ref={commentRef}
              placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다."
              onKeyPress={onKeyPress}
            ></input>
            <button
              onClick={() => {
                createComment.mutate(commentRef.current.value);
                commentRef.current.value = "";
              }}
            >
              입력
            </button>
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
  border-radius: 20px;
  width: 80%;
  height: 550px;
  margin: 40px 0;
  background: url(${(props) => props.image}) no-repeat;
  background-size: cover;
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
  width: 70%;
  height: 800px;
  h1 {
    margin-bottom: 30px;
  }
  .post {
    margin-top: 20px;
    .toastui-editor-contents p {
      font-size: 16px;
    }
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
    cursor: pointer;
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
  width: 80%;
  margin-bottom: 50px;
  .likeShare {
    width: 61%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  div {
    display: flex;
    flex-direction: row;
  }
  p {
    margin-right: 20px;
  }
  img {
    cursor: pointer;
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
