import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "react-query";
import instance from "../shared/axios";
import CompleteModal from "./CompleteModal";
const WriteFooter = ({
  title,
  thumbnail,
  reset,
  getValues,
  open,
  setOpen,
  isHost,
  address,
  content
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const temporary = useMutation(["tempPost"], (formData) =>
    instance.post("/post", formData).then((res) => {
      console.log(res.data);
    })
  );
  const tempPost = () => {
    console.log(`${address} ${getValues("subAddress")}`);
    console.log(getValues());
    // const post = {
    //   title: title,
    //   postContent: content,
    // tripLocation: `${address} ${getValues('subAddress')}`
    // };
    // const formData = new FormData();
    // // thumbnail.forEach((file) => formData.append("file", file));
    // formData.append("file", thumbnail);
    // const json = JSON.stringify(post);
    // const blob = new Blob([json], { type: "application/json" });
    // formData.append("contents", blob);

    // temporary.mutate(formData)
  };
  return (
    <Wrap>
      <input
        type="button"
        onClick={() => {
          const confirm = window.confirm("작성을 취소 할까요?");
          if (confirm) {
            reset();
            navigate(-1);
            console.log("취소");
          }
        }}
        value="작성 취소"
      ></input>
      <div className="post">
        <input
          type="button"
          value="임시 저장"
          onClick={() => {
            tempPost();
          }}
        ></input>
        <CompleteModal open={open} setOpen={setOpen} isHost={isHost} />
      </div>
    </Wrap>
  );
};
const Wrap = styled.footer`
  width: 100%;
  height: 100px;
  position: fixed;
  background-color: lightgray;
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
    cursor: pointer;
    :hover {
      background: #8e8e93;
      color: white;
    }
  }
  .post {
    display: flex;
  }
  button {
    width: 180px;
    height: 68px;
    border-radius: 10px;
    border: 1px solid #8e8e93;
    background-color: transparent;
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
