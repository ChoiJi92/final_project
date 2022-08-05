import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dropzone from "react-dropzone";
import PostEditer from "../components/PostEditer";
import { useParams } from "react-router-dom";
import AddressModal from "../components/AddressModal";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../shared/axios";
import WriteFooter from "../components/WriteFooter";
import TagList from "../components/TagList";
import MetaTag from "./MetaTag";
import { useRecoilState } from "recoil";
import { textImageURL, thumbnailURL } from "../recoil/atoms";

const UserWrite = () => {
  const params = useParams();
  const [existThumbnail, setExistThumbnail] = useRecoilState(thumbnailURL);
  const [existTextImage, setExistTextImage] = useRecoilState(textImageURL);

  // params.id에 의 queryfunction이 실행될지 말지를 결정하므로 queryKey에 넣어줘야함
  const { data } = useQuery(
    ["editContent", params.id],
    () =>
      instance.get(`/post/${params.id}`).then((res) => {
        setExistThumbnail([res.data.allPost[0].images[0]]);
        setExistTextImage([
          ...res.data.allPost[0].images.filter((_, i) => i !== 0),
        ]);
        return res.data.allPost[0];
      }),
    {
      enabled: !!params.id, // params.id가 있을때만 query실행
      retry: false, // 재호출 안하기
      refetchOnWindowFocus: false, // 다른화면 갔다와도 재호출 안되게 함
    }
  );

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(data?.title);
  const [preview, setPreview] = useState(data?.images[0].postImageURL);
  const [thumbnail, setThumbnail] = useState();
  const [editorImage, setEditorImage] = useState([]);
  const [preImages, setPreImages] = useState([]);
  const [address, setAddress] = useState(data?.mainAddress);
  const [tagList, setTagList] = useState(data?.tagList ? data?.tagList : []);
  const [content, setContent] = useState();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  // 이미지 업로드 부분
  const onDrop = useCallback((acceptedFiles) => {
    setThumbnail(acceptedFiles[0]);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const titleChange = (e) => {
    // 글자수 제한
    if (e.target.value.length > 20) {
      e.target.value = e.target.value.slice(0, 20);
      setTitle(e.target.value);
    } else {
      setTitle(e.target.value);
    }
  };
  const queryClient = useQueryClient();
  // 게시글 생성
  const createPost = useMutation(
    ["createPost"],
    (formData) =>
      instance
        .post(`/post`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setOpen(true);
        }),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("content");
      },
    }
  );
  // 게시글 수정
  const updatePost = useMutation(
    ["updatePost"],
    (formData) =>
      instance
        .patch(`/post/${params.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setOpen(true);
        }),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("content");
      },
    }
  );
  const onSubmit = (data) => {
    let filterImage = preImages.filter((v) => !content.includes(v)); // 삭제된 imageurl

    let filterTextImage = existTextImage.filter(
      (v) => !content.includes(v.postImageURL)
    ); //필터된 텍스트이미지

    let index = filterImage.map((v) => preImages.indexOf(v)); //없어진 이미지 인덱스

    let newEditorImage = editorImage.filter((_, i) => !index.includes(i)); //필터된 파일 

    let newPreImages = preImages.filter((v) => content.includes(v)); // 필터된 blob 객체

    if (!thumbnail && !preview) {
      window.alert("썸네일 사진을 추가해 주세요 :)");
    } else if (!title) {
      window.alert("제목을 입력해 주세요 :)");
    } else if (!content) {
      window.alert("내용을 입력해 주세요 :)");
    } else {
      const formData = new FormData();
      if (thumbnail) {
        formData.append("images", thumbnail);
      }
      newEditorImage.forEach((file) => formData.append("images", file));
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tagList", tagList);
      formData.append("mainAddress", address);
      formData.append("subAddress", data.subAddress);
      formData.append("category", data.category);
      formData.append("type", data.type);
      formData.append("houseTitle", data.houseTitle);
      formData.append("link", data.link);
      formData.append("preImages", newPreImages);
      formData.append("deleteImages", filterTextImage);

      if (!params.id) {
        createPost.mutate(formData);
      } else {
        if (thumbnail) {
          formData.append("changeThumbnail", true);
          updatePost.mutate(formData);
        } else {
          formData.append("changeThumbnail", false);
          updatePost.mutate(formData);
        }
      }
    }
  };
  return (
    <>
      <MetaTag title={"숙소정보를 공유해 주세요 :) | 멘도롱 제주"} />
      <Wrap>
        <Container background={preview}>
          <Dropzone multiple={false} onDrop={onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                style={{
                  backgroundImage: `url(${preview})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
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
            value={title || ""}
          ></input>
          <p>{title?.length ? title.length : 0}/20</p>
        </Title>
        <PostEditer
          setContent={setContent}
          preImages={preImages}
          setPreImages={setPreImages}
          content={data?.content}
          setEditorImage={setEditorImage}
        ></PostEditer>
        <Tag>
          <h2>태그</h2>
          <TagList
            maxLength={10}
            width={"80%"}
            margin={"0px"}
            tagList={tagList}
            setTagList={setTagList}
          />
        </Tag>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrap>
            <h2>방문하신 숙소에 대한 포스팅인가요?</h2>
            <div className="sub">
              더 원활한 소통을 위해서 숙소에 대한 정보를 입력해주세요.
            </div>
            <div className="title">
              <h3>숙소 이름 *</h3>
              <div>
                <input
                  placeholder="숙소 명을 입력해주세요."
                  {...register("houseTitle", { required: true })}
                  defaultValue={data?.houseTitle ? data.houseTitle : ""}
                ></input>
                <p className="errorMessage">
                  {errors.houseTitle?.type === "required" &&
                    "숙소 명은 필수 입력사항 입니다 :)"}
                </p>
              </div>
            </div>
            <div className="category">
              <h3>카테고리 *</h3>
              <div>
                <Select
                  defaultValue={data?.category ? data?.category : ""}
                  {...register("category", { required: true })}
                  style={{
                    width: "100%",
                    height: "56px",
                    border: "none",
                    paddingLeft: "5px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    lineHeight: "150%",
                    borderRadius: "10px",
                    background: "#F7F3EF",
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled={true}>
                    숙소의 카테고리를 선택해주세요.
                  </MenuItem>
                  <MenuItem value="해변근처">해변근처</MenuItem>
                  <MenuItem value="내륙">내륙</MenuItem>
                  <MenuItem value="관광지근처">관광지근처</MenuItem>
                  <MenuItem value="조용한마을">조용한마을</MenuItem>
                  <MenuItem value="우도">우도</MenuItem>
                </Select>
                <p className="errorMessage">
                  {errors.category?.type === "required" &&
                    "카테고리는 필수 선택사항입니다 :)"}
                </p>
              </div>
            </div>
            <div className="type">
              <h3>숙소 형태 *</h3>
              <div>
                <Select
                  defaultValue={data?.type ? data.type : ""}
                  {...register("type", { required: true })}
                  style={{
                    width: "100%",
                    height: "56px",
                    border: "none",
                    paddingLeft: "5px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    lineHeight: "150%",
                    borderRadius: "10px",
                    background: "#F7F3EF",
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled={true}>
                    숙소의 형태를 선택해주세요.
                  </MenuItem>
                  <MenuItem value="게스트하우스">게스트하우스</MenuItem>
                  <MenuItem value="한옥">한옥</MenuItem>
                  <MenuItem value="펜션">펜션</MenuItem>
                  <MenuItem value="오피스텔/아파트">오피스텔/아파트</MenuItem>
                </Select>
                <p className="errorMessage">
                  {errors.type?.type === "required" &&
                    "숙소 형태는 필수 선택사항 입니다 :)"}
                </p>
              </div>
            </div>
            <div className="region">
              <h3>지역 *</h3>
              <div className="regionInput">
                <div className="mainAddress">
                  <input
                    placeholder="주소를 검색해 주세요."
                    {...register("mainAddress")}
                    defaultValue={address}
                    readOnly
                  ></input>
                  <AddressModal setAddress={setAddress} />
                </div>
                <input
                  className="subAddress"
                  placeholder="상세 주소를 입력해 주세요."
                  {...register("subAddress")}
                  defaultValue={data?.subAddress ? data.subAddress : ""}
                ></input>
                <p className="errorMessage">
                  {!address && "지역은 필수 입력사항 입니다 :)"}
                </p>
              </div>
            </div>
            <div className="link">
              <h3>링크</h3>
              <input
                placeholder="숙소 사이트, SNS 등 URL을 입력해주세요."
                {...register("link")}
                defaultValue={data?.link ? data.link : ""}
              ></input>
            </div>
          </InputWrap>
          <WriteFooter
            title={title}
            thumbnail={thumbnail}
            reset={reset}
            getValues={getValues}
            open={open}
            setOpen={setOpen}
            isHost={false}
            address={address}
            content={content}
          ></WriteFooter>
        </Form>
      </Wrap>
    </>
  );
};
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 120px 0 95px 0;
  cursor: pointer;
  div {
    width: 22.6042%;
    height: 270px;
    border: none;
    border-radius: 20px;
    background: #f7f3ef;
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
    z-index: ${(props) => props.background && "-1"};
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 150%;
    color: #8e8e93;
    letter-spacing: -0.02em;
  }
  button {
    z-index: ${(props) => props.background && "-1"};
    margin-top: 44px;
    width: 58.068%;
    height: 52px;
    border: none;
    background: #eee9e4;
    border-radius: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 150%;
    color: #636366;
    cursor: pointer;
  }
`;
const Tag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
  margin: 0 auto;
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 46px;
  }
`;
const Title = styled.div`
  width: 38.5%;
  margin-bottom: 42px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid;
  input {
    margin-bottom: 14px;
    width: 100%;
    height: 67px;
    border: none;
    font-style: normal;
    font-weight: 500;
    font-size: 46px;
    line-height: 67px;
    padding-left: 10px;
    outline: none;
    ::placeholder {
      color: #aeaeb2;
    }
  }
  p {
    color: #aeaeb2;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
  }
`;
const Form = styled.form`
  width: 100%;
`;
const InputWrap = styled.div`
  width: 50%;
  margin: 0 auto;
  h2 {
    color: #1c1c1e;
    margin-bottom: 12px;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 46px;
  }
  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
  }
  .sub {
    padding-bottom: 20px;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 29px;
    color: #aeaeb2;
    border-bottom: 1px solid;
  }
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
    div {
      width: 80%;
      p {
        color: red;
        font-size: 13px;
        margin-left: 5px;
      }
    }
    input {
      width: 100%;
      height: 56px;
      background: #f7f3ef;
      border-radius: 10px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      padding: 20px;
      border: none;
      margin-bottom: 10px;
      ::placeholder {
        color: #8e8e93;
      }
      // 크롬 자동완성 선택했을 때 인풋창 백그라운드 파란색되는거 막는 css
      :-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #f7f3ef inset;
        box-shadow: 0 0 0 1000px #f7f3ef inset;
      }
    }
  }
  .category {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
    div {
      width: 80%;
      p {
        color: red;
        font-size: 13px;
        margin-top: 10px;
        margin-left: 5px;
      }
    }
    select {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 10px;
    }
  }
  .type {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
    div {
      width: 80%;
      p {
        color: red;
        margin-top: 10px;
        font-size: 13px;
        margin-left: 5px;
      }
    }
    select {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 10px;
    }
  }
  .region {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
    .regionInput {
      display: flex;
      flex-direction: column;
      width: 80%;
      p {
        color: red;
        font-size: 13px;
        margin-left: 5px;
      }
    }
    .subAddress {
      height: 40px;
      border-radius: 5px;
      padding: 20px;
      border: none;
      border-radius: 10px;
      margin-bottom: 10px;
      height: 56px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      background: #f7f3ef;
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
      height: 56px;
      border: none;
      border-radius: 10px;
      padding: 0 20px;
      margin-bottom: 10px;
      background: #f7f3ef;
      input {
        width: 90%;
        border: none;
        outline: none;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 150%;
        background: #f7f3ef;
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
  }
  .link {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 120px;
    padding-bottom: 20px;
    input {
      width: 80%;
      height: 56px;
      border: none;
      border-radius: 10px;
      padding: 20px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      background: #f7f3ef;
      // 크롬 자동완성 선택했을 때 인풋창 백그라운드 파란색되는거 막는 css
      :-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
        box-shadow: 0 0 0 1000px white inset;
      }
    }
  }
`;
export default UserWrite;
