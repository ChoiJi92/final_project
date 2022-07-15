import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from '../shared/axios';
const Comment = ({value,index}) => {
    const queryClient = useQueryClient()
    const params = useParams()
    const commentRef = useRef()
    const [edit, setEdit] = useState(false);
    // 댓글 수정
  const updateComment = useMutation(
    ["updateComment",value.commentId],
    (comment) =>{
      instance.put(`/post/${params.id}/${value.commentId}`,{comment}).then((res) => console.log(res.data))},
    {
      onSuccess: () => {
        // update 성공하면 'detailContent'라는 key를 가진 친구가 실행 
        queryClient.invalidateQueries("loadComment");
      },
    }
  );
  // 댓글 삭제
  const deleteComment = useMutation(
    ["deleteComment"],
    (commentId) =>
      instance.delete(`/post/${params.id}/${commentId}`).then((res) => console.log(res.data)),
    {
      onSuccess: () => {
        // delete 성공하면 'detailContent'라는 key를 가진 친구가 실행 
        queryClient.invalidateQueries("loadComment");
      },
    }
  );
  const onKeyPress = (e) =>  {
    if(e.key==='Enter'){
        updateComment.mutate(commentRef.current.value)
        commentRef.current.value=""
        setEdit(false);
    }
  }
    return (
        <Wrap key={value.commentId}>
        <img src={value.userImage} alt="프로필"></img>
        <div className="content">
          <h3 className="nickName">{value.nickname}</h3>
          {!edit ? (
            <>
              <div className="comment">{value.comment}</div>
              <div className="date">2시간 전</div>
            </>
          ) : (
            <input onKeyPress={onKeyPress} autoFocus ref={commentRef}></input>
          )}
        </div>
        {!edit ? (
          <Button>
            <button
              onClick={() => {
                setEdit(true);
              }}
            >
              수정
            </button>
            <button onClick={()=>{
              deleteComment.mutate(value.commentId)
            }}>삭제</button>
          </Button>
        ) : (
          <Button>
            <button
              onClick={() => {
                updateComment.mutate(commentRef.current.value)
                commentRef.current.value=""
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
    );
};
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
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