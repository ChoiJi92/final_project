import React, { useEffect, useState } from "react";
import styled from "styled-components";
import editIcon from "../assests/css/editIcon.png";
import deleteIcon from "../assests/css/deleteIcon.png";
import stepImg from "../assests/css/mypageImg.webp";
import land from "../assests/css/내륙.webp";
import nearby from "../assests/css/관광지근처.webp";
import allCategory from "../assests/css/모두보기.webp";
import quietVil from "../assests/css/조용한마을.webp";
import udo from "../assests/css/우도.webp";
import nearBySea from "../assests/css/해변근처.webp";
import shareIcon2 from "../assests/css/shareIcon2.png";
import saveIcon from "../assests/css/saveIcon.webp";
import unsaveIcon2 from "../assests/css/unsaveIcon2.webp";

import step from "../assests/css/step.webp";
import scrap from "../assests/css/scrap.png";

import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useMutation, useQuery, useQueryClient } from "react-query";
import DialogImg from "../components/DialogImg";
import Share from "../components/Share";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { hostShareAndMap, reviewStarList } from "../recoil/atoms";
import HouseReviewModal from "../components/HouseReviewModal";
import Profile from "../components/Profile";
import HouseReviewDetail from "../components/HouseReviewDetail";
import Footer from "../components/Footer";
import instance from "../shared/axios";
import KaKaoMap from "../components/KakaoMap";

