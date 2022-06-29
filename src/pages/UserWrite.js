import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import PostEditer from "../components/PostEditer";

const UserWrite = () => {
  const [title, setTitle] = useState();
  const [preview, setPreview] = useState([]);
  const [thumbnail, setThumbnail] = useState();

  // 이미지 업로드 부분

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    let imagelist = []; // 미리보기 이미지 담을 리스트
    let filelist = []; // 업로드할 파일을 담을 리스트
    for (let i = 0; i <acceptedFiles.length; i++) {
      filelist[i] = acceptedFiles[i];
      let reader = new FileReader(); // 이미지 미리보기!!!
      reader.readAsDataURL(acceptedFiles[i]);
      reader.onload = () => {
        imagelist[i] = reader.result;
        setPreview([...preview, ...imagelist]);
      };
    }
    // setImage([...image,...filelist]);
    // e.target.value = "";
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <Container>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? <p>파일 올렷어요</p> : <p>드래그 앤 드롭이나 추가하기 버튼으로 커버사진을 업로드 해주세요.</p>}
        <button>커버 사진 추가하기</button>
      </div>
      {/* <label htmlFor="file"></label>
      <input id="file" type="file" multiple accept="image/*"></input> */}
      {/* <PostEditer></PostEditer> */}
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  div{
    width: 350px;
    height: 200px;
    border: 1px solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  p{
    width: 70%;
    margin: 0 auto;
    text-align: center;
  }
  button{
    margin-top: 30px;
    width: 50%;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: gray;
}
`;
export default UserWrite;
