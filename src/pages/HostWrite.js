import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import {FaTimes} from "react-icons/fa"
import {useForm} from "react-hook-form"
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import WriteFooter from "../components/WriteFooter";
import {FaImage} from "react-icons/fa"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { imgMoveState } from "../recoil/atoms";


const HostWrite = () => {
    
    const { register, handleSubmit,  formState: { errors },watch } = useForm();
    const [multiImgs, setMultiImgs] = useState([]);

    const currentImg = useRef(null);
    // {draggableId, destination, source,args }
    // console.log(args)
    const onDragEnd = ({draggableId, destination, source,  }) => {
        if(!destination) return;
        setMultiImgs((imgArry)=>{
            const copyImg = [...imgArry];
            copyImg.splice(source.index, 1)
            copyImg.splice(destination.index, 0, draggableId)
            return copyImg
        })     
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
    const hiddenSetp = watch("stepSelect")
    console.log(hiddenSetp)
    return(
        <Wrap>
            <HostForm onSubmit={handleSubmit(onSubmit)}>
                <HouseBox>  
                    <h1>숙소 정보 입력</h1>
                </HouseBox>
                <hr/>
                <ImgMainBox>
                    <ImgDesBox>
                            <input multiple
                                id="input-file" 
                                style={{"display":"none", "outline":"none"}} 
                                ref={currentImg} 
                                type={"file"} accept={"image/*"}
                                name="imgfile"
                                onChange={onImgChange}
                                // {...register("images", { required: "이미지는 필수 선택사항입니다 :)" })}
                                 />
                                 <div id="imgSelectBox" onClick={imgClick}>
                                    <div style={{"display":"flex","flexDirection":"column","alignItems":"center"}}>
                                    <h3 style={{"marginBottom":"20px"}}>상품 이미지 등록 * </h3> 
                                    <ImgIcon/>
                                    {/* <SelectSpan onClick={imgClick}>이미지 등록</SelectSpan> */}
                                    <span>이미지 등록</span>
                                    <span style={{"marginTop":"10px"}}> {multiImgs.length} / 8</span>
                                    </div>
                                </div>
                                <span style={{"color":"red","fontSize":"13px"}}>{errors.images?.message}</span> 
                    </ImgDesBox>
                    
                    
                    <DragDropContext onDragEnd={onDragEnd}>
                        <ImgBox>
                            {multiImgs.map((i, idx)=>(
                               <Droppable droppableId={i}>
                                    {(provided, snapshot)=>(
                                        <div key={idx} ref={provided.innerRef} {...provided.droppableProps}>
                                        <Draggable key={i} draggableId={i} index={idx}>
                                            {(provided, snapshot)=>(
                                                <div 
                                                ref={provided.innerRef}  
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps} 
                                                key={idx}>
                                                    <Img  src={i} alt={`${i}-${idx}`}/>
                                                    <DeleteIcon  onClick={()=> deleteImage(idx)} />
                                                </div>
                                            )}
                                        </Draggable>
                                        </div>
                                    )}
                               </Droppable> 
                            ))}
                        </ImgBox>
                    {/* <Droppable droppableId="DropLand">
                        {(provided,snapshot)=>(
                            <ImgBox ref={provided.innerRef} {...provided.droppableProps}>
                            {multiImgs.map((i, idx) =>( 
                                <Draggable key={i} draggableId={i} index={idx}>
                                    {(provided, snapshot)=>(
                                        <div 
                                        ref={provided.innerRef}  
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps} 
                                        key={idx}>
                                            <Img  src={i} alt={`${i}-${idx}`}/>
                                            <DeleteIcon  onClick={()=> deleteImage(idx)} />
                                        </div>
                                    )}
                                </Draggable>
                            ))} 
                            
                            </ImgBox>
                        )}
                    </Droppable> */}
                    {/* {provided.placeholder}    */}
                    
                    </DragDropContext>
                    
                </ImgMainBox>
                <hr/>
                <InfoBox>
                    <h3>제목 *</h3>
                    <div id="infoTitle">
                        <input placeholder="제목을 입력해주세요." {...register("title", { required: true })} />
                        <ErrorP1>{errors.title?.type === "required" &&
                  "제목은 필수 선택사항입니다 :)"}</ErrorP1>
                    </div>
                </InfoBox>
                {/* {multiImgs.map((i, idx) =>( 
                                <div key={idx}>
                                    <Img src={i} alt={`${i}-${idx}`}/>
                                    <DeleteIcon onClick={()=> deleteImage(idx)} />
                                </div>   
                            ))} */}
                <InfoBox>
                    <h3>카테고리 *</h3>
                    <div id="infoCategory">
                            <Select
                                style={{"width":"100%","height":"40px"}}          
                                {...register("category", { required: "카테고리는 필수 선택사항입니다 :)" })}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                >
                                <MenuItem value="" disabled={true}>
                                 카테고리를 선택해주세요.
                                </MenuItem> 
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select> 
                                <ErrorP>{errors.category?.message}</ErrorP>        
                    </div>      
                </InfoBox>
                
                <InfoBox>
                    <h3>숙소형태 *</h3>
                    <div id="infoHouse">
                            <Select  
                                          
                                {...register("houseInfo", { required: "숙소형태는 필수 선택사항입니다 :)" })}
                                style={{"width":"100%","height":"40px"}}  
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                
                                defaultValue=""
                                >
                                <MenuItem value="" disabled={true}>
                                 숙소의 형태를 선택해주세요.
                                </MenuItem>    
                                <MenuItem value={10}>Tenaaaaaaaaaaa</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                        
                                <ErrorP>{errors.houseInfo?.message}</ErrorP>
                    </div>
                </InfoBox>
                
                <InfoBox>
                    <h3>주소 *</h3>
                    <div id="infoAddress">
                    <input placeholder="주소를 검색해주세요."  {...register("address", { required: "주소는 필수 선택사항입니다 :)" })} />
                    <ErrorP1>{errors.address?.message}</ErrorP1>
                    </div>
                </InfoBox>
                
                <InfoBox>
                    <h3>스텝을 구하시나요? *</h3>
                    <div id="stepMainBox">
                        <div id="">
                            <div id="stepBox">
                                <div style={{"display":"flex", "width":"60%","marginRight":"100px","height":"40px"}}>
                                    <Select
                                        style={{"width":"50%"}}
                                        displayEmpty
                                        inputProps={{ "aria-label": "Without label" }}
                
                                        defaultValue=""
                                        {...register("stepSelect", { required: "스텝여부는 필수 선택사항입니다 :)" })}
                                        >
                                            <MenuItem value="" disabled={true}>
                                            예 / 아니오
                                            </MenuItem>   
                                        <MenuItem value={"yes"}>예</MenuItem>
                                        <MenuItem value={"no"}>아니오</MenuItem>
                                    </Select>
                                </div>
                                {hiddenSetp === "yes" ? (
                                <div id="stepInputBox">
                                    <StepInput {...register("stepInfo",  { required: true })}/>
                                </div>) : ("")}
                        
                            </div>
                        </div>
                        <div style={{"marginTop":"-30px"}}>
                            <ErrorP>{errors.stepSelect?.message}</ErrorP>
                        </div>
                    </div>
                </InfoBox>
               
                <InfoBox>
                    <h3>링크 </h3>
                    <div id="infoLink">
                        <input placeholder="링크는 선택사항입니다." {...register("link")}/>
                    </div>
                </InfoBox>
                <InfoBox>
                    <h3>설명 *</h3>
                    <div id="infoDes">
                        <textarea placeholder="숙소에 대한 설명....." {...register("des",  { required: "설명은 필수입니다 :)" })} id="text" style={{"width":"100%", "height":"300px", "borderRadius":"10px", "padding":"10px", }}></textarea>
                        <ErrorP1>{errors.des?.message}</ErrorP1>
                    </div>
                </InfoBox>
                <InfoBox>
                    <h5>태그 *</h5>
                </InfoBox>  
               
                {/* <button>저장</button>
                <input onSubmit={} value="임시저장" type="button" />
                <input value="작성취소" type="button" /> */}
                <WriteFooter/>
            </HostForm>
        </Wrap>
    );
};

