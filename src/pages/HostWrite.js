import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import WriteFooter from "../components/WriteFooter";
import { FaImage } from "react-icons/fa";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import imageIcon from "../assests/css/imageIcon.png";
import { MdCancel } from "react-icons/md";
import AddressModal from "../components/AddressModal";
import TagList from "../components/TagList";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import Modal from "../components/Modal";

const HostWrite = () => {
  const params = useParams();
  const paramsId = params.id;
  const [testModal, setTestModal] = useState(false);
  const [open, setOpen] = useState(false);
  //   const getWriteData = async (id) => {
  //     const { data } = await axios.get(`http://localhost:5001/testList/${id}`)
  //     return data
  // }

  const { data } = useQuery(
    ["hostWrite", paramsId],

    // ()=>getWriteData(paramsId),
    () => {
      return axios
        .get(`http://localhost:5001/testList/${paramsId}`)
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!paramsId,
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      // category:data?.category,
      // houseInfo:data?.houseInfo,
      // stepSelect:data?.value,
      // stepInfo:data?.stepInfo,
      // link:data?.link,
      // postContent:data?.postContent,
      // subAddress:data?.subAddress,
      // mainAddress: data?.mainAddress,
    },
  });
  const [multiImgs, setMultiImgs] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [addressError, setAddressError] = useState(false);
  const [address, setAddress] = useState("");
  const currentImg = useRef(null);

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

  const queryClient = useQueryClient();

  const testWrite = async (hostData) => {
    const { data } = await axios
      .post("http://localhost:5001/testList/", hostData)
      .then((res) => console.log(res));
    return data;
  };

  const postMutate = useMutation(testWrite, {
    onSuccess: () => {
      queryClient.invalidateQueries("hostWrite");
    },
  });

  const postMutation = useMutation(
    (hostData, address) => {
      return axios.post("http://localhost:5001/testList", hostData, address);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("hostWrite");
      },
    }
  );

  const updateMutation = useMutation(
    (updateData) => {
      return axios.put(
        `http://localhost:5001/testList/${paramsId}`,
        updateData
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("hostWrite");
      },
    }
  );

  const onSubmit = (data) => {
    if (address === "") {
      setAddressError(true);
    }
    if (paramsId) {
      console.log("hi");
      updateMutation.mutate(data);
    } else {
      // const formData = new FormData();
      // formData.append("category",data.category)
      // formData.append("houseInfo",data.houseInfo)
      // formData.append("link",data.link)
      // formData.append("mainAddress",data.address)
      // formData.append("subAddress",data.subAddress)
      // formData.append("postContent",data.postContent)
      // formData.append("stepInfo",data.stepInfo)
      // formData.append("stepSelect",data.stepSelect)
      // formData.append("title",data.title)
      // formData.append("images",multiImgs)
    //   {
    //   "title": "간장남들",
    //   "category": "내륙",
    //   "houseInfo": "아파트",
    //   "fullAddress":"제주 서귀포시 안덕면 사계북로41번길 30",
    //   "mainAddress":"",
    //   "subAddress":"",
    //   "stepSelect": "아니오",
    //   "stepInfo":"",
    //   "link": "",
    //   "postContent": "ㅋㅋㅋㅋㅋ",
    // }
      console.log("hello", data);
      postMutation.mutate(data, address);
      setTestModal(true);
      setOpen(true);
    }
    // else{
    //   console.log(tag)
    //   console.log(data, address);
    //   const fulladdress =  address + data.subAddress
    //   console.log(multiImgs);
    //   console.log(fulladdress);
    // }
  };

  const hiddenSetp = watch("stepSelect");
  // console.log(data)
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
                    <DeleteIcon
                      id="deleteIcon"
                      onClick={() => deleteImage(index)}
                    />
                  </List>
                </SortableItem>
              ))}
            </SortableList>
          </ImgBox>
        </ImgMainBox>
        <hr />
        <InfoBox>
          <h2>숙소 이름 *</h2>
          <div id="infoTitle">
            <input
              placeholder="숙소 이름을 입력해주세요."
              defaultValue={data?.title ? data?.title : ""}
              {...register("title", { required: true })}
            />
            <ErrorP1>
              {errors.title?.type === "required" &&
                "제목은 필수 선택사항입니다 :)"}
            </ErrorP1>
          </div>
        </InfoBox>
        <InfoBox>
          <h2>카테고리 *</h2>
          <div id="infoCategory">
            <Select
              style={{ width: "100%", height: "50px", borderRadius: "10px" }}
              {...register("category", {
                required: "카테고리는 필수 선택사항입니다 :)",
              })}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              defaultValue={data?.category ? data?.category : ""}
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
          <h2>숙소형태 *</h2>
          <div id="infoHouse">
            <Select
              {...register("houseInfo", {
                required: "숙소형태는 필수 선택사항입니다 :)",
              })}
              style={{ width: "100%", height: "50px", borderRadius: "10px", fontStyle:"nomal"  }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              defaultValue={data?.houseInfo ? data?.houseInfo : ""}
            >
              <MenuItem style={{fontWeight:500, lineHeight:"150%", color:"#8E8E93", fontStyle:"nomal"}} value="" disabled={true}>
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
          <h2>주소 *</h2>
          <div className="regionInput">
            <div style={{ borderRadius: "10px" }} className="mainAddress">
              <input
                placeholder="주소를 검색해 주세요."
                // {...register("mainAddress", { required: true })}
                // value={address}
                readOnly
                value={address || data?.mainAddress}
                style={{ borderRadius: "10px" }}
                {...register("mainAddress")}
                // defaultValue={address ? address : data?.mainAddress }
              />
              <AddressModal setAddress={setAddress}></AddressModal>
            </div>
            <input
              className="subAddress"
              placeholder="주소를 정확히 작성해야 지도에 표시됩니다."
              {...register("subAddress", {
                required: "상세주소는 필수 선택사항입니다 :)",
              })}
              defaultValue={data?.subAddress ? data?.subAddress : ""}
              style={{ borderRadius: "10px" }}
            ></input>
            {addressError ? (
              <ErrorP1>주소는 필수 선택사항입니다 :)</ErrorP1>
            ) : (
              <ErrorP1>{errors.subAddress?.message}</ErrorP1>
            )}
          </div>
        </InfoBox>

        <InfoBox>
          <h2>스텝을 구하시나요? *</h2>
          <div id="stepMainBox">
            <div id="stepBox">
              <MuiSelect
                style={{ width: "30.2%", borderRadius: "10px", "fontWeight":"500" }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                {...register("stepSelect", {
                  required: "스텝여부는 필수 선택사항입니다 :)",
                })}
                defaultValue={data?.stepSelect ? data?.stepSelect : ""}
              >
                <MenuItem value="" disabled={true}>
                  예 / 아니오
                </MenuItem>
                <MenuItem value="예">예</MenuItem>
                <MenuItem value="아니오">아니오</MenuItem>
              </MuiSelect>
              {hiddenSetp === "예" ? (
                <div id="stepInputBox">
                  <StepInput
                    style={{ borderRadius: "10px" }}
                    {...register("stepInfo", { required: true })}
                    placeholder="근무 형태를 입력해 주세요."
                    defaultValue={data?.stepInfo ? data?.stepInfo : ""}
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
          <h2>링크 </h2>
          <div id="infoLink">
            <input
              placeholder="숙소 사이트, SNS 등 URL을 입력해주세요."
              {...register("link")}
              defaultValue={data?.link ? data?.link : ""}
            />
          </div>
        </InfoBox>
        <InfoBox>
          <h2>설명 *</h2>
          <div id="infoDes">
            <textarea
              placeholder="숙소에 대한 정보를 최대한 상세하게 입력해주시면 더 많은 고객을 만나실 수 있어요."
              {...register("postContent", { required: "설명은 필수입니다 :)" })}
              defaultValue={data?.postContent ? data?.postContent : ""}
              id="text"
            ></textarea>
            <ErrorP1>{errors.postContent?.message}</ErrorP1>
          </div>
        </InfoBox>
        <Modal testModal={testModal} />
        <WriteFooter
          reset={reset}
          onSubmit={onSubmit}
          open={open}
          setOpen={setOpen}
          isHost={true}
        />
      </HostForm>
      <Tag>
        <h2>태그</h2>
        <TagList
          maxLength={10}
          isModal={false}
          tagList={tagList}
          setTagList={setTagList}
        />
      </Tag>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: auto;
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
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
  h1 {
    font-size: 32px;
  }
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
    width: 251px;
    height: 272px;
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
  width: 81.5%;
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
  :hover {
    img {
      opacity: 0.5;
    }
    #deleteIcon {
      display: block;
    }
  }
`;
const Img = styled.img`
  width: 251px;
  height: 272px;
  margin-top: 10px;
  margin-left: 21px;
  border-radius: 10px;
  /* position: relative; */
  user-select: none;
  pointer-events: none;
`;
const DeleteIcon = styled(FaTimesCircle)`
  font-size: 20px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  color: #bdc3c7;
  z-index: 2;
  opacity: 1;
  /* color: black; */
  cursor: pointer;
  position: absolute;
  /* left: -15px; */
  right: 5px;
  bottom: 245px;
  /* top:0px; */
  display: none;
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
    width: 59.3%;
    margin-right: 272px;
  }
  .subAddress {
    height: 56px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #c7c7cc;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
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
    border-radius: 10px;
    border: 1px solid #c7c7cc;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    input {
      width: 90%;
      border: none;
      outline: none;
      height: 56px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;

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
    width: 59.3%;
    margin-right: 272px;
    input {
      height: 56px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #c7c7cc;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
    }
  }
  #infoHouse,
  #infoCategory {
    width: 59.3%;
    display: flex;
    flex-direction: column;
    margin-right: 272px;
  }

  #infoDes {
    /* height: 300px; */
    margin-right: 272px;
    width: 59.3%;
    display: flex;
    flex-direction: column;
    textarea {
      /* width: 71.5%; */
      height: 420px;
      border-radius: 10px;
      padding: 20px 10px;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      border: 1px solid #c7c7cc;
    }
  }
  h5 {
    white-space: nowrap;
  }
  #stepBox {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    margin-left: -5px;
    /* border: 1px solid; */
  }
  #stepInputBox {
    width: 48%;
    height: 70px;
    margin-right: 230px;
  }
  #stepMainBox {
    width: 80%;
    margin-right: -11px;
    /* height: 60px; */
    display: flex;
    flex-direction: column;
    /* margin-right: 130px; */
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
      :hover {
        background-color: gray;
      }
    }
    input {
      /* width: 100%; */
      /* display: ${(props) => (props.props ? "block" : "none")}; */
      height: 50px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid;
      margin-bottom: 10px;
    }
  }
  h2 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
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
  width: 90%;
  height: 56px;
  padding: 10px;
  border-radius: 10px;
  margin-right: -200px;
  border: 1px solid #c7c7cc;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
`;
const Tag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
  padding: 20px 0;
  h2 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
  }
`;

const MuiSelect = styled(Select)`

`
export default HostWrite;
