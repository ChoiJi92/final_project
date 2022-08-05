import React, {useRef, useState } from "react";
import styled from "styled-components";
import { FaTimesCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import WriteFooter from "../components/WriteFooter";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import imageIcon from "../assests/css/images/imageIcon.png";
import AddressModal from "../components/AddressModal";
import TagList from "../components/TagList";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../shared/axios";
import { useRecoilState } from "recoil";
import { deletedImgList, updateImgList } from "../recoil/atoms";
import MetaTag from "./MetaTag";

const HostWrite = () => {
  const params = useParams();
  const hostId = params.id;
  const [open, setOpen] = useState(false);
  const [multiImgs, setMultiImgs] = useState([]);
  const [imgFileList, setImgFileList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const currentImg = useRef(null);
  const [takeImg, setTakeImg] = useRecoilState(updateImgList);
  const [deletedImg, setDeletedImg] = useRecoilState(deletedImgList);
  const [deleteState, setDeleteState] = useState([]);
  const [newImgList, setNewImgList] = useState([]);

  const { data } = useQuery(
    ["hostWrite", hostId],

    // ()=>getWriteData(paramsId),
    () => {
      return instance.get(`/host/${hostId}`).then((res) => { return res.data.findAllAcc});
    },
    {
      onSuccess: (data) => {
        setTakeImg(data.images); //맨 처음 이미지 받아오는 스테이트
        setDeletedImg(data.images); // 삭제되고 남아있는 스테이트
      },
      refetchOnWindowFocus: false,
      enabled: !!hostId,
    }
  );
  const [address, setAddress] = useState(data?.mainAddress);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const onSortEnd = (oldIndex, newIndex) => {
    setMultiImgs((array) => arrayMove(array, oldIndex, newIndex));
    setTakeImg((array) => arrayMove(array, oldIndex, newIndex))
  };

  const onImgChange = (e) => {
    if (!hostId) {
      const imgLists = e.target.files;
      let imgUrlLists = [...multiImgs];
      let postImgList = [];
      for (let i = 0; i < imgLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imgLists[i]);

        postImgList.push(imgLists[i]);
        // setUploadTest(imgLists[i])
        imgUrlLists.push(currentImageUrl);
      }
      if (imgUrlLists.length > 8) {
        imgUrlLists = imgUrlLists.slice(0, 8);
      }
      setMultiImgs(imgUrlLists); //보여지는 이미지들
      setImgFileList([...imgFileList, ...postImgList]); // 포스트 요청보내는 이미지들
    } else {
      const imgLists = e.target.files;
      let testImgUrlLists = [...takeImg]; //기존 이미지 스테이트
      let updateImgList = []; // 새로 추가 된 이미지
      for (let i = 0; i < imgLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imgLists[i]);
        updateImgList.push(imgLists[i]);
        testImgUrlLists.push(currentImageUrl);
      }
      if (testImgUrlLists.length > 8) {
        testImgUrlLists = testImgUrlLists.slice(0, 8);
      }
      setTakeImg(testImgUrlLists);
      setNewImgList([...newImgList, ...updateImgList]); //새롭게 추가된 이미지 파일 리스트
    }
  };

  const imgClick = () => {
    currentImg.current.click();
  };

  const deleteImage = (id) => {
    setMultiImgs(multiImgs.filter((_, index) => index !== id));
    setImgFileList(imgFileList.filter((_, idx) => idx !== id));
  };

  const uploadDeleteImg = (id) => {
    //이거슨 삭제되고 보여지는 스테이트
    setTakeImg(takeImg.filter((_, idx) => idx !== id));

    setNewImgList(newImgList.filter((_, idx) => idx !== id));
    // 삭제 된 이미지 스테이트
    setDeleteState((prev) => [
      ...prev,
      ...takeImg.filter((_, idx) => idx == id),
    ]);
    //스테이트에 삭제 된 이미지들 저장해야함!!
  };

  const queryClient = useQueryClient();

  const hostWrite = useMutation(
    (data) =>
      instance
        .post(`/host`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setOpen(true);

        })
        .catch((err) => {

        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houseInfo");
      },
    }
  );

  const updateMutation = useMutation(
    (updateData) => {
      return instance.put(`/host/${hostId}`, updateData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setOpen(true);
      })
      .catch((err) => {

      })
    }
   
  );
 
  const onSubmit = (data) => {
   
    if (multiImgs.length  > 3 || takeImg.length > 3) {
      const formData = new FormData();
      formData.append("category", data.category);
      formData.append("houseInfo", data.houseInfo);
      formData.append("link", data.link);
      formData.append("mainAddress", address);
      formData.append("subAddress", data.subAddress);
      formData.append("hostContent", data.postContent);
      formData.append("stepInfo", data.stepInfo);
      formData.append("stepSelect", data.stepSelect);
      formData.append("title", data.title);
      formData.append("tagList", tagList);
      

      if (hostId) {
        formData.append("existImages", deletedImg);
        formData.append("deleteImages", deleteState);
        newImgList.forEach((item) => formData.append("images", item));
        updateMutation.mutate(formData);
      } else {
        imgFileList.forEach((item) => formData.append("images", item));
        hostWrite.mutate(formData);
      }
    } else {
      window.alert("사진을 4장 이상 첨부해 주세요!!");
    }
  };

  const hiddenSetp = watch("stepSelect");
  return (
    <>
      <MetaTag title={"숙소등록 | 멘도롱 제주"} />
    
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
                    {multiImgs.length ? multiImgs.length : takeImg.length} / 8
                  </span>
                </div>
              </div>
              <span style={{ color: "red", fontSize: "13px" }}>
              </span>
            </ImgDesBox>

            <ImgBox>
              <SortableList
                onSortEnd={onSortEnd}
                className="list"
                draggedItemClassName="dragged"
              >
                {hostId ? (
                  <>
                    {takeImg.map((v, index) => (
                      <SortableItem key={`item-${index}`}>
                        <List>
                          <Img
                            src={v.postImageURL ? v.postImageURL : v}
                            alt="이미지"
                          />
                          <DeleteIcon
                            id="deleteIcon"
                            onClick={() => uploadDeleteImg(index)}
                          />
                        </List>
                      </SortableItem>
                    ))}
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </SortableList>
            </ImgBox>
          </ImgMainBox>
          <hr />
          <InfoBox>
            <h2>숙소 이름 *</h2>
            <div id="infoTitle">
              <input
                placeholder="숙소 이름을 입력해주세요."
                defaultValue={data?.title ? data.title : ""}
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
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#f7F3EF",
                  padding: "10px",
                }}
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
                <MenuItem value="관광지근처">관광지 근처</MenuItem>
                <MenuItem value="조용한마을">조용한 마을</MenuItem>
                <MenuItem value="우도">우도</MenuItem>
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
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  fontStyle: "nomal",
                  border: "none",
                  backgroundColor: "#f7F3EF",
                  padding: "10px",
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={data?.houseInfo ? data?.houseInfo : ""}
              >
                <MenuItem
                  style={{
                    fontWeight: 500,
                    lineHeight: "150%",
                    color: "#8E8E93",
                    fontStyle: "nomal",
                  }}
                  value=""
                  disabled={true}
                >
                  숙소의 형태를 선택해주세요.
                </MenuItem>
                <MenuItem value="게스트하우스">게스트하우스</MenuItem>
                <MenuItem value="펜션">펜션</MenuItem>
                <MenuItem value="한옥">한옥</MenuItem>
                <MenuItem value="오피스텔/아파트">오피스텔/아파트</MenuItem>
              </Select>

              <ErrorP>{errors.houseInfo?.message}</ErrorP>
            </div>
          </InfoBox>

          <InfoBox>
            <h2>주소 *</h2>
            <div className="regionInput">
              <div
                style={{
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#f7F3EF",
                }}
                className="mainAddress"
              >
                <input
                  placeholder="주소를 검색해 주세요."
                  readOnly
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#f7F3EF",
                    padding: "10px",
                  }}
                  {...register("mainAddress")}
                  defaultValue={address}
                />
                <AddressModal setAddress={setAddress}></AddressModal>
              </div>
              <input
                className="subAddress"
                placeholder="주소를 정확히 작성해야 지도에 표시됩니다."
                {...register("subAddress", {
                })}
                defaultValue={data?.subAddress ? data?.subAddress : ""}
                style={{
                  borderRadius: "10px,",
                  border: "none",
                  backgroundColor: "#f7F3EF",
                  padding: "20px",
                }}
              ></input>

              <ErrorP1> {!address && "주소검색은 필수 입력사항 입니다 :)"}</ErrorP1>
            </div>
          </InfoBox>

          <InfoBox>
            <h2>스텝을 구하시나요? *</h2>
            <div id="stepMainBox">
              <div id="stepBox">
                <MuiSelect
                  style={{
                    width: "30%",
                    borderRadius: "10px",
                    fontWeight: "500",
                    border: "none",
                    backgroundColor: "#f7F3EF",
                    padding: "10px",
                  }}
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
                      placeholder="예) 2주・유급・2일 근무, 2일 휴무"
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
                {...register("postContent", {
                  required: "설명은 필수입니다 :)",
                })}
                defaultValue={data?.hostContent ? data?.hostContent : ""}
                id="text"
              ></textarea>
              <ErrorP1>{errors.postContent?.message}</ErrorP1>
            </div>
          </InfoBox>
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
            width={"59.3%"}
            margin={"272px"}
            tagList={tagList}
            setTagList={setTagList}
          />
        </Tag>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  height: auto;
  width: 100%;
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
    margin-top: 10px;
    border-radius: 10px;
    background-color: #f7f3ef;
    cursor: pointer;
  }
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
  user-select: none;
  pointer-events: none;
