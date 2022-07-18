import { SettingsAccessibility } from "@mui/icons-material";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { tagState } from "../recoil/atoms";
const TagList = ({ tagList, setTagList, maxLength, isModal }) => {
  // const [tagList, setTagList] = useRecoilState(tagState);
  const [tag, setTag] = useState();

  const onKeyPress = (e) => {
    if (e.key === "Enter" && tag !== "") {
      setTagList([...tagList, `#${e.target.value}`]);
      setTag("");
    }
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 8 && !tag) {
      setTagList(tagList.filter((_, i) => i !== tagList.length - 1));
    }
  };
  const onChange = (e) => {
    setTag(e.target.value);
  };
  return (
    <Tag
      className="tag"
      length={tagList.length}
      maxLength={maxLength}
      isModal={isModal}
    >
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
  width: ${(props) => (props.isModal ? "100%" : "75%")};
  margin-right: ${(props) => (props.isModal ? "0" : "64px")};
  margin-bottom: 80px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* border: 1px solid; */
  div {
    border-radius: 50px;
    /* width: 11%; */
    min-width: 12%;
    padding: 20px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #c7c7cc;
  }
  input {
    display: ${(props) =>
      props.length === props.maxLength ? "none" : "block"};
    height: 56px;
    padding: 10px;
    border: 1px solid #c7c7cc;
    border-radius: 10px;
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
  }
`;
export default TagList;
