import React, { useState } from "react";
import styled from "styled-components";
import jeju1 from "../assests/css/jeju1.jpeg";
import jeju2 from "../assests/css/jeju2.jpeg";
import jeju7 from "../assests/css/제주1.jpeg";
import jeju8 from "../assests/css/제주2.jpeg";
import jeju9 from "../assests/css/제주3.jpg";
import jeju10 from "../assests/css/제주4.jpeg";
import jeju11 from "../assests/css/제주5.jpg";
import jeju12 from "../assests/css/제주6.jpeg";
import jeju13 from "../assests/css/제주8.jpeg";
import jeju14 from "../assests/css/제주9.jpeg";
import editIcon from "../assests/css/editIcon.png";
import deleteIcon from "../assests/css/deleteIcon.png";
import shareIcon2 from "../assests/css/shareIcon2.png";
import unsaveIcon2 from "../assests/css/unsaveIcon2.jpeg";
import scrap from "../assests/css/scrap.png";
import { FaHeart, FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import SlideImg from "../components/SlideImg";
import DialogImg from "../components/DialogImg";
import Map from "../components/Map";
import Share from "../components/Share";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { hostShareAndMap } from "../recoil/atoms";
import Share2 from "../components/Share2";
import HouseReviewModal from "../components/HouseReviewModal";
import Profile from "../components/Profile";
import ReviewDetailModal from "../components/ReviewDetailModal";

const HouseDetail = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [moreReview, setMoreReview] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModalReview = () => {
    setReviewModalOpen(true);
  };

  const closeModalReview = () => {
    setReviewModalOpen(false);
  }

  // const { isLoading, data } = useQuery(
  //   "house",
  //   () => {
  //     return axios.get("http://localhost:5001/post").then((res) => res.data);
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // if (isLoading) {
  //   return "loading...";
  // }
  const params = useParams();
  const paramsId = params.id;
  const isHostShareAndMap = useSetRecoilState(hostShareAndMap);
  const { isLoading, data } = useQuery(
    ["houseDetail", paramsId],

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

  if (isLoading) {
    return "loading...";
  }

  console.log(data);
  isHostShareAndMap(data);
  // console.log(houseMapDetail)
  // console.log(data, isLoading);
  // const slideSetting = useSelector((state)=>state);
  // const list = useSelector((state) => state.postSlice.contents);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };
  console.log(window.location.href);

  const listImg = [jeju7, jeju8, jeju9, jeju10, jeju11, jeju12, jeju13, jeju14];
  const hashList = [0, 1, 3, 4];
  const reviewList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const MapRadius = "20px";

  const shareClick = () => {
    Share();
  };
  const reviewClick = () => {
    setMoreReview((prev) => !prev);
  };

  const deleteClick = () => {
    alert("후기 삭제!")
  }

  const reviewText =
    "숙소도 깨끗하고 침구류가 편해서 푹 잘 잤어요! :) 호스트 분도 너무 친절하시고, 정성스레 준비해주신 조식도 맛있어요.dkdkddkdkdkasasdadsadsads";

  // console.log(reviewText.length);
  const a =
    "숙소도 깨끗하고 침구류가 편해서 푹 잘 잤어요! :) 호스트 분도 너무 친절하시고, 정성스레...";
  // console.log(a.slice(0, 30) + "...");
  return (
    <Wrap>
      <div id="detailMainBox">
        <ImgBox>
          {/* <SlideImg listImg={listImg} /> */}
          <ImgInnerBox1>
            <img src={jeju10} alt="이미지" />
          </ImgInnerBox1>
          <ImgInnerBox2>
            <img src={jeju1} alt="이미지" />
            {/* <img src={jeju2} alt="이미지" /> */}
            <ImgDiv>
              <button onClick={openDialog}>사진 모두보기</button>
              <DialogImg
                onClose={closeDialog}
                open={dialogOpen}
                listImg={listImg}
              />
            </ImgDiv>
            {/* <div></div> */}
          </ImgInnerBox2>
        </ImgBox>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <InfoBox>
            <HashMainBox>
              {hashList.map((item, idx) => (
                <HashTagBox>#Hello</HashTagBox>
              ))}
            </HashMainBox>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    width: "100%",
                    border: "1px solid red",
                    fontSize: "48px",
                  }}
                >
                  {data?.title}
                </h1>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // marginLeft: "210px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "21px" }}>공유하기</span>
                  {/* <Share props /> */}
                  {/* <IconImg onClick={shareClick}  src={shareIcon2} alt="공유"/> */}
                  <Share />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "21px" }}>저장하기</span>
                  <IconImg src={unsaveIcon2} alt="저장" />
                </div>
              </div>
            </div>
            <hr style={{ marginTop: "20px" }} />
            <div style={{ margin: "30px 0px 30px 0px", fontSize: "18px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque quam consequat massa sit aliquam. Dignissim nibh at
              cras magna orci massa. Vehicula molestie facilisi eu, porta tempor
              magna quis eu aliquam. Eu sed risus dignissim sed eget. Accumsan,
              aliquam, urna id faucibus porttitor sagittis tristique tincidunt.
              Ac libero tristique risus et, dignissim. Congue risus sociis
              elementum, porta. Et justo mauris vehicula nulla ornare amet,
              gravida morbi. Massa, nulla duis imperdiet lorem viverra mattis
              facilisis fusce. Ac porta magna erat ut facilisis vel in donec ut.
              Sit phasellus malesuada viverra magna nec eget netus ultrices
              egestas. Nec dictum at dignissim fringilla vel. Senectus id lorem
              suscipit vehicula. Et aliquet arcu, tincidunt in justo posuere. Eu
              purus nibh ut ultrices pretium fermentum mi odio. Lorem massa elit
              morbi dolor. Orci tellus arcu, facilisis felis interdum.
            </div>
            <hr />
            <h1 style={{ marginTop: "20px", fontSize: "48px" }}>숙소 위치</h1>
            <MapBox>
              <Map MapRadius={MapRadius} />
            </MapBox>
            <div style={{ marginBottom: "30px" }}>
              <h2 style={{ marginTop: "20px", fontSize: "32px" }}>
                {data?.mainAddress}
              </h2>
              <h2 style={{ fontSize: "32px", opacity: "0.2" }}>
                {data?.subAddress}
              </h2>
            </div>
            <hr />
            <ReviewMainBox>
              <div>
                <StarIcon />
                <span>4.99</span>
                <span style={{ marginLeft: "10px" }}>
                  {" "}
                  후기 {reviewList.length}개
                </span>
              </div>
              <div>
                <span
                  onClick={openModal}
                  style={{
                    fontSize: "32px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  나도 후기 남기기
                </span>
                <HouseReviewModal open={modalOpen} close={closeModal} />
              </div>
            </ReviewMainBox>
            <ReviewListBox>
              {/* 후기 작성 부분 */}
              {reviewList.slice(0, 4).map((item, idx) => (
                // 후기 디테일 페이지 클릭해서 모달창 데이타 보여줄 예정
                <ReviewBox>
                  {/* 프로필 부분에서 재사용 하기 위해 일단 컴포넌트로 나눔 */}
                  <div id="profileBox">
                    <Profile />
                    <div id="iconBox">
                      <img onClick={openModal} src={editIcon} alt="수정" />
                      <img onClick={deleteClick} src={deleteIcon} alt="삭제" />
                    </div>
                  </div>
                  <div onClick={openModalReview} id="reviewDetail">
                    {reviewText.length >= 45
                      ? `${reviewText.slice(0, 45)} ...`
                      : reviewText}
                  </div>
                  {/* 리뷰 디테일 모달에서 props 데이터 넘겨줘서 보여줄 예정 */}
                  <ReviewDetailModal review={reviewText} open={reviewModalOpen} close={closeModalReview} />
                  {/* 후기 디테일 부분에서 글자수길면 slice해서 ... 보여질 예정 */}
                </ReviewBox>
              ))}
              {moreReview ? (
                <>
                  {reviewList.slice(4).map((item, idx) => (
                    // 후기 디테일 페이지 클릭해서 모달창 데이타 보여줄 예정
                    <ReviewBox>
                      {/* 프로필 부분에서 재사용 하기 위해 일단 컴포넌트로 나눔 */}
                      <div id="profileBox">
                        <Profile />
                        <div id="iconBox">
                          {/* <img src={editIcon} alt="수정" />
                          <img src={deleteIcon} alt="삭제" /> */}
                        </div>
                      </div>
                      <div onClick={openModalReview} id="reviewDetail">
                        {reviewText.length >= 45
                          ? `${reviewText.slice(0, 45)} ...`
                          : reviewText}
                      </div>
                      {/* 후기 디테일 부분에서 글자수 slice해서 ... 보여질 예정 */}
                    </ReviewBox>
                  ))}
                </>
              ) : (
                ""
              )}
              {reviewList.length >= 5 ? (
                <MoreReview moreReview={moreReview} onClick={reviewClick}>
                  {moreReview
                    ? `후기 ${reviewList.length - 4}개 접기`
                    : `후기 ${reviewList.length - 4}개 더보기`}
                </MoreReview>
              ) : (
                ""
              )}
            </ReviewListBox>
          </InfoBox>
          <RightBarBox>
            <div id="srollBar">
              <div id="barTitle">
                <h3>{data?.title}</h3>
                <span>{data?.fullAddress}</span>
              </div>
              <div id="barDes"></div>
              <div id="btnBox">
                <HostBtn>호스트와 대화해보기</HostBtn>
              </div>
            </div>
          </RightBarBox>
        </div>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  /* height: auto; */
  /* margin: auto; */
  width: 100%;
  display: flex;
  justify-content: center;
  #detailMainBox {
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const ImgBox = styled.div`
  height: 600px;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`;
const ImgInnerBox1 = styled.div`
  width: 66%;
  height: 600px;
  img {
    width: 100%;
    height: 550px;
    margin-top: 10px;
    border-radius: 30px;
  }
  /* .slick-prev:before {
    display: block;
    opacity: 1; // 기존에 숨어있던 화살표 버튼이 보이게
    color: black; // 버튼 색은 검은색으로
    left: 0;
    margin-right: -30px;
    z-index: 3;
  }
  .slick-next:before {
    display: block;
    opacity: 1;
    color: black;
    margin-left: -50px;
  } */
`;

const ImgInnerBox2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 32.3%;
  height: 600px;
  img {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 265px;
    border-radius: 30px;
  }
`;
const InfoBox = styled.div`
  width: 66%;
  height: auto;

  h1 {
    margin-bottom: 20px;
  }
`;

const HashMainBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 28px;
`;

const HashTagBox = styled.div`
  width: 173px;
  height: 45px;
  border-radius: 10px;
  background-color: #f2f2f7;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-top: 20px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 25px;
`;

const IconImg = styled.img`
  width: 42px;
  height: 42px;
  margin-left: 10px;
  margin-bottom: 5px;
`;

const MapBox = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const ReviewMainBox = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 48px;
  }
`;

const StarIcon = styled(FaStar)`
  font-size: 35px;
  margin-right: 20px;
`;

const ImgDiv = styled.div`
  margin-top: 6px;
  margin-bottom: 5px;
  width: 100%;
  height: 265px;
  background-image: url(${jeju2});
  border-radius: 30px;
  background-size: cover;
  button {
    width: 48.5%;
    height: 46px;
    font-size: 18px;
    z-index: 1;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: #fff;
    margin-left: 170px;
    margin-top: 200px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
  }
`;

const ReviewListBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
  justify-content: space-between;
  /* border: 1px solid red; */
`;

const ReviewBox = styled.div`
  width: 48%;
  height: 204px;
  margin-top: 25px;
  /* margin-right: 10px; */
  #reviewDetail {
    margin-top: 10px;
    padding: 20px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 150%;
    width: 100%;
    cursor: pointer;
    :hover{
      color: #3498db;
    }
  }
  background: #f2f2f7;
  border-radius: 20px;
  #profileBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  #iconBox {
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    img{
     width: 32px;
     height: 32px;
     cursor: pointer;
    }
  }
`;
const MoreReview = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  line-height: 25px;
  opacity: 0.5;
  margin: 40px 0px 10px 0px;
  border-radius: 10px;
  cursor: pointer;
  /* display: ${(props) => (props.moreReview ? "none" : "")}; */
`;

const RightBarBox = styled.div`
  width: 32.3%;
  /* height: 646px; */

  margin-left: 20px;
  #srollBar {
    /* top: 50px; */
    position: sticky;
    height: 646px;
    top: 50px;
    width: 100%;
    border-radius: 20px;
    box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }
  #barTitle {
    width: 100%;
    height: 100px;

    display: flex;
    flex-direction: column;
    h3 {
      font-family: "Pretendard";
      font-style: normal;
      font-weight: 600;
      font-size: 28px;
      line-height: 33px;
      margin-bottom: 25px;
    }
  }
  #barDes {
    width: 100%;
    height: 350px;
  }
  #btnBox {
    width: 100%;
    height: 150px;
  }
`;

const HostBtn = styled.button`
  width: 100%;
  height: 66px;
  border-radius: 10px;
  background: #d9d9d9;
  border: none;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  cursor: pointer;
`;

export default HouseDetail;
