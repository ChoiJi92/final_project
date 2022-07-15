import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const CommentList = ({data}) => {
  return (
    <CommentWrap>
      {data.map((v,i) => 
      <Comment key={v.commentId} value={v} index={i}></Comment>
      )}
    </CommentWrap>
  );
};

const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 20px 0;
`;

export default CommentList;
