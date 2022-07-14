import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../shared/axios";

const Comment = () => {
  const queryClient = useQueryClient()
  const params = useParams()
  const commentRef = useRef()
  const [edit, setEdit] = useState(false);
 
  // 댓글 수정
  const updateComment = useMutation(
    ["updateComment"],
    (comment) =>
      instance.patch(`/post/${params.id}`,{comment}).then((res) => console.log(res.data)),
    {
      onSuccess: () => {
        // update 성공하면 'detailContent'라는 key를 가진 친구가 실행 
        queryClient.invalidateQueries("detailContent");
      },
    }
  );
  // 댓글 삭제
  const deleteComment = useMutation(
    ["deleteComment"],
    () =>
      instance.delete(`/post/${params.id}`).then((res) => console.log(res.data)),
    {
      onSuccess: () => {
        // delete 성공하면 'detailContent'라는 key를 가진 친구가 실행 
        queryClient.invalidateQueries("detailContent");
      },
    }
  );
  return (
    <CommentList>
      <Wrap>
        <img alt="프로필"></img>
        <div className="content">
          <h3 className="nickName">댓글 작성자 이름</h3>
          {!edit ? (
            <>
              <div className="comment">꼼꼼한 포스팅 감사합니다!</div>
              <div className="date">2시간 전</div>
            </>
          ) : (
            <input autoFocus ref={commentRef}></input>
          )}
        </div>
        {!edit ? (
          <Button>
            <button
              onClick={() => {
                updateComment.mutate(commentRef.current.value)
                commentRef.current.value=""
                setEdit(true);
              }}
            >
              수정
            </button>
            <button onClick={()=>{
              deleteComment.mutate()
            }}>삭제</button>
          </Button>
        ) : (
          <Button>
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              등록
            </button>
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              취소
            </button>
          </Button>
        )}
      </Wrap>
    </CommentList>
  );
};

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 20px 0;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .content {
    width: 40%;
    input {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      padding-left: 10px;
    }
  }
  .nickName {
    margin-bottom: 10px;
  }
  .comment {
    margin-bottom: 5px;
  }
  .date {
    color: gray;
    font-size: small;
  }
`;
const Button = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin-left: 10px;
    width: 50%;
    height: 40px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
`;
export default Comment;
