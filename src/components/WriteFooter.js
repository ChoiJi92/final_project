import React from "react";
import { useNavigate} from "react-router-dom";
import styled from "styled-components";

import CompleteModal from "./CompleteModal";
const WriteFooter = ({
  reset,
  open,
  setOpen,
  isHost,
}) => {
  const navigate = useNavigate()
  return (
    <Wrap>
      <input
        type="button"
        onClick={() => {
          const confirm = window.confirm("작성을 취소 할까요?");
          if (confirm) {
            reset();
            navigate(-1);
          }
        }}
        value="작성 취소"
      ></input>
      <div className="post">
        <CompleteModal open={open} setOpen={setOpen} isHost={isHost} />
      </div>
    </Wrap>
  );
};
const Wrap = styled.footer`
  width: 100%;
  height: 100px;
  position: fixed;
  background-color:  #F7F3EF;;
  bottom: 0;
  padding: 0 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  input {
    width: 180px;
    height: 68px;
    border: 1px solid #8e8e93;
    border-radius: 10px;
    background-color: transparent;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    opacity: 0.2;
    cursor: pointer;
    :hover {
      opacity: 1;
      background:linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #EEE9E4;
      color: white;
      border: none;
    }
  }
  .post {
    display: flex;
  }
  button {
    width: 180px;
    height: 68px;
    border-radius: 10px;
    border: none;
    margin-left: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    cursor: pointer;
    :hover {
      background: #8e8e93;
      color: white;
    }
  }
`;
export default WriteFooter;
