import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Dropzone, { useDropzone } from "react-dropzone";
import PostEditer from "../components/PostEditer";
import insta from "../assests/css/instagram.png";
import { useParams } from "react-router-dom";
import Address from "../components/Address";
import Modal from "../components/Modal";
import AddressModal from "../components/AddressModal";
import { addressState } from "../recoil/atoms";
import {useRecoilValue} from 'recoil'
const UserWrite = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const address = useRecoilValue(addressState)
  const openAddressModal = () => {
    setModalOpen(true);
  };
  const closeAddressModal = () => {
    setModalOpen(false);
  };
  // 이미지 업로드 부분
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    let imagelist = []; // 미리보기 이미지 담을 리스트
    let filelist = []; // 업로드할 파일을 담을 리스트
    for (let i = 0; i < acceptedFiles.length; i++) {
      // 이미지 미리보기 createObjectURL 버전
      filelist[i] = acceptedFiles[i];
      imagelist[i] = URL.createObjectURL(acceptedFiles[i]);
      console.log(imagelist[i]);
      setPreview([...preview, ...imagelist]);
      // let reader = new FileReader(); // 이미지 미리보기!!!
      // reader.readAsDataURL(acceptedFiles[i]);
      // reader.onload = () => {
      //   imagelist[i] = reader.result;
      //   setPreview([...preview, ...imagelist]);
      // };
    }
    setThumbnail([...thumbnail, ...filelist]);
    // e.target.value = "";
  }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   multiple:false,
  //   accept: {
  //     "image/png": [".png"],
  //     "image/jpg": [".jpg"],
  //     "image/jpeg": [".jpeg"],
  //   },
  // });
  const titleChange = (e) => {
    // 글자수 제한
    if (e.target.value.length > 20) {
      e.target.value = e.target.value.slice(0, 20);
      setTitle(e.target.value);
    } else {
      setTitle(e.target.value);
    }
  };
  console.log(address)
  return (
    <Wrap>
      <Container >
        <Dropzone multiple={false}onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              style={{ backgroundImage: `url(${preview})` }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>파일 올렷어요</p>
              ) : (
                <p>
                  드래그 앤 드롭이나 추가하기 버튼으로 커버사진을 업로드
                  해주세요.
                </p>
              )}
              <button>커버 사진 추가하기</button>
            </div>
          )}
        </Dropzone>
      </Container>

      <Title>
        <input
          placeholder="제목을 입력해 주세요."
          onChange={titleChange}
          maxLength="20"
        ></input>
        <p>{title.length}/20</p>
      </Title>
      <button onClick={openAddressModal}>주소 검색</button>
      <div>{address}</div>
      <AddressModal open={modalOpen} close={closeAddressModal}></AddressModal>
      <PostEditer thumbnail={thumbnail} title={title}></PostEditer>
    </Wrap>
  );
};
const Wrap = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-top: 100px;
  /* width: 80%; */
  /* border: 1px solid; */
  /* height: 300px;
  background-size: cover;
  background-repeat: no-repeat; */
  cursor: pointer;
  div {
    width: 350px;
    height: 200px;
    border: 1px solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  p {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    z-index: -1;
  }
  button {
    margin-top: 30px;
    width: 50%;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: gray;
    z-index: -1;
  }
`;
const Title = styled.div`
  margin: 50px 0;
  width: 40%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;
    height: 50px;
    border: none;
    border-bottom: 1px solid;
    font-size: 25px;
    padding-left: 10px;
    outline: none;
  }
  p {
    border-bottom: 1px solid black;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
  }
`;
export default UserWrite;
