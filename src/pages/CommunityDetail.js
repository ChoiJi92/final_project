import React, { useRef} from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../shared/axios";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import editIcon from "../assests/css/editIcon.png";
import deleteIcon from "../assests/css/deleteIcon.png";
import unlikeIcon from "../assests/css/unlikeIcon.png";
import likeIcon from "../assests/css/likeIcon.png";
import CommentList from "../components/CommentList";
import Share from "../components/Share";
import Share2 from "../components/Share2";

const CommunityDetail = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const commentRef = useRef();

  const userId = localStorage.getItem("userId");
  const userImage = localStorage.getItem("userImage");
  const { data } = useQuery(
    ["detailContent",params.id],
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
        console.log('전체코멘트',res.data.comments)
        return res.data.comments;
      }),
    {
      // retry: false, // 재호출 안하기
      refetchOnWindowFocus: false, // 다른화면 갔다와도 재호출 안되게 함
    }
  );
  const commentData = loadComment.data;

  // 코멘트 생성
  const createComment = useMutation(
    ["createComment"],
    (comment) =>
      instance
        .post(`/post/${params.id}/comment`, { comment })
        .then((res) => console.log(res.data)),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("loadComment");
      },
    }
  );
    // 좋아요
    const Like = useMutation(
      ["Like"],
      () =>
        instance
          .post(`/like/${params.id}`)
          .then((res) => console.log(res.data)),
      {
        onSuccess: () => {
          // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
          queryClient.invalidateQueries("detailContent");
        },
      }
    );
    // 좋아요 취소
    const unLike = useMutation(
      ["unLike"],
      () =>
        instance
          .delete(`/like/${params.id}/unlike`)
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
      createComment.mutate(commentRef.current.value);
      commentRef.current.value = "";
    }
  };
  const deleteContent = useMutation(
    ["deleteContent"],
    (postId) =>
      instance.delete(`/post/${postId}`).then((res) => {
        console.log(res.data)
      navigate(-1)}),
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
          <div className="hashTag">
            <p>#제주도 동부</p>
            <p>#김녕해수욕장</p>
            <p>#사람없는</p>
          </div>
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
                 <Share data={data}></Share>
                    {/* <button onClick={() => {}}>
                      공유
                      <img className="shareIcon" src={shareIcon2} alt="공유" />
                    </button> */}
                    {data.islike ? (
                      <button style={{ width: "40%" }} onClick={() => {
                        unLike.mutate()

                      }}>
                        좋아요
                        <img
                          className="unlikeIcon"
                          src={likeIcon}
                          alt="좋아요"
                        />
                      </button>
                    ) : (
                      <button style={{ width: "40%" }} onClick={() => {
                        Like.mutate()
                      }}>
                        좋아요
                        <img
                          className="unlikeIcon"
                          src={unlikeIcon}
                          alt="좋아요"
                        />
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate(`/userwrite/${params.id}`);
                      }}
                    >
                      수정
                      <img className="editIcon" src={editIcon} alt="수정" />
                    </button>
                    <button
                      onClick={() => {
                        deleteContent.mutate(data.postId);
                        navigate("/community");
                      }}
                    >
                      삭제
                      <img className="deleteIcon" src={deleteIcon} alt="삭제" />
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
            <p>좋아요 {data.likeNum}개</p>
            <p>스크랩 00개</p>
            <p>댓글 {commentData.length}개</p>
          </div>
          {/* <img src={shareIcon} alt="공유하기" /> */}
          <Share2 data={data}></Share2>
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
      <CommentList data={commentData}></CommentList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Image = styled.div`
  border-radius: 20px;
  width: 70%;
  height: 550px;
  margin: 40px 0 60px 0;
  background: url(${(props) => props.image}) no-repeat;
  background-size: cover;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  margin-bottom: 80px;
  .otherContent {
    width: 32%;
    height: 657px;
    padding: 20px;
    border-radius: 20px;
    margin-left: 20px;
    box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.2);
  }
`;
const Content = styled.div`
  width: 70%;
  height: 800px;
  .hashTag {
    height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
    p {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      width: 173px;
      height: 45px;
      border-radius: 10px;
      border: none;
      background: #c7c7cc;
      font-size: 21px;
      font-weight: 600;
      line-height: 25.06px;
    }
  }
  h1 {
    margin-bottom: 60px;
    font-weight: 600;
    font-size: 48px;
    line-height: 57px;
  }
  .post {
    margin-top: 50px;
    .toastui-editor-contents p {
      /* font-weight: 300; */
      font-size: 18px;
      line-height: 150%;
    }
    .toastui-editor-contents img {
      border-radius: 20px;
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
    align-items: center;
    img {
      border-radius: 50%;
      width: 96px;
      height: 96px;
    }
  }
  .profile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 84px;
    margin-left: 30px;
    .nickname {
      font-size: 28px;
      font-weight: 500;
      line-height: 42px;
    }
    .time {
      font-size: 28px;
      font-weight: 300;
      line-height: 42px;
    }
  }
`;
const Button = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .shareIcon {
    width: 32px;
    height: 32px;
    margin-left: 6px;
  }
  .unlikeIcon {
    width: 32px;
    height: 32px;
    margin-left: 10px;
  }
  .editIcon {
    width: 32px;
    height: 32px;
    margin-left: 6px;
  }
  .deleteIcon {
    width: 32px;
    height: 32px;
    margin-left: 10px;
  }
  button {
    /* width: 128px; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 35%;
    height: 58px;
    border-radius: 10px;
    border: none;
    margin-left: 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 160%;
    background-color: #e5e5ea;
    color: #48484a;
    cursor: pointer;
  }
`;
const WrapBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 151px 0 30px 0;
  border-bottom: 1px solid;
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    color: #48484a;
  }
  div {
    margin: 24px 0 50px 0;
    width: 67%;
    height: 300px;
    border: none;
    background: #ffffff;
    box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
  }
`;
const Count = styled.div`
  width: 70%;
  margin-bottom: 54px;
  .likeShare {
    width: 67%;
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
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
  }
  img {
    cursor: pointer;
  }
`;
const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-bottom: 50px;
  font-size: large;
  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 43px;
    color: #000000;
  }
  .comment {
    width: 100%;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    margin-top: 30px;
    img {
      width: 96px;
      height: 96px;
      border-radius: 50%;
    }
    .commentInput {
      width: 58%;
      display: flex;
      align-items: center;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      margin-left: 30px;
      input {
        width: 89%;
        margin-left: 15px;
        height: 80px;
        border: none;
        outline: none;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
      }
      button {
        border: 1px solid;
        height: 80px;
        background-color: transparent;
        border: none;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #8e8e93;
        cursor: pointer;
      }
    }
  }
`;
export default CommunityDetail;
