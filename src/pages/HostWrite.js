import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { loadContentsDB, postContentsDB } from "../redux/modules/postSlice";

const Wrap = styled.div``;
const DataForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const SelectImgBox = styled.div`
  width: 200px;
  height: 200px;
  background-color: #e3e6ea;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const HostWrite = () => {
  const [isTitle, setIsTitle] = useState("");
  const [isDes, setIsDes] = useState("");
  const [isLocation, setIsLocation] = useState("");

  const [isList, setIsList] = useState([]);

  const [multiImgs, setMultiImgs] = useState([]);
  const currentImg = useRef(null);
  const dispatch = useDispatch();

  const params = useParams();

  const titleChange = (e) => {
    setIsTitle(e.target.value);
  };

  const desChange = (e) => {
    setIsDes(e.target.value);
  };



  const onImgChange = (e) => {
    // const reader = new FileReader();

    // const file = currentImg.current.files[0];
    // console.log(file);
    const imgLists = e.target.files;
    console.log(imgLists);
    let imgUrlLists = [...multiImgs];
    for (let i = 0; i < imgLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imgLists[i]);
      imgUrlLists.push(currentImageUrl);
    }

    if (imgUrlLists.length > 10) {
      imgUrlLists = imgUrlLists.slice(0, 10);
    }
    setMultiImgs(imgUrlLists);
  };
  // const [showImages, setShowImages] = useState([]);

  // 이미지 상대경로 저장
  //   const handleAddImages = (event) => {
  //     const imageLists = event.target.files;
  //     let imageUrlLists = [...showImages];
  //     console.log(imageLists, "this is img list");
  //     for (let i = 0; i < imageLists.length; i++) {
  //       const currentImageUrl = URL.createObjectURL(imageLists[i]);
  //       imageUrlLists.push(currentImageUrl);
  //     }

  //     if (imageUrlLists.length > 10) {
  //       imageUrlLists = imageUrlLists.slice(0, 10);
  //     }

  //     setShowImages(imageUrlLists);
  //   };

  const imgClick = (e) => {
    currentImg.current.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      title: isTitle,
      postContent: isDes,
      tripLocation: isLocation,
    };


    //     axios.post('http://localhost:5001/post', formData, config)
    //   .then((response) => {
    //     console.log(`response : ${JSON.stringify(response.data)}`);
    // }).catch(error => {
    //     console.log(error.response);
    // });
