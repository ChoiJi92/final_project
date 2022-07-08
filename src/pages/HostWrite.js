import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import WriteFooter from "../components/WriteFooter";
import { FaImage } from "react-icons/fa";
import searchIcom from "../assests/css/search.png";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import imageIcon from "../assests/css/imageIcon.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { imgMoveState, addressState } from "../recoil/atoms";
import { MdOutlineCancel } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import AddressModal from "../components/AddressModal";
import { getValue } from "@testing-library/user-event/dist/utils";

const HostWrite = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues
  } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [multiImgs, setMultiImgs] = useState([]);
  const [tagList, setTagList] = useState([]);
  const address = useRecoilValue(addressState);
  const currentImg = useRef(null);

  const openAddressModal = () => {
    setModalOpen(true);
  };
  const closeAddressModal = () => {
    setModalOpen(false);
  };

  const onSortEnd = (oldIndex, newIndex) => {
    setMultiImgs((array) => arrayMove(array, oldIndex, newIndex));
  };

  const onImgChange = (e) => {
    const imgLists = e.target.files;

    let imgUrlLists = [...multiImgs];
    for (let i = 0; i < imgLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imgLists[i]);
      imgUrlLists.push(currentImageUrl);
    }
    if (imgUrlLists.length > 8) {
      imgUrlLists = imgUrlLists.slice(0, 8);
    }
    setMultiImgs(imgUrlLists);
  };
  const imgClick = () => {
    currentImg.current.click();
  };
  const deleteImage = (id) => {
    setMultiImgs(multiImgs.filter((_, index) => index !== id));
  };
  const onSubmit = (data, e) => {
    console.log(getValues())
    console.log(data);
    console.log(multiImgs);
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      setTagList([...tagList, e.target.value]);
    }
  };
  const hiddenSetp = watch("stepSelect");
  return (
    <Wrap>
      <HostForm onSubmit={handleSubmit(onSubmit)}>
        <HouseBox>
          <h1>숙소 정보 입력</h1>
        </HouseBox>
        <hr />
        <ImgMainBox>
          <ImgDesBox>
            <input
              multiple
              id="input-file"
              style={{ display: "none", outline: "none" }}
              ref={currentImg}
              type={"file"}
              accept={"image/*"}
              name="imgfile"
              onChange={onImgChange}
              // {...register("images", { required: "이미지는 필수 선택사항입니다 :)" })}
            />
            <div id="imgSelectBox" onClick={imgClick}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h3 style={{ marginBottom: "10px" }}>숙소 이미지 등록 * </h3>
                <img
                  src={imageIcon}
                  alt="이미지 선택"
                  style={{ marginBottom: "5px" }}
                ></img>
                <span>이미지 등록</span>
                <span style={{ marginTop: "10px" }}>
                  {multiImgs.length} / 8
                </span>
              </div>
            </div>
            <span style={{ color: "red", fontSize: "13px" }}>
              {errors.images?.message}
            </span>
          </ImgDesBox>

          <ImgBox>
            <SortableList
              onSortEnd={onSortEnd}
              className="list"
              draggedItemClassName="dragged"
            >
              {multiImgs.map((v, index) => (
                <SortableItem key={`item-${v}`}>
                  <List>
                    <Img src={v} alt="이미지" />
                    <DeleteIcon onClick={() => deleteImage(index)} />
                  </List>
                </SortableItem>
              ))}
            </SortableList>
          </ImgBox>
        </ImgMainBox>
        <hr />
        <InfoBox>
          <h3>숙소 이름 *</h3>
          <div id="infoTitle">
            <input
              placeholder="숙소 이름을 입력해주세요."
              {...register("title", { required: true })}
            />
            <ErrorP1>
              {errors.title?.type === "required" &&
                "제목은 필수 선택사항입니다 :)"}
            </ErrorP1>
          </div>
        </InfoBox>
        <InfoBox>
          <h3>카테고리 *</h3>
          <div id="infoCategory">
            <Select
              style={{ width: "100%", height: "40px", border: "1px solid" }}
              {...register("category", {
                required: "카테고리는 필수 선택사항입니다 :)",
              })}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              defaultValue=""
            >
              <MenuItem value="" disabled={true}>
                카테고리를 선택해주세요.
              </MenuItem>
              <MenuItem value="해변근처">해변근처</MenuItem>
              <MenuItem value="내륙">내륙</MenuItem>
              <MenuItem value="관광지 근처">관광지 근처</MenuItem>
              <MenuItem value="조용한 마을">조용한 마을</MenuItem>
              <MenuItem value="우도">우도</MenuItem>
              <MenuItem value="성산일출봉">성산일출봉</MenuItem>
            </Select>
            <ErrorP>{errors.category?.message}</ErrorP>
          </div>
        </InfoBox>

        <InfoBox>
          <h3>숙소형태 *</h3>
          <div id="infoHouse">
            <Select
              {...register("houseInfo", {
                required: "숙소형태는 필수 선택사항입니다 :)",
              })}
              style={{ width: "100%", height: "40px", border: "1px solid" }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              defaultValue=""
            >
              <MenuItem value="" disabled={true}>
                숙소의 형태를 선택해주세요.
              </MenuItem>
              <MenuItem value="단독 또는 다세대 주택">
                단독 또는 다세대 주택
              </MenuItem>
              <MenuItem value="아파트">아파트</MenuItem>
              <MenuItem value="게스트용 별채">게스트용 별채</MenuItem>
              <MenuItem value="호텔">호텔</MenuItem>
            </Select>

            <ErrorP>{errors.houseInfo?.message}</ErrorP>
          </div>
        </InfoBox>

        <InfoBox>
          <h3>주소 *</h3>
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
              {...register("subAddress", {
                required: "주소는 필수 선택사항입니다 :)",
              })}
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
                style={{ width: "30%", border: "1px solid" }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                {...register("stepSelect", {
                  required: "스텝여부는 필수 선택사항입니다 :)",
                })}
              >
                <MenuItem value="" disabled={true}>
                  예 / 아니오
                </MenuItem>
                <MenuItem value="yes">예</MenuItem>
                <MenuItem value="no">아니오</MenuItem>
              </Select>
              {hiddenSetp === "yes" ? (
                <div id="stepInputBox">
                  <StepInput
                    {...register("stepInfo", { required: true })}
                    placeholder="근무 형태를 입력해 주세요."
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <ErrorP>{errors.stepSelect?.message}</ErrorP>
          </div>
        </InfoBox>
        <InfoBox>
          <h3>링크 </h3>
          <div id="infoLink">
            <input
              placeholder="숙소 사이트, SNS 등 URL을 입력해주세요."
              {...register("link")}
            />
          </div>
        </InfoBox>
        <InfoBox>
          <h3>설명 *</h3>
          <div id="infoDes">
            <textarea
              placeholder="숙소에 대한 정보를 최대한 상세하게 입력해주시면 더 많은 고객을 만나실 수 있어요."
              {...register("des", { required: "설명은 필수입니다 :)" })}
              id="text"
            ></textarea>
            <ErrorP1>{errors.des?.message}</ErrorP1>
          </div>
        </InfoBox>
        <InfoBox>
          <h3>태그 *</h3>
          <div className="tag">
            {tagList.map((v, i) => (
              <div key={`${v}-${i}`}
              onClick={()=>{
                setTagList(tagList.filter((_,idx)=> i !== idx))
              }}>{v}</div>
            ))}
              <input
                // props={tagList.length === 10}
                onKeyPress={onKeyPress}
                placeholder="태그를 입력해 주세요."
              ></input>
            
          </div>
        </InfoBox>
        <WriteFooter onSubmit={onSubmit}/>
      </HostForm>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: auto;
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  margin: auto;
`;
const HostForm = styled.form`
  margin-top: 50px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  hr {
    width: 70%;
    /* margin:15px 0px 15px 0px; */
    margin-top: 15px;
  }
`;
const HouseBox = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-start;
`;

const ImgMainBox = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  width: 70%;
  margin-top: 3px;
`;

const ImgDesBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  #imgSelectBox {
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
`;
const ImgIcon = styled(FaImage)`
  font-size: 20px;
`;

const ImgBox = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  .list {
    display: flex;
    flex-wrap: wrap;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  cursor: grab;
  position: relative;
`;
const Img = styled.img`
  width: 180px;
  height: 180px;
  margin-top: 10px;
  margin-left: 21px;
  border-radius: 10px;
  /* position: relative; */
  user-select: none;
  pointer-events: none;
`;
const DeleteIcon = styled(MdCancel)`
  font-size: 25px;
  opacity: 0.9;
  /* color: #fff; */
  color: black;
  cursor: pointer;
  position: absolute;
  /* left: -15px; */
  right: -5px;
  bottom: 165px;
  /* top:0px; */
`;

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
  #infoTitle,
  #infoLink,
  #infoAddress {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin-right: 130px;
    input {
      height: 40px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid;
    }
  }
  #infoHouse,
  #infoCategory {
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-right: 130px;
  }

  #infoDes {
    /* height: 300px; */
    margin-right: 130px;
    width: 70%;

    textarea {
      width: 100%;
      height: 300px;
      border-radius: 5px;
      padding: 20px 10px;
      font-size: 15px;
    }
  }
  h5 {
    white-space: nowrap;
  }
  #stepBox {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    /* margin-right: 200px; */
    /* border: 1px solid; */
  }
  #stepInputBox {
    width: 65%;
    height: 70px;
    margin-left: -350px;
  }
  #stepMainBox {
    width: 70%;
    /* height: 60px; */
    display: flex;
    flex-direction: column;
    margin-right: 130px;
    /* border: 1px solid; */
  }
  .tag {
    width: 75%;
    margin-right: 80px;
    margin-bottom: 80px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    div {
      border: 1px solid;
      border-radius: 20px;
      /* width: 11%; */
      min-width: 11%;
      padding: 20px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      :hover{
        background-color: gray;
      }
    }
    input {
      /* width: 100%; */
      /* display: ${(props)=>props.props ? 'block' : 'none'}; */
      height: 40px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid;
      margin-bottom: 10px;
    }
  }
`;

const ErrorP1 = styled.p`
  font-size: 13px;
  color: red;
  margin-top: 10px;
`;
const ErrorP = styled.p`
  font-size: 13px;
  color: red;
  /* margin-bottom: 8px; */
  margin-top: 10px;
  height: 100%;
`;

const StepInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid;
  /* margin-right: 100px ; */
`;

export default HostWrite;