`;
const DeleteIcon = styled(FaTimesCircle)`
  font-size: 20px;
  background-color: #f7f3ef;
  border: none;
  border-radius: 50%;
  color: #bdc3c7;
  z-index: 2;
  opacity: 1;
  cursor: pointer;
  position: absolute;
  right: 5px;
  bottom: 245px;
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
      padding: 20px;
      border-radius: 10px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      border: none;
      background-color: #f7f3ef;
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
    margin-right: 272px;
    width: 59.3%;
    display: flex;
    flex-direction: column;
    textarea {
      height: 420px;
      border-radius: 10px;
      padding: 20px;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      border: none;
      background-color: #f7f3ef;
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
  }
  #stepInputBox {
    width: 68%;
    height: 70px;
  }
  #stepMainBox {
    width: 59.3%;
    display: flex;
    flex-direction: column;
    margin-right: 272px;
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
      height: 50px;
      padding: 20px;
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
  margin-top: 10px;
  height: 100%;
`;

const StepInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 20px;
  border-radius: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  border: none;
  background-color: #f7f3ef;
  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #f7f3ef inset;
    box-shadow: 0 0 0 1000px #f7f3ef inset;
  }
`;
const Tag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto 55px auto;
  padding: 20px 0;
  h2 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
  }
`;

const MuiSelect = styled(Select)``;
export default HostWrite;
