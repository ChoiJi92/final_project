import React, { useCallback, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {FaTimes} from "react-icons/fa"
import {useForm} from "react-hook-form"
import TestFooter from "../components/TestFooter";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const TestWrite = () => {
    const { register, handleSubmit,  formState: { errors }, getValues,setValue } = useForm();
    const [multiImgs, setMultiImgs] = useState([]);

    const currentImg = useRef(null);
    
    const onImgChange = (e) => {
        const imgLists = e.target.files;
        console.log(imgLists);
        
        let imgUrlLists = [...multiImgs];
        for (let i = 0; i < imgLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imgLists[i]);
            console.log(currentImageUrl)
            imgUrlLists.push(currentImageUrl); 
          }
        if (imgUrlLists.length > 8) {
            imgUrlLists = imgUrlLists.slice(0, 8);
        }
        setMultiImgs(imgUrlLists);
    }
    const imgClick = (e) => {
        currentImg.current.click();
    };
    const deleteImage = (id) => {
        setMultiImgs(multiImgs.filter((_, index) => index !== id));
      };
    const onSubmit = (data,e) => {
        console.log(data)
        console.log(multiImgs)
    }
    
    
    return(
        <Wrap>
            <HostForm onSubmit={handleSubmit(onSubmit)}>
                <HouseBox>  
                    <h1>숙소 정보 입력</h1>
                </HouseBox>
                <hr/>
                <ImgMainBox>
                    <ImgDesBox>
                            <h4>상품 이지미 등록 * </h4> 
                            <span>  {multiImgs.length}/8</span>
                            <input multiple
                                id="input-file" 
                                style={{"display":"none", "outline":"none"}} 
                                ref={currentImg} 
                                type={"file"} accept={"image/*"}
                                name="imgfile"
                                onChange={onImgChange}
                                 />
                            <SelectSpan onClick={imgClick}>이미지를 선택해 주세요</SelectSpan>
                    </ImgDesBox>
                    <ImgBox>
                    {multiImgs.map((i, idx) =>( 
                        <div key={idx}>
                            <Img src={i} alt={`${i}-${idx}`}/>
                            <DeleteIcon onClick={()=> deleteImage(idx)} />
                        </div>
                    ))}
                    </ImgBox>
                </ImgMainBox>
                <hr/>
                <InfoBox>
                    <h5>제목 *</h5>
                    <div>
                    <input {...register("title", { required: "제목은 필수입니다 :)" })} />
                    <ErrorP>{errors.title?.message}</ErrorP>
                    </div>
                </InfoBox>
              
                <InfoBox>
                    <h5>카테고리 *</h5>
                    <div>
                        <Box sx={{ width: 400, "marginRight":"220px" }}>
                            <FormControl fullWidth>
                            {/* <InputLabel style={{"fontSize":"1"}} id="demo-simple-select-label">Category</InputLabel> */}
                            <Select
                                style={{"height": "30px"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                {...register("category", { required: "카테고리는 필수입니다 :)" })}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>                    
                        </Box>
                        <p>{errors.category?.message}</p>
                    </div>
                </InfoBox>
                
                <InfoBox>
                    <h5>숙소형태 *</h5>
                    <div>
                    <Box sx={{ width: 400, "marginRight":"220px" }}>
                            <FormControl fullWidth>
                            {/* <InputLabel style={{"fontSize":"1"}} id="demo-simple-select-label">Category</InputLabel> */}
                            <Select
                                style={{"height": "30px"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                {...register("houseInfo", { required: "숙소형태는 필수입니다 :)" })}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>                    
                        </Box>
                    {/* <input {...register("houseInfo", { required: "숙소형태는 필수입니다 :)" })}/> */}
                    <p>{errors.houseInfo?.message}</p>
                    </div>
                </InfoBox>
                
                <InfoBox>
                    <h5>주소 *</h5>
                    <div>
                    <input  {...register("address", { required: "주소는 필수입니다 :)" })} />
                    <ErrorP>{errors.address?.message}</ErrorP>
                    </div>
                </InfoBox>
                
                <InfoBox>
                    <h5>스텝을 구하시나요? *</h5>
                    <Box sx={{ width: 100, "marginLeft":"35px" }}>
                        <FormControl fullWidth>
                            <Select
                                style={{"height": "30px"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                {...register("stepSelct", { required: "스텝여부는 필수입니다 :)" })}
                                >
                                <MenuItem value={10}>예</MenuItem>
                                <MenuItem value={20}>아니오</MenuItem>
                                </Select>
                        </FormControl>                    
                    </Box>
                    <StepInput {...register("stepInfo",  { required: true })}/>
                </InfoBox>
               
                <InfoBox>
                    <h5>링크 </h5>
                    <input {...register("link",  { required: true })}/>
                </InfoBox>
                <InfoBox>
                    <h5>설명 *</h5>
                    <textarea {...register("des",  { required: true })} id="text" style={{"width":"450px", "height":"300px", "borderRadius":"10px", "padding":"10px", "margin":"15px 200px 15px 0px"}}></textarea>
                </InfoBox>
                <InfoBox>
                    <h5>태그 *</h5>
                </InfoBox>
                <TestFooter getValues={getValues}/>
                {/* <button>저장</button>
                <input onSubmit={} value="임시저장" type="button" />
                <input value="작성취소" type="button" /> */}
                
            </HostForm>
        </Wrap>
    );
};

const Wrap = styled.div`
    height: auto;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    margin: auto;
    
    
    
`
const HostForm = styled.form`
    margin-top: 50px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    hr{
        width: 800px;
        margin:15px 0px 15px 0px;
    }
`
const HouseBox = styled.div`
    width: 800px;
    display: flex;
    justify-content: flex-start;
`

const ImgMainBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 800px;
`

const ImgDesBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
`

const SelectSpan = styled.div`
    border: 1px solid black;
    cursor: pointer;
`

const ImgBox = styled.div`
    width: 600px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
`
const Img = styled.img`
    width: 120px;
    height: 120px;
    margin-left: 10px;
    border-radius: 10px;
`
const DeleteIcon = styled(FaTimes)`
    font-size: 13px;
    opacity: 0.5;
    cursor: pointer;
`

const InfoBox = styled.div`
    width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    padding: 15px;
    input{
        width: 400px;
        height: 30px;
        margin-right: 220px;
        padding: 10px;
        
    }
    div{
        height: 35px;
        p{
            font-size: 10px;
            color : #d63031;
        }
    }
    h5{
        white-space : nowrap; 
    }
   
`
const StepInput = styled.input`
    width: 200px;
    margin-left: 10px;
    margin-bottom: 4px;
`

const SelectBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    select{
        margin: 0px 15px 0px 35px;
        height: 30px;
    }
`

const ErrorP = styled.p`
    font-size: 10px;      
    color : #d63031;
    margin-top: 3px;
`
// const BtnBox =  styled.div`
//     width: 100vh;
//     height: 50px;
//     border: 1px solid black;
//     margin: 15px 0px 15px 0px;
// `

// const SelectImgBox = styled.div`
//     width: 200px;
//     height: 50px;
//     background-color: #e3e6ea;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;
//     border-radius: 10px;
// `
// const ImgBox = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     width: 900px;
// `

// const Img = styled.img`
//     width: 150px;
//     height: 150px;
//     margin-left: 10px;
//     border-radius: 10px;
// `

// const TitleBox = styled.div`
//     display: flex;
//     margin:15px 0px 15px 0px;
//     input{
//         width: 300px;
        
//         border: none;
//         border-bottom: 1px solid gray;
//         outline: none;
//         padding: 0px 10px;
//     }
//     span{
//         margin-top: 25px;
//         font-size: 13px;
//         margin-left: 10px;
//     }
// `

// const DeleteIcon = styled(FaTimes)`
//     font-size: 13px;
//     opacity: 0.5;
//     cursor: pointer;
// `

export default TestWrite;







  {/* <TestHostInfo />
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
                <button>등록!</button> */}