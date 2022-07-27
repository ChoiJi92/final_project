import React, { useEffect, useState } from "react";
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
import stepImg from "../assests/css/mypageImg.webp";
import inside from "../assests/css/내륙.webp";
import 관광지근처 from "../assests/css/관광지근처.webp";
import 해변근처 from "../assests/css/해변근처.webp";
import 조용한마을 from "../assests/css/조용한마을.webp";
import icecream from "../assests/css/icecream.webp";
import sunrise from "../assests/css/sunrise.webp";
import shareIcon2 from "../assests/css/shareIcon2.png";
import saveIcon from "../assests/css/saveIcon.webp";
import unsaveIcon2 from "../assests/css/unsaveIcon2.webp";

import step from "../assests/css/step.webp";
import scrap from "../assests/css/scrap.png";

import { FaHeart, FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import SlideImg from "../components/SlideImg";
import DialogImg from "../components/DialogImg";
import Map from "../components/Map";
import Share from "../components/Share";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { hostShareAndMap, reviewStarList } from "../recoil/atoms";
import Share2 from "../components/Share2";
import HouseReviewModal from "../components/HouseReviewModal";
import Profile from "../components/Profile";
import ReviewDetailModal from "../components/ReviewDetailModal";
import LoginModal from "../components/LoginModal";
import LoginError from "./LoginError";
import instance from "../shared/axios";

const HouseDetail = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [moreReview, setMoreReview] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalDta] = useState([]);
  const [isReivewUpdate, setIsReviewUpdate] = useState({});

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [testNumber, setTestNumber] = useState(0);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const openModal = (id, review, star, reviewId) => {
    if (!userId) {
      //로그인이 필요한 페이지 입니다.
      // navigate("/")
      alert("로그인이 필요합니다.");
    } else {
      setModalOpen(true);
      setIsReviewUpdate({
        id:id,
        review:review,
        star:star,
        reviewId:reviewId
      });
      console.log(review, star, " 이거슨 리뷰와 별점")
    }
  };
  // console.log(isReivewUpdate , "이거슨 유저아이디");
  const closeModal = () => {
    setModalOpen(false);
  };

  const openModalReview = (data) => {
    setReviewModalOpen(true);
    setModalDta(data)
  };
  // console.log(modalData,"이거슨 모달 데이터")
