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

const TestPage2 = () => {
  const [myLike, setMyLike] = useState(true);
  const [myWrite, setMyWrite] = useState(true);
  const [mySave, setMySave] = useState(true);
  const [myHouse, setMyHouse] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const nicknameRef = useRef();
  // true
  const myLikeList = [1, 2];

  // false
  const mySaveList = [];

  const myWriteList = [1, 2];
  const myHoseList = [];

  //topbox는 첫 렌더링 될 때 myLikeList를 보여줌
  const [topBox, setTopBox] = useState(true);

  //bottomBox는 첫 렌더링 될 때 myWriteList를 보여줌
  const [bottomBox, setBottomBox] = useState(true);

  console.log(topBox, "위에 박스");
  console.log(bottomBox, "아래 박스");

  const bottomWrite = useRef(null);
  const bottomHouse = useRef(null);
  const topLike = useRef(null);
  const topSave = useRef(null);

  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickName");
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const host = localStorage.getItem("host");

  const {data} = useQuery(['loadMyPage'], ()=> instance.get(`oauth/mypage/${userId}`).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  }) )


  useEffect(() => {
    autoBottomClick();
    autoTopClick();
  }, []);

  const likeClick = () => {
    setMyLike((prev) => !prev);
  };
  const saveClick = () => {
    setMySave((prev) => !prev);
  };

  const writeClick = () => {
    setMyWrite((prev) => !prev);
  };

  const houseClick = () => {
    setMyHouse((prev) => !prev);
  };

  // console.log(list.length);
  const autoTopClick = (e) => {
    topSave.current.style.opacity = 0.4;
  };

  const myLikeInfoClick = () => {
    topSave.current.style.opacity = 0.4;
    topLike.current.style.opacity = "";
    setTopBox(true);
  };

  const mySaveInfoClick = () => {
    topSave.current.style.opacity = "";
    topLike.current.style.opacity = 0.4;
    setTopBox(false);
  };

  const autoBottomClick = (e) => {
    // bottomRef.current.style.left = bottomWrite.current.offsetLeft + "px";
    // bottomRef.current.style.width = bottomWrite.current.offsetWidth + "px";
    bottomHouse.current.style.opacity = 0.4;
  };

  const myWriteInfoClick = (e) => {
    // bottomRef.current.style.left = e.currentTarget.offsetLeft + "px";
    // bottomRef.current.style.width = e.currentTarget.offsetWidth + "px";
    bottomWrite.current.style.opacity = "";
    bottomHouse.current.style.opacity = 0.4;
    setBottomBox(true);
  };

  const myHouseInfoClick = (e) => {
    // bottomRef.current.style.left = e.currentTarget.offsetLeft + "px";
    // bottomRef.current.style.width = e.currentTarget.offsetWidth + "px";
    bottomWrite.current.style.opacity = 0.4;
    bottomHouse.current.style.opacity = "";
    setBottomBox(false);
  };
  const nickNameUpdate = useMutation((nickname) =>{
    instance.put(`/oauth/mypage/${userId}/nick`,{nickname}).then((res)=>{
      localStorage.setItem('nickName',res.data.nickname)
      setIsEdit(false)
      window.location.reload()
    }).catch((err)=>{
      window.alert(err.response.data.errorMessage)
    })
  }
  );
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
                  <button onClick={() => {
                    console.log(nicknameRef.current.value)
                    nickNameUpdate.mutate(nicknameRef.current.value)
                  }}>저장</button>
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

      <MyDefaultBoxTop>
        <div id="mylike">
          <div id="myInfo">
            <h1 ref={topLike} onClick={myLikeInfoClick}>
              내 좋아요
            </h1>
            <h1 ref={topSave} onClick={mySaveInfoClick}>
              저장함
            </h1>
          </div>
          {topBox ? (
            <span>
              {myLikeList.length === 0 ? (
                ""
              ) : (
                <>
                  {myLike ? (
                    <DownIcon onClick={likeClick} />
                  ) : (
                    <UpIcon onClick={likeClick} />
                  )}
                </>
              )}
            </span>
          ) : (
            <span>
              {mySaveList.length === 0 ? (
                ""
              ) : (
                <>
                  {mySave ? (
                    <DownIcon onClick={saveClick} />
                  ) : (
                    <UpIcon onClick={saveClick} />
                  )}
                </>
              )}
            </span>
          )}
        </div>
        {topBox ? (
          <>
            {myLike ? (
              <>
                {myLikeList.length === 0 ? (
                  <EmptyImgBox>
                    <img src={mypageImg} alt="없어요 이미지" />
                    <span>아직 좋아요 한 글이 없어요.</span>
                  </EmptyImgBox>
                ) : (
                  <DefaultImgBox>
                    {myLikeList.slice(0, 3).map((item, idx) => (
                      <img style={{}} src={jeju1} key={idx} alt="이미지" />
                    ))}
                  </DefaultImgBox>
                )}
              </>
            ) : (
              ""
            )}
            {myLike ? (
              ""
            ) : (
              <HiddenMyLikeBox>
                {myLikeList.map((item, idx) => {
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
        ) : (
          // 마이 세이브 박스 렌더링
          <>
            {mySave ? (
              <>
                {mySaveList.length === 0 ? (
                  <EmptyImgBox>
                    <img src={mypageImg} alt="없어요 이미지" />
                    <span>아직 저장한 숙소가 없어요.</span>
                  </EmptyImgBox>
                ) : (
                  <DefaultImgBox>
                    {mySaveList.slice(0, 3).map((item, idx) => (
                      <img style={{}} src={jeju1} alt="이미지" key={idx} />
                    ))}
                  </DefaultImgBox>
                )}
              </>
            ) : (
              ""
            )}
            {mySave ? (
              ""
            ) : (
              <HiddenMyLikeBox>
                {mySaveList.map((item, idx) => {
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
            <h1 ref={bottomWrite} onClick={myWriteInfoClick}>
              내가 쓴 글
            </h1>
            <h1 ref={bottomHouse} onClick={myHouseInfoClick}>
              내 숙소
            </h1>
            {/* <BottomUnderbar ref={bottomRef} /> */}
          </div>
          {bottomBox ? (
            <span>
              {myWriteList.length === 0 ? (
                ""
              ) : (
                <>
                  {myWrite ? (
                    <DownIcon onClick={writeClick} />
                  ) : (
                    <UpIcon onClick={writeClick} />
                  )}
                </>
              )}
            </span>
          ) : (
            <span>
              {myHoseList.length === 0 ? (
                ""
              ) : (
                <>
                  {myHouse ? (
                    <DownIcon onClick={houseClick} />
                  ) : (
                    <UpIcon onClick={houseClick} />
                  )}
                </>
              )}
            </span>
          )}
        </div>
        {bottomBox ? (
          <>
            {myWrite ? (
              <>
                {myWriteList.length === 0 ? (
                  <EmptyImgBox>
                    <img src={mypageImg} alt="없어요 이미지" />
                    <span>아직 내가 쓴 글이 없어요.</span>
                  </EmptyImgBox>
                ) : (
                  <DefaultImgBox>
                    {myWriteList.slice(0, 3).map((item, idx) => (
                      <img style={{}} src={jeju1} alt="이미지" key={idx} />
                    ))}
                  </DefaultImgBox>
                )}
              </>
            ) : (
              ""
            )}
            {myWrite ? (
              ""
            ) : (
              <HiddenMyLikeBox>
                {myWriteList.map((item, idx) => {
                  return (
                    <div key={idx} id="listBox">
                      <img src={jeju1} />
                      <span style={{ marginTop: "5px" }}>내가 쓴 글 제목</span>
                      <div id="icons">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CommentIcon />
                          <span style={{ marginLeft: "10px" }}>00개</span>
                        </div>
                        <HeartIcon />
                      </div>
                    </div>
                  );
                })}
              </HiddenMyLikeBox>
            )}
          </>
        ) : (
          // 마이 하우스 박스 렌더링
          <>
            {myHouse ? (
              <>
                {myHoseList.length === 0 ? (
                  <EmptyImgBox>
                    <img src={mypageImg} alt="없어요 이미지" />
                    <span>아직 내 숙소가 없어요.</span>
                  </EmptyImgBox>
                ) : (
                  <DefaultImgBox>
                    {myHoseList.slice(0, 3).map((item, idx) => (
                      <img style={{}} src={jeju1} />
                    ))}
                  </DefaultImgBox>
                )}
              </>
            ) : (
              ""
            )}
            {myHouse ? (
              ""
            ) : (
              <HiddenMyLikeBox>
                {myHoseList.map((item, idx) => {
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

export default TestPage2;
