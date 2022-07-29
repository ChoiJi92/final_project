import React, { useEffect, useRef, useState } from "react";
import mypageImg from "../assests/css/mypageImg.webp";
import styled from "styled-components";
import starIcon from "../assests/css/starIcon.webp";
import moreIcon from "../assests/css/moreIcon.webp";
import noMoreIcon from "../assests/css/noMoreIcon.webp";
import unsaveIcon2 from "../assests/css/unsaveIcon2.webp";
import saveIcon from "../assests/css/saveIcon.webp";
import likeIcon from "../assests/css/likeIcon.webp";
import unlikeIcon from "../assests/css/unlikeIcon.webp";
import commentIcon from "../assests/css/commentIcon.webp";
import checkIcon from "../assests/css/checkIcon.webp";
import cancelIcon from "../assests/css/cancelIcon.webp";
import HostRegistModal from "../components/HostRegistModal";
import { useNavigate } from "react-router-dom";
import MyInfoModal from "../components/MyInfoModal";
import editIcon from "../assests/css/editIcon.png";
import { useMutation, useQuery } from "react-query";
import instance from "../shared/axios";
import { useRecoilState } from "recoil";
import {
  myPostList,
  myLikeList,
  myHostList,
  mySaveList,
} from "../recoil/atoms";
import Footer from "../components/Footer";
import MetaTag from "./MetaTag";