//   <ReviewDetailModal
//   open={reviewModalOpen}
//   close={closeModalReview}
// />

  const closeModalReview = () => {
    setReviewModalOpen(false);
  };

  const queryClient = useQueryClient();

  const [isStarReview, setIsStarReview] = useRecoilState(reviewStarList);
  const params = useParams();
  const hostId = params.id;
  const isHostShareAndMap = useSetRecoilState(hostShareAndMap);
  const { data } = useQuery(
    ["houseDetail", hostId],

    () => 
      instance.get(`/host/${hostId}`).then((res) => {console.log(res.data);return res.data}),
    
    {
      refetchOnWindowFocus: false,
      enabled: !!hostId,
    }
  );

  const reviewDetail = useQuery(
    ["reviewDetail", hostId],

    () => 
       instance
        .get(`/review/${hostId}/review`)
        .then((res) => {console.log(res.data);return(res.data.review)})
        .catch((err) => {
          console.log(err);
        }),
    
    {
      onSuccess: (reviewDetail) => {
        setIsStarReview(reviewDetail);
      },
      refetchOnWindowFocus: false,
      enabled: !!hostId,
    },
  );

  const testDelete = useMutation(() => {
    return instance.delete(`/host/${hostId}`);
  });

  const deleteReview = useMutation((reviewId)=>{
    return instance.delete(`/review/${hostId}/${reviewId}`)
    .then((res)=>console.log(res))
    .catch((erro)=>console.log(erro));
  },
  {
    onSuccess: () => {
      // post 성공하면 'reviweDetail'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
      queryClient.invalidateQueries("reviewDetail");
    },
  }
  )

  const savePost = useMutation(
    ["save"],(id) =>
      instance
        .post(`/save/${id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err, "why");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houseDetail");
      },
    }
  );      
  const saveDelete = useMutation(
    ["save"],(id) =>
      instance
        .delete(`/save/${id}/unsave`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err, "why");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houseDetail");
      },
    }
  );
  
  const saveClick = (id) => {
    savePost.mutate(id)
    // saveDelete.mutate(id)
    console.log(id)
  }

  const cancelSaveClick = (id) => {
    saveDelete.mutate(id)
  }

  let testscore = 0;
  for (let i = 0; i < isStarReview?.length; i++) {
    testscore = testscore + parseInt(isStarReview[i].starpoint);
    // console.log(testscore, "이거슨 점수");
  }
  // console.log(testscore, reviewDetail.data.length);
  // console.log(testscore, "이것도 점수");
  isHostShareAndMap(data);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const listImg = [jeju7, jeju8, jeju9, jeju10, jeju11, jeju12, jeju13, jeju14];
  const hashList = [0, 1, 3, 4];
  const MapRadius = "20px";

  const shareClick = () => {
    Share();
  };
  const reviewClick = () => {
    setMoreReview((prev) => !prev);
  };


  const onDelete = (id) => {
    testDelete.mutate(id);
    navigate("/house");
  };
  console.log(data.findAllAcc, "이거슨 디테일 데이터");

  return (
    <Wrap>
      <div id="detailMainBox">
        <ImgBox>
          {/* <SlideImg listImg={listImg} /> */}
          <ImgInnerBox1>
            <img src={data.findAllAcc.images[0].postImageURL} alt="이미지" />
          </ImgInnerBox1>
          <ImgInnerBox2>
            <img src={data.findAllAcc.images[1].postImageURL} alt="이미지" />
            {/* <img src={jeju2} alt="이미지" /> */}
            <ImgDiv style={{"backgroundImage" :`url(${data?.findAllAcc?.images[2]?.postImageURL})`}}>
              <button onClick={openDialog}>사진 모두보기</button>
              <DialogImg
                onClose={closeDialog}
                open={dialogOpen}
                listImg={data.findAllAcc.images}
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
              <div style={{ width: "100%" }}>
                <h1
                  style={{
                    width: "100%",
                    // border: "1px solid red",
                    fontSize: "48px",
                  }}
                >
                  {data.findAllAcc?.title}
                </h1>
              </div>
              {/* {data.findAllAcc.userId === userId ? () : ()} */}
              <div
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  justifyContent: "flex-end",
                  width: "100%",
                  marginRight:"5px",
                  border: "1px solid red"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // marginBottom: "20px",
                    // border: "1px solid blue",
                    // marginRight:"50px",
                    justifyContent: "center",
                    width: "35%",
                    border: "1px solid blue"
                  }}
                >
                  {data.findAllAcc.userId === Number(userId) ? (
                  <>
                  <span style={{ fontSize: "21px" }}>수정하기</span>
                  <Link to={`/hostwrite/${data.findAllAcc.hostId}`}>
                  <IconImg src={editIcon} alt="수정" />
                  </Link>
                  </>) : (
                  <>
                    <span style={{ fontSize: "21px" }}>공유하기</span>
                  {/* <Share props /> */}
                  {/* <IconImg onClick={shareClick}  src={shareIcon2} alt="공유"/> */}
                  <Share />
                  </>)}
                 
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft:"20px",
                    border: "1px solid green"
                  }}
                >
                  {data.findAllAcc.userId === Number(userId) ? (
                  <>
                  <span style={{ fontSize: "21px" }}>삭제하기</span>
                  <IconImg onClick={() => {
                    onDelete(data?.findAllAcc?.hostId);
                    }} src={deleteIcon} alt="삭제" />
                  </>
                  ) : (
                  <>
                    <span style={{ fontSize: "21px" }}>저장하기</span>
                    
                    {/* <IconImg2 src={unsaveIcon2} alt="저장" /> */}
                  </>)}
                  {data.findAllAcc.isSave ? (
                      <IconImg2
                      src={saveIcon}
                        onClick={() => {
                          cancelSaveClick(data.findAllAcc.hostId);
                        }}
                      />) : (
                        <IconImg2
                        src={unsaveIcon2}
                        onClick={() => {
                          saveClick(data.findAllAcc.hostId);
                        }}
                      />
                      )}
                </div>
              </div>
            </div>
            <hr style={{ marginTop: "20px" }} />
            <SubInfoBox>
              <div>
                <img src={require(`../assests/css/${data.findAllAcc.category}.webp`)} alt={data.category} />
                {data.findAllAcc.category}
              </div>
              <div>
                {/* <img src={require(`../assests/css/${data.findAllAcc.houseInfo}.webp`)} alt={data.houseInfo} /> */}
                {data.findAllAcc.houseInfo}
              </div>
              <div>
                <img src={step} />
                {data.findAllAcc.stepSelect === "예"
                  ? "스텝 모집중"
                  : "스텝 모집 없음"}
              </div>
            </SubInfoBox>
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
              <Map MapRadius={MapRadius} data={data.findAllAcc} />
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
              <div id="reviewScore">
                <StarIcon />
                <span>
                  {testscore
                    ? (testscore / isStarReview?.length).toFixed(1)
                    : "0.0"}
                </span>

                <span style={{ marginLeft: "60px" }}>
                  후기 {reviewDetail?.data?.length}개
                </span>
              </div>
              <div>
                <span
                  onClick={openModal}
                  style={{
                    fontSize: "32px",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "24px",
                  }}
                >
                  나도 후기 남기기
                </span>
                <HouseReviewModal
                  open={modalOpen}
                  close={closeModal}
                  isReivewUpdate={isReivewUpdate}
                />
              </div>
            </ReviewMainBox>
            <ReviewListBox>
              {/* 후기 작성 부분 */}
              {reviewDetail?.data?.slice(0, 4).map((item, idx) => (
                // 후기 디테일 페이지 클릭해서 모달창 데이타 보여줄 예정
                <ReviewBox>
                  {/* 프로필 부분에서 재사용 하기 위해 일단 컴포넌트로 나눔 */}
                  <div id="profileBox">
                    <Profile item={item} />
                    <div id="iconBox">
                      {userId == item?.userId ? (
                      <>
                      <img onClick={()=>{openModal(item?.userId, item?.review, item?.starpoint, item?.reviewId)}} src={editIcon} alt="수정" />
                      <img onClick={()=>{deleteReview.mutate(item?.reviewId)}}  src={deleteIcon} alt="삭제" />
                      </>) 
                      : 
                      ("")}
                      
                    </div>
                  </div>
                  <div onClick={()=>{openModalReview(item)}} id="reviewDetail">
                    {item?.review?.length >= 45
                      ? `${item?.review?.slice(0, 45)} ...`
                      : item?.review}
                  </div>
                </ReviewBox>
              ))}
              <ReviewDetailModal
                open={reviewModalOpen}
                close={closeModalReview}
                data={modalData}
              />
              {moreReview ? (
                <>
                  {reviewDetail?.data?.slice(4).map((item, idx) => (
                    // 후기 디테일 페이지 클릭해서 모달창 데이타 보여줄 예정
                    <ReviewBox>
                      {/* 프로필 부분에서 재사용 하기 위해 일단 컴포넌트로 나눔 */}
                      <div id="profileBox">
                        <Profile item={item}/>
                        <div id="iconBox">
                        {userId == item?.userId ? (
                      <>
                      <img onClick={()=>{openModal(item?.userId, item.review, item.starpoint)}} src={editIcon} alt="수정" />
                      <img onClick={()=>{deleteReview.mutate(item?.reviewId)}}  src={deleteIcon} alt="삭제" />
                      </>) 
                      : 
                      ("")}
                        </div>
                      </div>
                      <div onClick={()=>{openModalReview(item)}} id="reviewDetail">
                        {item.review.length >= 45
                          ? `${item.review.slice(0, 45)} ...`
                          : item.review}
                      </div>

                    </ReviewBox >
                  ))}
                </>
              ) : (
                ""
              )}
              {reviewDetail?.data?.length >= 5 ? (
                <MoreReview moreReview={moreReview} onClick={reviewClick}>
                  {moreReview
                    ? `후기 ${reviewDetail?.data.length - 4}개 접기`
                    : `후기 ${reviewDetail?.data.length - 4}개 더보기`}
                </MoreReview>
              ) : (
                ""
              )}
            </ReviewListBox >
          </InfoBox>
          <RightBarBox>
            <div id="srollBar">
              <div id="barTitle">
                <h3>{data?.title}</h3>
                <span>{data?.fullAddress}</span>
              </div>
              <div id="barTag">
                {hashList.slice(0, 4).map((item, idx) => (
                  <HashTagBox></HashTagBox>
                ))}
              </div>
              <div id="barDes">
                {data?.findAllAcc.stepInfo ? (
                  data?.findAllAcc.stepInfo
                ) : (
                  <>
                    <img style={{ width: "50%" }} src={stepImg} />
                    <span>스텝 모집이 없어요.</span>
                  </>
                )}
              </div>
              <div id="btnBox">
                <HostBtn>호스트와 대화해보기</HostBtn>
              </div>
            </div>
          </RightBarBox>
        </div>
        {/* <div>
          <button
            onClick={() => {
              onDelete(data?.findAllAcc?.hostId);
            }}
          >
            삭제
          </button>
        </div> */}
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
  background-color: #f7f3ef;
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
  width: 33.6px;
  height: 33.6px;
  margin-left: 10px;
  margin-bottom: 5px;
  cursor: pointer;
`;

const IconImg2 = styled.img`
  width: 42px;
  height: 42px;
  margin-left: 10px;
  margin-bottom: 5px;
  cursor: pointer;
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
  #reviewScore {
    span {
      font-size: 32px;
    }
  }
`;

const StarIcon = styled(FaStar)`
  font-size: 35px;
  margin-right: 20px;
  color: #2a7047;
  font-size: 32px;
`;

const ImgDiv = styled.div`
  margin-top: 6px;
  margin-bottom: 5px;
  width: 100%;
  height: 265px;
  /* background-image: url(${jeju2}); */
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
    :hover {
      color: #3498db;
    }
  }
  background-color: #f7f3ef;
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
    img {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }
`;
const MoreReview = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  line-height: 25px;
  margin: 40px 0px 10px 0px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #f7f3ef;

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
    /* border: 1px solid red; */
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
    height: 250px;
    border: 1px solid #e5e5ea;
    border-radius: 20px;
    margin-top: 30px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #btnBox {
    width: 100%;
    height: 150px;
    margin-top: 20px;
  }
  #barTag {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const HostBtn = styled.button`
  width: 100%;
  height: 66px;
  border-radius: 10px;
  background: #f7f3ef;
  border: none;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  cursor: pointer;
`;

const SubInfoBox = styled.div`
  width: 100%;
  height: 117px;
  background: #f7f3ef;
  border-radius: 20px;
  margin-top: 30px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 30px; */
  padding: 0px 60px;
  div {
    width: 30%;
    height: 50px;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 21px;
    line-height: 30px;
    img {
      width: 38px;
      height: 38px;
      margin-right: 15px;
    }
  }
`;

export default HouseDetail;
