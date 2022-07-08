import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { tagState } from "../recoil/atoms";
const TagList = () => {
  const [tagList, setTagList] = useRecoilState(tagState);
  const [tag, setTag] = useState()
  const onKeyPress = (e) => {
    if (e.key === "Enter" && tag !=="") {
      setTagList([...tagList, `#${e.target.value}`]);
      setTag("")
      console.log(tagList.length)
    }
  };
  const onKeyDown = (e) =>{
    if (e.keyCode === 8 && !tag){
        setTagList(tagList.filter((_,i)=> i !== tagList.length-1))
    } 
  }
  const onChange =(e)=>{
    setTag(e.target.value)
  }
  return (
    <Tag className="tag"  length={tagList.length}>
      {tagList.map((v, i) => (
        <div
          key={`${v}-${i}`}
          onClick={() => {
            setTagList(tagList.filter((_, idx) => i !== idx));
          }}
        >
          {v}
        </div>
      ))}
      <input
        onChange={onChange}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        placeholder="태그를 입력해 주세요."
        value={tag || ""}
      ></input>
    </Tag>
  );
};

const Tag = styled.div`
  width: 75%;
  margin-right: 80px;
  margin-bottom: 80px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  div {
    border: 1px solid;
    border-radius: 20px;
    /* width: 11%; */
    min-width: 11%;
    padding: 20px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    :hover {
      background-color: gray;
    }
  }
  input {
    display: ${(props) => (props.length === 10 ? "none" : "block")};
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid;
    margin-bottom: 10px;
  }
`;
export default TagList;
