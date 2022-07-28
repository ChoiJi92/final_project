import React, { useState, useCallback} from "react";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dropzone from "react-dropzone";
import PostEditer from "../components/PostEditer";
import {
  useParams,
  UNSAFE_NavigationContext as NavigationContext,
} from "react-router-dom";
import AddressModal from "../components/AddressModal";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../shared/axios";
import WriteFooter from "../components/WriteFooter";
import TagList from "../components/TagList";

const UserWrite = () => {
  const params = useParams();
  const userId = localStorage.getItem('userId')
  // params.id에 의 queryfunction이 실행될지 말지를 결정하므로 queryKey에 넣어줘야함
  const { data } = useQuery(
    ["editContent", params.id],
    () =>
      instance.get(`/post/${params.id}`, { params: { userId: Number(userId) } }).then((res) => {
        console.log(res.data);
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
  const [preview, setPreview] = useState(data?.images[0].thumbnailURL);
  const [thumbnail, setThumbnail] = useState();
  const [editorImage, setEditorImage] = useState([]);
  const [preImages, setPreImages] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  const [address, setAddress] = useState(data?.mainAddress);
  const [tagList, setTagList] = useState(data?.tagList[0] ? data?.tagList[0] : [])  ;
  // const address = useRecoilValue(addressState);
  const [content, setContent] = useState();
  // const [imageKey, setImageKey] = useState([]);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  // 이미지 업로드 부분
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    // let imagelist = []; // 미리보기 이미지 담을 리스트
    // let filelist = []; // 업로드할 파일을 담을 리스트
    // 이미지 미리보기 createObjectURL 버전
    setThumbnail(acceptedFiles[0]);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
    // console.log(imagelist[i]);
    // setPreview([...preview, ...imagelist]);
    // let reader = new FileReader(); // 이미지 미리보기!!!
    // reader.readAsDataURL(acceptedFiles[i]);
    // reader.onload = () => {
    //   imagelist[i] = reader.result;
    //   setPreview([...preview, ...imagelist]);
    // };
    // setThumbnail([...thumbnail, ...filelist]);
    // e.target.value = "";
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
          console.log(res.data);
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
          console.log(res.data);
        }),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("content");
      },
    }
  );
  const onSubmit = (data) => {
    // console.log(data);
    // console.log(title);
    console.log(content);
    // console.log(thumbnail);
    // console.log(address);
    // console.log(tagList);
    console.log(editorImage); // foreach 돌려야함
    console.log(preImages);
    console.log("저장");
    let filterImage = preImages.filter((v) => !content.includes(v)) // 삭제된 imageurl
    console.log(filterImage,'나는 없어진 이미지!')
    let index = filterImage.map((v) => preImages.indexOf(v))
    console.log(index,'나는 없어진 친구 인덱스')
    let newEditorImage =editorImage.filter((_,i)=> !index.includes(i))
    console.log(editorImage.filter((_,i)=> !index.includes(i)),'나는 필터된 file!!')
    let newPreImages=preImages.filter((v) => content.includes(v))
    console.log(preImages.filter((v) => content.includes(v)),'필터된 친구');
    let preFilterImages =preImages.filter((v) => content.includes(v))
    console.log(preFilterImages)
    

    if (!thumbnail && !preview) {
      window.alert("썸네일 사진을 추가해 주세요 :)");
    } else if (!title) {
      window.alert("제목을 입력해 주세요 :)");
    } else if (!content) {
      window.alert("내용을 입력해 주세요 :)");
    } else {
      const formData = new FormData();
      if (thumbnail) {
        console.log("여기 지나가나요?");
        formData.append("images", thumbnail);
      }
      // else{
      //   console.log('여기는?')
      //   formData.append("images", preview)
      // }
      console.log(newEditorImage,'필터된 파일객체들')
      console.log(newPreImages,'필터된 url들')
      // newEditorImage.forEach((file)=> formData.append('images',file))

      formData.append("title", title);
      formData.append("content", content);
      formData.append("tagList",tagList)
      formData.append("mainAddress", address ? address : data.mainAddress);
      formData.append("subAddress", data.subAddress);
      formData.append("category", data.category);
      formData.append("type", data.type);
      formData.append("houseTitle", data.houseTitle);
      formData.append("link", data.link);
      formData.append("preImages", newPreImages);
      // formData.append(
      //   "thumbnailKEY",
      //   thumbnailKey ? thumbnailKey : ""
      // );
      // formData.append(
      //   "ImageKEY",
      //   imageKey.filter((v) => !content.includes(v))
      // );
      if (!params.id) {
        console.log("저장");
        createPost.mutate(formData);
        // setOpen(true);
      } else {
        console.log(params.id);
        console.log("여기와야대!");
        updatePost.mutate(formData);
        // setOpen(true);
      }
    }
  };
  return (
    <Wrap>
      <Container background={preview}>
        <Dropzone multiple={false} onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              style={{ backgroundImage: `url(${preview})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center' }}
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
                // onChange={handleChange}
                defaultValue={data?.category ? data?.category : ""}
                // value={data.category ? data.category : ""}
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
                {/* <MenuItem value="성산일출봉">성산일출봉</MenuItem> */}
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
                // onChange={handleChange}
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
                  // value={address || ""}
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
  );
};
const Wrap = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 120px; */
  width: 100%;
  margin: 120px 0 95px 0;
  /* border: 1px solid; */
  /* height: 300px;
  background-size: cover;
  background-repeat: no-repeat; */
  cursor: pointer;
  div {
    /* width: 434px; */
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
