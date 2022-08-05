import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const CommentList = ({data}) => {
  return (
    <CommentWrap>
      {data.map((v) => 
      <Comment key={v.commentId} value={v}></Comment>
      )}
    </CommentWrap>
  );
};

const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-bottom: 10px;
`;

export default CommentList;
