import React, { useState } from "react";
import styled from "styled-components";

const TagList = ({ tagList, setTagList, maxLength, width, margin }) => {
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
      width={width}
      margin={margin}
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
        placeholder="#태그"
        value={tag || ""}
      ></input>
    </Tag>
  );
};

const Tag = styled.div`
  width: ${(props) => props.width};
  margin-right: ${(props) => props.margin};
  margin-bottom: 80px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* border: 1px solid; */
  div {
    border-radius: 10px;
    /* width: 11%; */
    /* min-width: 12%; */
    width: 120px;
    /* padding: 20px; */
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    cursor: pointer;
    background: #F7F3EF;
  }
  input {
    display: ${(props) =>
      props.length === props.maxLength ? "none" : "flex"};
    width: 120px;
    height: 41px;
    text-align: center;
    /* padding: 10px; */
    border: 1px solid #eee9e4;
    border-radius: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
  }
`;
export default TagList;