const Wrap = styled.div`
    height: auto;
    width: 100%;
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
        width: 70%;
        margin:15px 0px 15px 0px;
    }
`
const HouseBox = styled.div`
    width: 70%;
    display: flex;
    justify-content: flex-start;
`

const ImgMainBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
`

const ImgDesBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    #imgSelectBox{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 160px;
        height: 160px;
        margin: 15px 0px 10px 0px;
        border-radius: 10px;
        background-color: #dfe6e9;
        cursor: pointer;
    }
`
const ImgIcon = styled(FaImage)`
    
`


const ImgBox = styled.div`
    width: 60%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin-right: 130px;

`
const Img = styled.img`
    width: 160px;
    height: 160px;
    margin-top: 5px;
    border-radius: 10px;
`
const DeleteIcon = styled(FaTimes)`
    font-size: 15px;
    opacity: 0.9;
    color: #fff;
    cursor: pointer;
    position: relative;
    left: -25px;
    bottom: 130px;
`

const InfoBox = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    padding: 20px 0px;
    
    #infoTitle,#infoLink,#infoAddress{
        display: flex;
        flex-direction: column;
        width: 70%;
        margin-right: 130px;
        input{
        height: 40px;
        padding: 10px;
    }
    }
    #infoHouse,#infoCategory{
        width: 70%;
        display: flex;
        flex-direction: column;
        margin-right: 130px;
    } 
  
    #infoDes{
        height: 400px;
        margin-right: 130px;
        width: 70%;
       
        textarea{
            font-size: 20px;
            
        }
    }
    h5{
        white-space : nowrap; 
    }
    #stepBox{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        margin-right: 200px;
    }
    #stepInputBox{
        width: 65%;
        height: 70px;
        margin-left: -350px; 
    }
    #stepMainBox{
        width: 70%;
        height: 60px;
        display: flex;
        flex-direction: column;
        margin-right: 130px;
    }
`

const ErrorP1 = styled.p`
    font-size: 13px;
    color : red;
    margin-top: 10px;
`
const ErrorP = styled.p`
font-size: 13px;
    color : red;
    /* margin-bottom: 8px; */
    margin-top: 10px;
    height: 100%;
`

const StepInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 10px;
    /* margin-right: 100px ; */
`



export default HostWrite;

