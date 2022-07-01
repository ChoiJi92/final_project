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

  const locationChange = (e) => {
    setIsLocation(e.target.value);
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

    dispatch(postContentsDB(data));
    // console.log(isTitle, isDes)
    // console.log(multiImgs);
    // console.log(showImages);

    // const formData = new FormData();
    // const config = {
    //     headers : {'content-type': 'multipart/form-data'}
    // };
    // multiImgs.forEach((file)=>formData.append("file", file))

    // const data = {
    //     title : isTitle,
    //     des : isDes,
    // }
    // const json = JSON.stringify(data);
    // const blob = new Blob([json], { type: "application/json" });
    // formData.append("contents", blob)
    // console.log(blob)
    // console.log(formData)
    // for(var value of formData.values()) {
    //     console.log(value);
    // }
    //     axios.post('http://localhost:5001/post', formData, config)
    //   .then((response) => {
    //     console.log(`response : ${JSON.stringify(response.data)}`);
    // }).catch(error => {
    //     console.log(error.response);
    // });
    // await axios.post("http://localhost:5001/post", formData, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   })
  };
  useEffect(() => {
    dispatch(loadContentsDB());
  }, []);
  const list = useSelector((state) => state.postSlice.contents);
  console.log(list[params.id]);
  console.log(params.id);
  // {params.id == null ? (<button>등록!</button>) :
  // (<div><button>수정!</button><button>삭제</button></div>)}
  return (
    <Wrap>
      <h1>this is write page</h1>
      {params.id ? (
        <DataForm onSubmit={onSubmit}>
          <label>Title</label>
          <input onChange={titleChange}/>
          <label htmlFor="story">내용을 적어제주도</label>
          <textarea
            onChange={desChange}
            id="story"
            name="story"
            rows="5"
            cols="33"
            placeholder="내용을 적어제주도."
          />

          <label>여행 장소(상호명을 적어제주도!)</label>
          <input onChange={locationChange} />

          <label htmlFor="input-file" />
          <input
            multiple
            id="input-file"
            style={{ display: "none", outline: "none" }}
            ref={currentImg}
            type={"file"}
            accept={"image/*"}
            name="imgfile"
            onChange={onImgChange}
          />
          <SelectImgBox onClick={imgClick}>
            <span>이미지 선택해제주도</span>
          </SelectImgBox>
          <button>등록!</button>
        </DataForm>
      ) : (
        <DataForm onSubmit={onSubmit}>
          <label>Title</label>
          <input onChange={titleChange} />
          <label htmlFor="story">내용을 적어제주도</label>
          <textarea
            onChange={desChange}
            id="story"
            name="story"
            rows="5"
            cols="33"
            placeholder="내용을 적어제주도."
          />

          <label>여행 장소(상호명을 적어제주도!)</label>
          <input onChange={locationChange} />
          <label htmlFor="input-file" />
          <input
            multiple
            id="input-file"
            style={{ display: "none", outline: "none" }}
            ref={currentImg}
            type={"file"}
            accept={"image/*"}
            name="imgfile"
            onChange={onImgChange}
          />
          <SelectImgBox onClick={imgClick}>
            <span>이미지 선택해제주도</span>
          </SelectImgBox>

          <button>수정!</button>
        </DataForm>
      )}
      <button>삭제</button>
      <h5>{multiImgs.length}/10</h5>
      <div style={{ display: "flex" }}>
        {multiImgs.map((i, idx) => (
          <div key={idx}>
            <img
              src={i}
              style={{ width: "50px", height: "50px" }}
              alt={`${i}-${idx}`}
            />
          </div>
        ))}
      </div>
    </Wrap>
  );
};

export default HostWrite;
