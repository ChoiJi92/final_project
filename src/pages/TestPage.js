import React, { useEffect, useRef, useState } from "react";
import jeju1 from "../assests/css/jeju1.jpeg";
import mypageImg from "../assests/css/mypageImg.webp";
import styled from "styled-components";
import {
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";
import HostRegistModal from "../components/HostRegistModal";
import { useNavigate } from "react-router-dom";
import MyInfoModal from "../components/MyInfoModal";
import editIcon from "../assests/css/editIcon.png";
import { useMutation, useQuery } from "react-query";
import instance from "../shared/axios";
import { useRecoilState } from "recoil";
import { myPostList,myLikeList,myHostList,mySaveList } from "../recoil/atoms";

const TestPage = () => {
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

  const { data } = useQuery(["loadMyPage"], () =>
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
      }),{
        onSuccess: (data) => {
            setMyLikePost(data.mylikespost)
            setMyPost(data.mypostinfo)
        }
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
    <MainBox>
      <ProfileBox>
        <div className="profileWrap">
          <MyInfoModal></MyInfoModal>
          <div id="profile">
            {isEdit ? (
              <div className="nickname">
                <input ref={nicknameRef} defaultValue={nickName}></input>
                {/* <img src={editIcon} alt="닉네임 변경"></img> */}
                <div className="btn">
                  <button
                    onClick={() => {
                      console.log(nicknameRef.current.value);
                      nickNameUpdate.mutate(nicknameRef.current.value);
                    }}
                  >
                    저장
                  </button>
                  <button
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    취소
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
              }}
              style={{ opacity: `${myLike}? '1' : '0.4'` }}
            >
              내 좋아요
            </h1>
            <h1
              onClick={() => {
                setMyLike(false);
              }}
              style={{ opacity: `${!myLike}? '1' : '0.4'` }}
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
                    <DownIcon
                      onClick={() => {
                        setUpMore(true);
                      }}
                    />
                  ) : (
                    <UpIcon
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
                    <DownIcon
                      onClick={() => {
                        setUpMore(true);
                      }}
                    />
                  ) : (
                    <UpIcon
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
                        src={v.images[0].thumbnailURL}
                        key={i}
                        alt="이미지"
                      />
                    ))}
                  </DefaultImgBox>
                )}
              </>
            ) : (
              <>
                {myLikePost.length === 0 ? (
                  <EmptyImgBox>
                    <img src={mypageImg} alt="없어요 이미지" />
                    <span>아직 저장한 글이 없어요.</span>
                  </EmptyImgBox>
                ) : (
                  <DefaultImgBox>
                    {mySavePost.slice(0, 3).map((v, i) => (
                      <img
                        src={v.images[0].thumbnailURL}
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
                      <img src={v.images[0].thumbnailURL} alt="이미지" />
                      <span style={{ marginTop: "5px" }}>{v.title}</span>
                      <div id="icons">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <StarIcon />
                          <span style={{ marginLeft: "10px" }}>4.5</span>
                        </div>
                        <HeartIcon />
                      </div>
                    </div>
                  );
                })}
              </HiddenMyLikeBox>
            ) : (
              <HiddenMyLikeBox>
                {mySavePost.map((item, idx) => {
                  return (
                    <div key={idx} id="listBox">
                      <img src={jeju1} alt="이미지" />
                      <span style={{ marginTop: "5px" }}>해변가 근처 숙소</span>
                      <div id="icons">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <StarIcon />
                          <span style={{ marginLeft: "10px" }}>4.5</span>
                        </div>
                        <HeartIcon />
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
              }}
            >
              내가 쓴 글
            </h1>
            <h1
              onClick={() => {
                setMyWrite(false);
              }}
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
                    <DownIcon
                      onClick={() => {
                        setBottomMore(true);
                      }}
                    />
                  ) : (
                    <UpIcon
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
                  {bottomMore ? (
                    <DownIcon
                      onClick={() => {
                        setBottomMore(true);
                      }}
                    />
                  ) : (
                    <UpIcon
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
                        src={v.images[0].thumbnailURL}
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
                    {myHostPost.slice(0, 3).map((item, idx) => (
                      <img style={{}} src={jeju1} alt="이미지" />
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
                      <img src={v.images[0].thumbnailURL} alt="이미지" />
                      <span style={{ marginTop: "5px" }}>{v.title}</span>
                      <div id="icons">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CommentIcon />
                          <span style={{ marginLeft: "10px" }}>
                            {v.commentNum}개
                          </span>
                        </div>
                        <HeartIcon />
                      </div>
                    </div>
                  );
                })}
              </HiddenMyLikeBox>
            ) : (
              <HiddenMyLikeBox>
                {myHostPost.map((item, idx) => {
                  return (
                    <div key={idx} id="listBox">
                      <img src={jeju1} />
                      <span style={{ marginTop: "5px" }}>해변가 근처 숙소</span>
                      <div id="icons">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <StarIcon />
                          <span style={{ marginLeft: "10px" }}>4.5</span>
                        </div>
                        <HeartIcon />
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
    img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  #profile {
    margin-bottom: 21px;
    .nickname {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 56px;
      h3 {
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 38px;
        margin-right: 20px;
      }
      img {
        cursor: pointer;
        width: 32px;
        height: 32px;
      }
      input {
        height: 100%;
        padding: 0 10px;
        border: 1px solid #c7c7cc;
        border-radius: 10px;
        margin-right: 20px;
      }
      .btn {
        height: 100%;
        width: 40%;
        button {
          border: none;
          height: 100%;
          width: 40%;
          background: #e5e5ea;
          border-radius: 10px;
          margin-right: 10px;
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
      background: #f2f2f7;
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
  /* width: 45%; */
  /* margin-top: 100px; */
  margin-top: 74px;
  /* border: 1px solid red; */
  /* display: flex; */
  /* flex-direction: column; */
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
    cursor: pointer;
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
  /* width: 100%; */
  /* width: auto; */
  /* min-width: 35%; */
  /* min-width: 30%; */
  /* width: auto; */
  /* position: absolute; */
  /* max-width: 100%; */
  /* width : calc(33.3%*${(props) => props.props}); */
  height: 270px;
  margin-top: 10px;
  display: flex;
  /* flex-wrap: wrap;  */
  /* justify-content: space-between; */
  align-items: center;
  border-radius: 10px;
  background-color: #f2f2f7;
  padding: 20px 0px 20px 20px;
  /* border: 1px solid blue; */

  img {
    width: 252px;
    height: 230px;
    /* margin: 0px 10px 0px 15px; */
    /* margin: 0px 10px 0px 5px; */
    margin-right: 20px;
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
  /* justify-content: space-between; */
  height: auto;
  /* padding-left: 20px; */
  margin-left: 10px;
  margin-top: 5px;
  #listBox {
    width: 30.3%;
    display: flex;
    flex-direction: column;
    margin: 25px 10px 0px 10px;
  }
  img {
    width: 100%;
    height: 230px;
  }
  #icons {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
`;

const HeartIcon = styled(FaRegHeart)`
  font-size: 15px;
`;
const StarIcon = styled(FaStar)`
  font-size: 15px;
`;

const UpIcon = styled(FaChevronUp)`
  margin-top: 5px;
`;

const DownIcon = styled(FaChevronDown)``;

const CommentIcon = styled(FaRegComment)``;

const EmptyImgBox = styled.div`
  width: 100%;
  height: 270px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #f2f2f7;
`;

const MyDefaultBoxBottom = styled.div`
  /* width: 45%; */
  margin-top: 20px;
  /* margin-top: 300px; */
  /* border: 1px solid red; */

  /* display: flex; */
  /* flex-direction: column; */
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
    cursor: pointer;
  }
  h1 {
    margin-left: 35px;
    margin-bottom: 10px;
    cursor: pointer;
    /* opacity: 0.4; */
    /* border: 1px solid red; */
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

export default TestPage;
