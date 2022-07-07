import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import {FaTimes} from "react-icons/fa"
import {useForm} from "react-hook-form"
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import WriteFooter from "../components/WriteFooter";
import {FaImage} from "react-icons/fa"
import searchIcom from "../assests/css/search.png";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import imageIcon from '../assests/css/imageIcon.png'
import { useRecoilState, useRecoilValue } from "recoil";
import { imgMoveState,addressState } from "../recoil/atoms";
import { MdOutlineCancel } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import AddressModal from "../components/AddressModal";

const HostWrite = () => {
    
    const { register, handleSubmit,  formState: { errors },watch } = useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [multiImgs, setMultiImgs] = useState([]);
    const address = useRecoilValue(addressState);
    const currentImg = useRef(null);
    // {draggableId, destination, source,args }
    // console.log(args)
    const openAddressModal = () => {
        setModalOpen(true);
      };
      const closeAddressModal = () => {
        setModalOpen(false);
      };
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
                                    <h3 style={{"marginBottom":"10px"}}>상품 이미지 등록 * </h3> 
                                    {/* <ImgIcon/> */}
                                    <img src={imageIcon} alt="이미지 선택" style={{marginBottom:'5px'}}></img>
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
                               <Droppable droppableId={i} key={idx}>
                                    {(provided, snapshot)=>(
                                        <div key={idx} ref={provided.innerRef} {...provided.droppableProps}>
                                        <Draggable key={i} draggableId={i} index={idx}>
                                            {(provided, snapshot)=>(
                                                <div
                                                ref={provided.innerRef}  
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps} 
                                                key={idx}>
                                                    <Img  src={i} alt="이미지"/>
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
                                style={{"width":"100%","height":"40px",border:'1px solid'}}          
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
                                style={{"width":"100%","height":"40px",border:'1px solid'}}  
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
                    {/* <div id="infoAddress">
                    <input placeholder="주소를 검색해주세요."  {...register("address", { required: "주소는 필수 선택사항입니다 :)" })} />
                    
                    </div> */}
                    <div className="regionInput">
              <div className="mainAddress">
                <input
                  placeholder="주소를 검색해 주세요."
                  {...register("mainAddress", { required: true })}
                  value={address}
                  readOnly
                ></input>
                <img
                  src={searchIcom}
                  onClick={openAddressModal}
                  alt="주소 검색"
                ></img>
              </div>
              <input
                className="subAddress"
                placeholder="상세 주소를 입력해 주세요."
                {...register("subAddress", { required: "주소는 필수 선택사항입니다 :)" })}
              ></input>
             <ErrorP1>{errors.subAddress?.message}</ErrorP1>
            </div>
            <AddressModal
              open={modalOpen}
              close={closeAddressModal}
            ></AddressModal>
                </InfoBox>
                
                <InfoBox>
                    <h3>스텝을 구하시나요? *</h3>
                    <div id="stepMainBox">
                            <div id="stepBox">
                                    <Select
                                        style={{"width":"30%",border:'1px solid'}}
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
                                {hiddenSetp === "yes" ? (
                                <div id="stepInputBox">
                                    <StepInput {...register("stepInfo",  { required: true })} placeholder="근무 형태를 입력해 주세요 :)"/>
                                </div>) : ("")}
                            </div>
                        <ErrorP>{errors.stepSelect?.message}</ErrorP>
                    </div>
                </InfoBox>
               
                <InfoBox>
                    <h3>링크 </h3>
                    <div id="infoLink">
                        <input placeholder="숙소 사이트, SNS 등 URL을 입력해주세요." {...register("link")}/>
                    </div>
                </InfoBox>
                <InfoBox>
                    <h3>설명 *</h3>
                    <div id="infoDes">
                        <textarea placeholder="숙소에 대한 정보를 최대한 상세하게 입력해주시면 더 많은 고객을 만나실 수 있어요." {...register("des",  { required: "설명은 필수입니다 :)" })} id="text" ></textarea>
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
        /* margin:15px 0px 15px 0px; */
        margin-top:15px;
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
    /* align-items: center; */
    width: 70%;
    margin-top: 3px;
`   

const ImgDesBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    #imgSelectBox{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 180px;
        height: 180px;
        /* margin: 15px 0px 10px 0px; */
        margin-top: 10px;
        border-radius: 10px;
        background-color: #dfe6e9;
        cursor: pointer;
    }
`
const ImgIcon = styled(FaImage)`
    font-size: 20px;
`


const ImgBox = styled.div`
    width: 80%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
`
const Img = styled.img`
    width: 180px;
    height: 180px;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 10px;
    position: relative;
    
`
const DeleteIcon = styled(MdCancel)`
    font-size: 25px;
    opacity: 0.9;
    /* color: #fff; */
    color: black;
    cursor: pointer;
    position: relative;
    left: -15px;
    bottom: 165px;
    /* top:0px; */
`

const InfoBox = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    padding: 20px 0px;
    .regionInput {
      display: flex;
      flex-direction: column;
      width: 70%;
      margin-right: 130px;
    }
    .subAddress {
      height: 40px;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid black;
      // 크롬 자동완성 선택했을 때 인풋창 백그라운드 파란색되는거 막는 css
      :-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
        box-shadow: 0 0 0 1000px white inset;
      }
    }
    .mainAddress {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border: 1px solid;
      border-radius: 5px;
      padding: 0 10px;
      margin-bottom: 10px;
      input {
        width: 90%;
        border: none;
        outline: none;
        // 크롬 자동완성 선택했을 때 인풋창 백그라운드 파란색되는거 막는 css
        :-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px white inset;
          box-shadow: 0 0 0 1000px white inset;
        }
      }
      img {
        cursor: pointer;
      }
    }
    #infoTitle,#infoLink,#infoAddress{
        display: flex;
        flex-direction: column;
        width: 70%;
        margin-right: 130px;
        input{
        height: 40px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid;
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
            width: 100%;
            height: 300px;
            border-radius: 5px;
            padding: 20px 10px;
            font-size: 15px;
            
        }
    }
    h5{
        white-space : nowrap; 
    }
    #stepBox{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        /* margin-right: 200px; */
        /* border: 1px solid; */
    }
    #stepInputBox{
        width: 65%;
        height: 70px;
        margin-left: -350px; 
    }
    #stepMainBox{
        width: 70%;
        /* height: 60px; */
        display: flex;
        flex-direction: column;
        margin-right: 130px;
        /* border: 1px solid; */
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
    border-radius:5px ;
    border: 1px solid;
    /* margin-right: 100px ; */
`



export default HostWrite;

