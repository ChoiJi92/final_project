import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import editIcon from "../assests/css/editIcon.png";
import deleteIcon from "../assests/css/deleteIcon.png";
import checkIcon from "../assests/css/checkIcon.webp";
import cancelIcon from "../assests/css/cancelIcon.webp";
import instance from "../shared/axios";
const Comment = ({ value, index }) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const commentRef = useRef();
  const [edit, setEdit] = useState(false);
  const userId = localStorage.getItem("userId");
  // 댓글 수정
  const updateComment = useMutation(
    ["updateComment"],
    (comment) =>
      instance
        .put(`/post/${params.id}/${value.commentId}`, { comment })
        .then((res) => {
          // console.log(res.data)
          return res.data;
        }),
    {
      onSuccess: () => {
        // update 성공하면 'loadComment'라는 key를 가진 친구가 실행
        // console.log("성공");
        queryClient.invalidateQueries("loadComment");
      },
    }
  );
  // 댓글 삭제
  const deleteComment = useMutation(
    ["deleteComment"],
    (commentId) =>
      instance.delete(`/post/${params.id}/${commentId}`).then((res) => {
        // console.log(res.data);
        return res.data
      }),
    {
      onSuccess: () => {
        // delete 성공하면 'detailContent'라는 key를 가진 친구가 실행
        queryClient.invalidateQueries("loadComment");
      },
    }
  );
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      updateComment.mutate(commentRef.current.value);
      // commentRef.current.value = "";
      setEdit(false);
    }
  };
  return (
    <Wrap key={value.commentId}>
      <div className="userWrap">
        <img src={value.userImageURL} alt="프로필"></img>
        <div className="content">
          <h3 className="nickName">{value.nickname}</h3>
          {!edit ? (
            <>
              <div className="comment">{value.comment}</div>
              {/* <div className="date">2시간 전</div> */}
            </>
          ) : (
            <input
              onKeyPress={onKeyPress}
              autoFocus
              ref={commentRef}
              placeholder="칭찬과 격려의 댓글 수정"
            ></input>
          )}
        </div>
      </div>
      {userId === value.userId ? (
        <>
          {!edit ? (
            <Button>
              <button
                onClick={() => {
                  setEdit(true);
                }}
              >
                수정
                <img className="editIcon" src={editIcon} alt="수정" />
              </button>
              <button
                onClick={() => {
                  deleteComment.mutate(value.commentId);
                }}
              >
                삭제
                <img className="deleteIcon" src={deleteIcon} alt="삭제" />
              </button>
            </Button>
          ) : (
            <Button>
              <button
                onClick={() => {
                  if (commentRef.current.value === "") {
                    window.alert("댓글을 입력해 주세요:)");
                  } else {
                    updateComment.mutate(commentRef.current.value);
                    // commentRef.current.value = "";
                    setEdit(false);
                  }
                }}
              >
                등록
                <img className="checkIcon" src={checkIcon} alt="삭제" />
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                }}
              >
                취소
                <img className="cancelIcon" src={cancelIcon} alt="삭제" />
              </button>
            </Button>
          )}
        </>
      ) : (
        <></>
      )}
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 53px;
  width: 67.5%;
  .userWrap {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    margin-right: 30px;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    input {
      width: 100%;
      height: 72px;
      padding-left: 10px;
      background: #f7f3ef;
      border-radius: 10px;
      border: none;
      padding: 20px;
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 160%;
      outline: none;
    }
  }
  .nickName {
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    /* line-height: 160%; */
  }
  .comment {
    margin-bottom: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    /* line-height: 32px; */
  }
  .date {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    /* line-height: 32px; */
  }
`;
const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 30%;
  .editIcon {
    width: 32px;
    height: 32px;
    margin: 0 0 0 6px;
  }
  .deleteIcon {
    width: 32px;
    height: 32px;
    margin: 0 0 0 6px;
  }
  .checkIcon {
    width: 32px;
    height: 32px;
    margin: 0 0 0 6px;
  }
  .cancelIcon {
    width: 32px;
    height: 32px;
    margin: 0 0 0 6px;
  }
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* width: 100%; */
    width: 106px;
    height: 72px;
    border-radius: 10px;
    border: none;
    margin-left: 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 160%;
    background-color: #f7f3ef;
    color: #8e8e93;
    cursor: pointer;
  }
`;
export default Comment;
