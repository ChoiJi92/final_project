import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HostEditor from "../components/HostEditor";
import TestHostInfo from "../components/TestHostInfo";
import {FaTimes} from "react-icons/fa"


const TestWrite = () => {
    const [isTitle, setIsTitle] = useState("");
    const [multiImgs, setMultiImgs] = useState([]);

    const navigate = useNavigate();
    const currentImg = useRef(null);
    
    const titleChange = (e) => {
        setIsTitle(e.target.value);
    }

    const onImgChange = (e) => {
        const imgLists = e.target.files;
        console.log(imgLists);
        
        let imgUrlLists = [...multiImgs];
        for (let i = 0; i < imgLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imgLists[i]);
            console.log(currentImageUrl)
            imgUrlLists.push(currentImageUrl); 
          }
        if (imgUrlLists.length > 10) {
            imgUrlLists = imgUrlLists.slice(0, 10);
        }
        setMultiImgs(imgUrlLists);
    }
    const imgClick = (e) => {
        currentImg.current.click();
    };
    const deleteImage = (id) => {
        setMultiImgs(multiImgs.filter((_, index) => index !== id));
      };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.house.value)
        console.log(e.target.square.value)
        console.log(e.target.location.value)
        console.log(e.target.step.value)
        console.log(e.target.link.value)
        console.log(isTitle)
        console.log(e.target.text.value)
        console.log(multiImgs)
    }
    
    return(
        <Wrap>
            <HostForm onSubmit={onSubmit}>
                <TestHostInfo />
                <TitleBox>
                <input onChange={titleChange} placeholder="제목을 입력해주세요." maxLength={20}/><span>{isTitle.length}/20</span>
                </TitleBox>
                <input multiple
                        id="input-file" 
                        style={{"display":"none", "outline":"none"}} 
                        ref={currentImg} 
                        type={"file"} accept={"image/*"}
                        name="imgfile"
                        onChange={onImgChange} />
                <SelectImgBox onClick={imgClick}>
                    <span>이미지 선택해주세요. (클릭!)</span>
                </SelectImgBox>
                <h5>{multiImgs.length}/10</h5>
                <ImgBox style={{"display" :"flex"}}>
                {multiImgs.map((i, idx) =>( 
                <div key={idx}>
                    <Img src={i} alt={`${i}-${idx}`}/>
                    <DeleteIcon onClick={()=> deleteImage(idx)} />
                </div>
            ))}
                </ImgBox>
                <textarea id="text" style={{"width":"600px", "height":"300px", "borderRadius":"10px", "padding":"10px", "margin":"15px 0px 15px 0px"}}></textarea>
                <button>등록!</button>
            </HostForm>
        </Wrap>
    );
};

const Wrap = styled.div`
    height: auto;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    
    
`
const HostForm = styled.form`
    margin-top: 50px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    button{
        padding: 15px;
        margin-bottom: 15px;
        background-color: #c7ecee;
        border: none;
        border-radius: 10px;
    }
`

const BtnBox =  styled.div`
    width: 100vh;
    height: 50px;
    border: 1px solid black;
    margin: 15px 0px 15px 0px;
`

const SelectImgBox = styled.div`
    width: 200px;
    height: 50px;
    background-color: #e3e6ea;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
`
const ImgBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 900px;
`

const Img = styled.img`
    width: 150px;
    height: 150px;
    margin-left: 10px;
    border-radius: 10px;
`

const TitleBox = styled.div`
    display: flex;
    margin:15px 0px 15px 0px;
    input{
        width: 300px;
        
        border: none;
        border-bottom: 1px solid gray;
        outline: none;
        padding: 0px 10px;
    }
    span{
        margin-top: 25px;
        font-size: 13px;
        margin-left: 10px;
    }
`

const DeleteIcon = styled(FaTimes)`
    font-size: 13px;
    opacity: 0.5;
    cursor: pointer;
`

export default TestWrite;