const HouseDetail = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [moreReview, setMoreReview] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalDta] = useState([]);
  const [isReivewUpdate, setIsReviewUpdate] = useState({});

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const openModal = (id, review, star, reviewId) => {
    if (!userId) {
      //로그인이 필요한 페이지 입니다.
      navigate("/loginerror")
      // alert("로그인이 필요합니다.");
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
        .then((res) => {console.log(res.data);return(res.data)})
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
    if(userId){
      savePost.mutate(id);
    }else{
      navigate("/loginerror")
    }
  }

  const cancelSaveClick = (id) => {
    if(userId){
      saveDelete.mutate(id);
    }else{
      navigate("/loginerror")
    }
  }

  let testscore = 0;
  for (let i = 0; i < isStarReview?.reviewInfo.length; i++) {
    testscore = testscore + parseInt(isStarReview.reviewInfo[i].starpoint);
    // console.log(testscore, "이거슨 점수");
  }

  isHostShareAndMap(data);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  

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
  
 
  return (
    <>
    <Wrap>
      <div id="detailMainBox">
        <ImgBox>
          {/* <SlideImg listImg={listImg} /> */}
          <ImgInnerBox1>
            <img  src={data?.findAllAcc?.images[0]?.postImageURL} alt="이미지" />
          </ImgInnerBox1>
          <ImgInnerBox2>
            <img  src={data?.findAllAcc?.images[1]?.postImageURL} alt="이미지" />
            <ImgDiv   style={{"backgroundImage" :`url(${data?.findAllAcc?.images[2]?.postImageURL})`}}>
              <button onClick={openDialog}>사진 모두보기</button>
              <DialogImg
                open={dialogOpen}
                listImg={data?.findAllAcc?.images}
                onClose={closeDialog}
              />
            </ImgDiv>
            {/* <div></div> */}
          </ImgInnerBox2>
        </ImgBox>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <InfoBox>
            <HashMainBox>
              {data?.findAllAcc?.tagList.length > 0 && data?.findAllAcc?.tagList.map((item, idx) => (
                <HashTagBox key={idx}>{item}</HashTagBox>
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
                  {data?.findAllAcc?.title}
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
                  // border: "1px solid red"
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
                    // border: "1px solid blue"
                  }}
                >
                  {data?.findAllAcc?.userId === Number(userId) ? (
                  <>
                  <span style={{ fontSize: "21px" }}>수정하기</span>
                  {/* <Link to={`/hostwrite/${data.findAllAcc.hostId}`}> */}
                  <Link to={`/onready`}>
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
                    // border: "1px solid green"
                  }}
                >
                  {data?.findAllAcc?.userId === Number(userId) ? (
                  <>
                  <span style={{ fontSize: "21px" }}>삭제하기</span>
                  <IconImg onClick={() => {
                    onDelete(data?.findAllAcc?.hostId);
                    }} src={deleteIcon} alt="삭제" />
                  </>
                  ) : (
                  <>
                    <span style={{ fontSize: "21px" }}>저장하기</span>
                    
                    {data?.findAllAcc?.isSave ? (
                      <IconImg2
                      src={saveIcon}
                        onClick={() => {
                          cancelSaveClick(data?.findAllAcc?.hostId);
                        }}
                      />) : (
                        <IconImg2
                        src={unsaveIcon2}
                        onClick={() => {
                          saveClick(data?.findAllAcc?.hostId);
                        }}
                      />
                      )}
                  </>)}
                  
                </div>
              </div>
            </div>
            <hr style={{ marginTop: "20px" }} />
            <SubInfoBox>
              <div>
                <img src={require(`../assests/css/${data?.findAllAcc?.category}.webp`)} alt={data.category} />
                {data?.findAllAcc?.category}
              </div>
              <div>
                <img src={require(`../assests/css/${data?.findAllAcc?.houseInfo}.webp`)} alt={data.houseInfo} />
                {data?.findAllAcc?.houseInfo}
              </div>
              <div>
                <img src={step} alt="스텝" />
                {data?.findAllAcc?.stepSelect === "예"
                  ? "스텝 모집중"
                  : "스텝 모집 없음"}
              </div>
            </SubInfoBox>
            <div style={{ margin: "30px 0px 30px 0px",whiteSpace: "pre-wrap", fontSize: "18px" }}>
                {data?.findAllAcc?.hostContent}
            </div>
            <hr />
            <h1 style={{ marginTop: "20px", fontSize: "48px" }}>숙소 위치</h1>
            <MapBox >
              <KaKaoMap data={[data.findAllAcc]} height={'100%'}></KaKaoMap>
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
                    ? (testscore / isStarReview?.reviewInfo.length).toFixed(1)
                    : "0.0"}
                </span>

                <span style={{ marginLeft: "60px" }}>
                  후기  {reviewDetail.data.reviewInfo.length}개
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
              {reviewDetail.data.reviewInfo.slice(0, 4).map((item, idx) => (
                // 후기 디테일 페이지 클릭해서 모달창 데이타 보여줄 예정
                <ReviewBox key={`${item.reviewId}-${idx}`}>
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
                      ? `${item?.review?.slice(0, 40)} ...`
                      : item?.review}
                  </div>
                </ReviewBox>
              ))}
              <HouseReviewDetail
                open={reviewModalOpen}
                close={closeModalReview}
                data={modalData}
              />
              {moreReview ? (
                <>
                  {reviewDetail.data.reviewInfo.slice(4).map((item, idx) => (
                    // 후기 디테일 페이지 클릭해서 모달창 데이타 보여줄 예정
                    <ReviewBox key={item.reviewId}>
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
                          ? `${item.review.slice(0, 40)} ...`
                          : item.review}
                      </div>

                    </ReviewBox >
                  ))}
                </>
              ) : (
                ""
              )}
              {reviewDetail.data.reviewInfo.length >= 5 ? (
                <MoreReview moreReview={moreReview} onClick={reviewClick}>
                  {moreReview
                    ? `후기 ${reviewDetail.data.reviewInfo.length - 4}개 접기`
                    : `후기 ${reviewDetail.data.reviewInfo.length - 4}개 더보기`}
                </MoreReview>
              ) : (
                ""
              )}
            </ReviewListBox >
          </InfoBox>
          <RightBarBox>
            <div id="srollBar">
              <div id="barTitle">
                <h3>{data?.findAllAcc?.title}</h3>
                <span>{data?.findAllAcc?.mainAddress}</span>
                
              </div>
              <div id="barTag">
                {data?.findAllAcc?.tagList.length > 0 && data?.findAllAcc?.tagList.slice(0, 4).map((item, idx) => (
                  <HashTagBox key={idx}>{item}</HashTagBox>
                ))}
              </div>
              <div id="barDes">
                {data?.findAllAcc?.stepSelect === '예' ? (
                  data?.findAllAcc?.stepInfo
                ) : (
                  <>
                    <img style={{ width: "50%" }} src={stepImg} alt="스텝" />
                    <span>스텝 모집이 없어요.</span>
                  </>
                )}
              </div>
              <div id="btnBox">
                <Link to="/onready"> <HostBtn>호스트와 대화해보기</HostBtn></Link>
                {data?.findAllAcc?.link ? (
                <a href={data?.findAllAcc?.link}>
                <LinkBtn>예약하러 가기</LinkBtn>
                </a>) : 
                ("")}
              </div>
            </div>
          </RightBarBox>
        </div>
      </div>
    </Wrap>
    <Footer/>
    </>
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
  color:#636366;
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
  position: relative;
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
  margin-bottom: 20px;
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
    height: auto;
    top: 50px;
    width: 100%;
    border-radius: 20px;
    box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.2);
    padding: 30px 20px;
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
    span{
      font-size: 18px;
    }
  }
  #barDes {
    width: 100%;
    height: auto;
    border: 1px solid #e5e5ea;
    border-radius: 20px;
    margin-top: 30px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #636366;
  }
  #btnBox {
    width: 100%;
    /* height: 150px; */
    margin-top: 20px;
  }
  #barTag {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  #barLink{
    /* border: 1px solid red; */

    display: flex;
    
    margin-top: 10px;
    a{
      font-size: 18px;
      text-decoration: none;
      outline: none;
      color: black;
      :hover{
        color: #3498db;
      }
    }
    
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
  color:#636366;
  
`;

const LinkBtn = styled.button`
  width: 100%;
  height: 66px;
  border-radius: 10px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #EEE9E4;
  border: none;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  cursor: pointer;
  margin-top: 20px;
  color: #FDFCFB;
`

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
    color: #3A3A3C;
    img {
      width: 38px;
      height: 38px;
      margin-right: 15px;
    }
  }
`;


export default HouseDetail;