const Mypage = () => {
  const [myLike, setMyLike] = useState(true);
  const [myWrite, setMyWrite] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const [upMore, setUpMore] = useState(false);
  const [bottomMore, setBottomMore] = useState(false);

  // 데이터
  const [myLikePost, setMyLikePost] = useRecoilState(myLikeList);
  const [myPost, setMyPost] = useRecoilState(myPostList);
  const [mySavePost, setMySavePost] = useRecoilState(mySaveList);
  const [myHostPost, setMyHostPost] = useRecoilState(myHostList);

  const nicknameRef = useRef();
  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickName");
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const host = localStorage.getItem("host");

  const { data } = useQuery(
    ["loadMyPage"],
    () =>
      instance
        .get(`oauth/mypage/${userId}`)
        .then((res) => {
          console.log(res.data);
          return (
            //   setMyLikePost(res.data.mylikespost), setMyPost(res.data.mypostinfo)
            res.data
          );
        })
        .catch((err) => {
          console.log(err);
          if(err.response.status === 401){
            localStorage.clear()
            window.location.reload()
          }
        }),
    {
      onSuccess: (data) => {
        setMyLikePost(data.mylikespost);
        setMyPost(data.mypostinfo);
        setMySavePost(data.mysavehost);
        setMyHostPost(data.hostinfo);
      },
    }
  );
  const nickNameUpdate = useMutation((nickname) => {
    instance
      .put(`/oauth/mypage/${userId}/nick`, { nickname })
      .then((res) => {
        localStorage.setItem("nickName", res.data.nickname);
        setIsEdit(false);
        window.location.reload();
      })
      .catch((err) => {
        window.alert(err.response.data.errorMessage);
      });
  });
  return (
    <>
    <MetaTag title={`${nickName}님의 페이지`}/>
      <MainBox>
        <ProfileBox isEdit={isEdit}>
          <div className="profileWrap">
            <MyInfoModal></MyInfoModal>
            <div id="profile">
              {isEdit ? (
                <div className="nickname">
                  <input ref={nicknameRef} defaultValue={nickName}></input>
                  <div className="btn">
                    <button
                      onClick={() => {
                        
                        nickNameUpdate.mutate(nicknameRef.current.value);
                      }}
                    >
                      저장
                      <img className="checkIcon" src={checkIcon} alt="저장"/>
                    </button>
                    <button
                      onClick={() => {
                        setIsEdit(false);
                      }}
                    >
                      취소
                      <img className="cancelIcon" src={cancelIcon} alt="취소"/>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="nickname">
                  <h3>{nickName}</h3>
                  <img
                    src={editIcon}
                    alt="닉네임 변경"
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  ></img>
                </div>
              )}
              <span>{email}</span>
            </div>
          </div>
          <div id="btn">
            {host === "true" ? (
              <button
                onClick={() => {
                  navigate("/hostwrite");
                }}
              >
                숙소 등록
              </button>
            ) : (
              <HostRegistModal></HostRegistModal>
            )}
          </div>
        </ProfileBox>

        <MyDefaultBoxTop myLike={myLike}>
          <div id="mylike">
            <div id="myInfo">
              <h1
                onClick={() => {
                  setMyLike(true);
                  setUpMore(false);
                }}
                style={{ opacity: myLike ? "1" : "0.4" }}
              >
                내 좋아요
              </h1>
              <h1
                onClick={() => {
                  setMyLike(false);
                  setUpMore(false);
                }}
                style={{ opacity: myLike ? "0.4" : "1" }}
              >
                저장함
              </h1>
            </div>
            {myLike ? (
              <span>
                {myLikePost.length === 0 ? (
                  ""
                ) : (
                  <>
                    {!upMore ? (
                      <img
                      style={{cursor:'pointer'}}
                        src={moreIcon}
                        alt="더보기"
                        onClick={() => {
                          setUpMore(true);
                        }}
                      />
                    ) : (
                      <img
                      style={{cursor:'pointer'}}
                        src={noMoreIcon}
                        alt="접기"
                        onClick={() => {
                          setUpMore(false);
                        }}
                      />
                    )}
                  </>
                )}
              </span>
            ) : (
              <span>
                {mySavePost.length === 0 ? (
                  ""
                ) : (
                  <>
                    {!upMore ? (
                      <img
                      style={{cursor:'pointer'}}
                        src={moreIcon}
                        alt="더보기"
                        onClick={() => {
                          setUpMore(true);
                        }}
                      />
                    ) : (
                      <img
                      style={{cursor:'pointer'}}
                        src={noMoreIcon}
                        alt="접기"
                        onClick={() => {
                          setUpMore(false);
                        }}
                      />
                    )}
                  </>
                )}
              </span>
            )}
          </div>
          {!upMore ? (
            <>
              {myLike ? (
                <>
                  {myLikePost.length === 0 ? (
                    <EmptyImgBox>
                      <img src={mypageImg} alt="없어요 이미지" />
                      <span>아직 좋아요 한 글이 없어요.</span>
                    </EmptyImgBox>
                  ) : (
                    <DefaultImgBox>
                      {myLikePost.slice(0, 3).map((v, i) => (
                        <img
                          src={v.images[0]?.thumbnailURL}
                          key={i}
                          alt="이미지"
                        />
                      ))}
                    </DefaultImgBox>
                  )}
                </>
              ) : (
                <>
                  {mySavePost.length === 0 ? (
                    <EmptyImgBox>
                      <img src={mypageImg} alt="없어요 이미지" />
                      <span>아직 저장한 글이 없어요.</span>
                    </EmptyImgBox>
                  ) : (
                    <DefaultImgBox>
                      {mySavePost.slice(0, 3).map((v, i) => (
                        <img
                          src={v.images[0]?.thumbnailURL}
                          key={i}
                          alt="이미지"
                        />
                      ))}
                    </DefaultImgBox>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {myLike ? (
                <HiddenMyLikeBox>
                  {myLikePost.map((v, i) => {
                    return (
                      <div key={i} id="listBox">
                        <img
                          className="thumbnailImg"
                          src={v.images[0]?.thumbnailURL}
                          alt="이미지"
                        />
                        <span className="title" style={{ marginTop: "5px" }} onClick={()=>{
                          navigate(`/community/${v.postId}`)
                        }}>
                          {v.title}
                        </span>
                        <div id="icons">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img src={commentIcon} alt="댓글" />
                            <span style={{ marginLeft: "10px" }}>
                              {v.commentNum}
                            </span>
                          </div>
                          <img src={likeIcon} alt="별점" />
                        </div>
                      </div>
                    );
                  })}
                </HiddenMyLikeBox>
              ) : (
                <HiddenMyLikeBox>
                  {mySavePost.map((v, i) => {
                    return (
                      <div key={i} id="listBox">
                        <img
                          className="thumbnailImg"
                          src={v.images[0].thumbnailURL}
                          alt="이미지"
                        />
                        <span className="title" style={{ marginTop: "5px" }} onClick={()=>{
                          navigate(`/house/${v.hostId}`)
                        }}>
                          {v.title}
                        </span>
                        <div id="icons">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img src={starIcon} alt="별점" />
                            <span style={{ marginLeft: "10px" }}>{v.average.toFixed(1)}</span>
                          </div>
                          <img src={saveIcon} alt="저장" />
                        </div>
                      </div>
                    );
                  })}
                </HiddenMyLikeBox>
              )}
            </>
          )}
        </MyDefaultBoxTop>

        <MyDefaultBoxBottom>
          <div id="myWrite">
            <div id="myInfo">
              <h1
                onClick={() => {
                  setMyWrite(true);
                  setBottomMore(false);
                }}
                style={{ opacity: myWrite ? "1" : "0.4" }}
              >
                내가 쓴 글
              </h1>
              <h1
                onClick={() => {
                  setMyWrite(false);
                  setBottomMore(false);
                }}
                style={{ opacity: myWrite ? "0.4" : "1" }}
              >
                내 숙소
              </h1>
            </div>
            {myWrite ? (
              <span>
                {myPost.length === 0 ? (
                  ""
                ) : (
                  <>
                    {!bottomMore ? (
                      <img
                      style={{cursor:'pointer'}}
                        src={moreIcon}
                        alt="더보기"
                        onClick={() => {
                          setBottomMore(true);
                        }}
                      />
                    ) : (
                      <img
                      style={{cursor:'pointer'}}
                        src={noMoreIcon}
                        alt="접기"
                        onClick={() => {
                          setBottomMore(false);
                        }}
                      />
                    )}
                  </>
                )}
              </span>
            ) : (
              <span>
                {myHostPost.length === 0 ? (
                  ""
                ) : (
                  <>
                    {!bottomMore ? (
                      <img
                      style={{cursor:'pointer'}}
                        src={moreIcon}
                        alt="더보기"
                        onClick={() => {
                          setBottomMore(true);
                        }}
                      />
                    ) : (
                      <img
                      style={{cursor:'pointer'}}
                        src={noMoreIcon}
                        alt="접기"
                        onClick={() => {
                          setBottomMore(false);
                        }}
                      />
                    )}
                  </>
                )}
              </span>
            )}
          </div>
          {!bottomMore ? (
            <>
              {myWrite ? (
                <>
                  {myPost.length === 0 ? (
                    <EmptyImgBox>
                      <img src={mypageImg} alt="없어요 이미지" />
                      <span>아직 내가 쓴 글이 없어요.</span>
                    </EmptyImgBox>
                  ) : (
                    <DefaultImgBox>
                      {myPost.slice(0, 3).map((v, i) => (
                        <img
                          src={v.images[0]?.thumbnailURL}
                          alt="이미지"
                          key={i}
                        />
                      ))}
                    </DefaultImgBox>
                  )}
                </>
              ) : (
                <>
                  {myHostPost.length === 0 ? (
                    <EmptyImgBox>
                      <img src={mypageImg} alt="없어요 이미지" />
                      <span>아직 내 숙소가 없어요.</span>
                    </EmptyImgBox>
                  ) : (
                    <DefaultImgBox>
                      {myHostPost.slice(0, 3).map((v, i) => (
                        <img  src={v.images[0].thumbnailURL} alt="이미지" />
                      ))}
                    </DefaultImgBox>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {myWrite ? (
                <HiddenMyLikeBox>
                  {myPost.map((v, i) => {
                    return (
                      <div key={i} id="listBox">
                        <img
                          className="thumbnailImg"
                          src={v.images[0]?.thumbnailURL}
                          alt="이미지"
                        />
                        <span className="title" style={{ marginTop: "5px" }} onClick={()=>{
                          navigate(`/community/${v.postId}`)
                        }}>
                          {v.title}
                        </span>
                        <div id="icons">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img src={commentIcon} alt="댓글" />
                            <span style={{ marginLeft: "10px" }}>
                              {v.commentNum}개
                            </span>
                          </div>
                          <img src={unlikeIcon} alt="좋아요" />
                        </div>
                      </div>
                    );
                  })}
                </HiddenMyLikeBox>
              ) : (
                <HiddenMyLikeBox>
                  {myHostPost.map((v, i) => {
                    return (
                      <div key={i} id="listBox">
                        <img className="thumbnailImg" src={v.images[0].thumbnailURL} alt='이미지'/>
                        <span className="title" style={{ marginTop: "5px" }} onClick={()=>{
                          navigate(`/house/${v.hostId}`)
                        }}>
                          {v.title}
                        </span>
                        <div id="icons">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img src={starIcon} alt="별점" />
                            <span style={{ marginLeft: "10px" }}>{v.average.toFixed(1)}</span>
                          </div>
                          <img src={unsaveIcon2} alt="저장" />
                        </div>
                      </div>
                    );
                  })}
                </HiddenMyLikeBox>
              )}
            </>
          )}
        </MyDefaultBoxBottom>
      </MainBox>
      <Footer />
    </>
  );
};

const MainBox = styled.div`
  /* width: 100%; */
  width: 836px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */

  margin: 0 auto;
`;

const ProfileBox = styled.div`
  /* width: 41.563%; */
  /* width: 796px; */
  margin-top: 92px;
  .profileWrap {
    display: flex;
  }
  #profile {
    margin-bottom: 21px;
    width: 100%;
    margin-left: 20px;
    .nickname {
      display: flex;
      flex-direction: row;
      margin-bottom: 6px;
      height: ${(props)=>props.isEdit && '56px'};
      h3 {
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 38px;
        margin-right: 8px;
      }
      img {
        cursor: pointer;
        width: 32px;
        height: 32px;
        opacity: 0.5;
      }
      .checkIcon{
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }
      .cancelIcon{
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }
      input {
        height: 100%;
        padding: 0 20px;
        border: none;
        background: #f7f3ef;
        border-radius: 10px;
        margin-right: 20px;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 150%;
        outline: none;
      }
      .btn {
        height: 100%;
        width: 30%;
        display: flex;
        button {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          border: none;
          height: 100%;
          width: 40%;
          background: #f7f3ef;
          border-radius: 10px;
          margin-right: 10px;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 150%;
          cursor: pointer;
        }
      }
    }
    span {
      font-style: normal;
      font-weight: 400;
      font-size: 28px;
      line-height: 33px;
      color: #8e8e93;
    }
  }
  #btn {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    button {
      width: 252px;
      height: 56px;
      border: none;
      background: #f7f3ef;
      border-radius: 10px;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #636366;
      cursor: pointer;
    }
  }
`;

const MyDefaultBoxTop = styled.div`
  margin-top: 74px;
  #mylike {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #myWrite {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span {
    /* cursor: pointer; */
  }
  h1 {
    opacity: ${(props) => (props.myLike ? "1" : "0.4")};
    margin-left: 35px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  #myInfo {
    display: flex;
    flex-wrap: nowrap;
  }
`;

const DefaultImgBox = styled.div`
  height: 270px;
  margin-top: 10px;
  display: flex;

  align-items: center;
  background: #f7f3ef;
  border-radius: 20px;
  padding: 20px 0px 20px 20px;
  img {
    width: 252px;
    height: 230px;
    margin-right: 20px;
    border-radius: 20px;
  }
  #testBox {
    display: flex;
    max-width: 100%;
    min-width: 30%;
  }
`;
const HiddenMyLikeBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: auto;
  margin: 10px 0;
  #listBox {
    width: 30.3%;
    /* width: 252px; */
    display: flex;
    flex-direction: column;
    margin: 0 12px;
    margin-bottom: 40px;
    .title {
      font-style: normal;
      font-weight: 700;
      font-size: 27px;
      line-height: 39px;
      color: #636366;
      margin-bottom: 5px;
      // 넘치는 제목 자르기
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      :hover {
      color: #3498db;
    }
    }
  }
  .thumbnailImg {
    border-radius: 20px;
    width: 100%;
    height: 230px;
    margin-bottom: 12px;
  }
  #icons {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    display: flex;
    align-items: center;
    span {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 35px;
      color: #636366;
    }
    img {
      width: 28px;
      height: 28px;
    }
  }
`;

const EmptyImgBox = styled.div`
  width: 100%;
  height: 270px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;
    opacity: 0.5;
  }
`;

const MyDefaultBoxBottom = styled.div`
  margin: 40px 0;
  #mylike {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #myWrite {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /* span {
    cursor: pointer;
  } */
  h1 {
    margin-left: 35px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  #myInfo {
    display: flex;
    flex-wrap: nowrap;
  }
  #bottomUnderbar {
    border: 1px solid green;
    width: auto;
  }
`;

export default Mypage;
