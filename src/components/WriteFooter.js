import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addressState, contentState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import instance from "../shared/axios";
const WriteFooter = ({ title,thumbnail,reset, getValues,onSubmit }) => {
  const navigate = useNavigate();
  const address = useRecoilValue(addressState);
  const content = useRecoilValue(contentState);
  const temporary = useMutation(['tempPost'],(formData) => instance.post('/post',formData).then((res)=>{
    console.log(res.data)
  }))
  const tempPost = () =>{
    console.log(`${address} ${getValues('subAddress')}`)
    console.log(getValues())
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
  }
  return (
    <Wrap>
      <input
        type="button"
        onClick={() => {
          // reset();
          // navigate(-1);
          const confirm = window.confirm('작성을 취소 할까요?')
          if(confirm){
            console.log('취소')
          }
          else{
            console.log('다시화면')
          }
        }}
        value="등록 취소"
      ></input>
      <div>
        <input
          type="button"
          value="임시 저장"
          onClick={() => {
            tempPost()
          }}
        ></input>
        {/* <button onClick={()=>{
          onSubmit()
        }}>완료</button> */}
        <input
          type="button"
          value="저장"
          onClick={() => {
            onSubmit()
          }}
        ></input>
      </div>
    </Wrap>
  );
};
const Wrap = styled.footer`
  width: 100%;
  height: 80px;
  position: fixed;
  background-color: lightgray;
  bottom: 0;
  padding: 0 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  input {
    width: 130px;
    height: 50px;
    border-radius: 7px;
    border: 1px solid black;
    background-color: transparent;
    font-size: medium;
    cursor: pointer;
    :hover {
      background-color: gray;
      color: white;
    }
  }
  button {
    width: 130px;
    height: 50px;
    border-radius: 7px;
    border: 1px solid black;
    background-color: transparent;
    font-size: medium;
    margin-left: 10px;
    cursor: pointer;
    :hover {
      background-color: gray;
      color: white;
    }
  }
`;
export default WriteFooter;
