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
import { useNavigate, useParams } from "react-router-dom";
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

const UserPage = () => {
  const params = useParams();
  const [upMore, setUpMore] = useState(false);
  const [bottomMore, setBottomMore] = useState(false);

  // 데이터
  const [myLikePost, setMyLikePost] = useRecoilState(myLikeList);
  const [myPost, setMyPost] = useRecoilState(myPostList);
  const [mySavePost, setMySavePost] = useRecoilState(mySaveList);
  const [myHostPost, setMyHostPost] = useRecoilState(myHostList);
  const userImage = localStorage.getItem("userImage");
  const nickName = localStorage.getItem("nickName");
  const nicknameRef = useRef();
  const navigate = useNavigate();

  const { data } = useQuery(
    ["loadMyPage"],
    () =>
      instance
        .get(`oauth/userpage/${params.id}`)
        .then((res) => {
          console.log(res.data);
          return (
            //   setMyLikePost(res.data.mylikespost), setMyPost(res.data.mypostinfo)
            res.data
          );
        })
        .catch((err) => {
          console.log(err);
        }),
    {
      onSuccess: (data) => {
        setMyLikePost(data.mylikespost);
        setMyPost(data.mypostinfo);
      },
    }
  );
  return (
    <MainBox>
      <ProfileBox>
        <div className="profileWrap">
          <img src={userImage} alt="유저 이미지"></img>
          <div id="profile">
            <h3>{nickName}</h3>
            <span>작성글 · 3개 | 대화방 · 3개</span>
          </div>
        </div>
      </ProfileBox>

      <MyDefaultBoxTop>
        <div id="mylike">
          <h1>작성한 글</h1>
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
        </div>
        {!upMore ? (
          <>
            {myLikePost.length === 0 ? (
              <EmptyImgBox>
                <img src={mypageImg} alt="없어요 이미지" />
                <span>아직 작성한 글이 없어요.</span>
              </EmptyImgBox>
            ) : (
              <DefaultImgBox>
                {myLikePost.slice(0, 3).map((v, i) => (
                  <img src={v.images[0].thumbnailURL} key={i} alt="이미지" />
                ))}
              </DefaultImgBox>
            )}
          </>
        ) : (
          <HiddenMyLikeBox>
            {myLikePost.map((v, i) => {
              return (
                <div key={i} id="listBox">
                  <img src={v.images[0].thumbnailURL} alt="이미지" />
                  <span style={{ marginTop: "5px" }}>{v.title}</span>
                  <div id="icons">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginLeft: "10px" }}>4.5</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </HiddenMyLikeBox>
        )}
      </MyDefaultBoxTop>

      <MyDefaultBoxBottom>
        <div id="myWrite">
          <h1>대화방</h1>
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
        </div>
        {!bottomMore ? (
          <>
            {myPost.length === 0 ? (
              <EmptyImgBox>
                <img src={mypageImg} alt="없어요 이미지" />
                <span>아직 참여한 대화방이 없어요.</span>
              </EmptyImgBox>
            ) : (
              <DefaultImgBox>
                {myPost.slice(0, 3).map((v, i) => (
                  <></>
                ))}
              </DefaultImgBox>
            )}
          </>
        ) : (
          <>
            <HiddenMyLikeBox>
              {myPost.map((v, i) => {
                return <></>;
              })}
            </HiddenMyLikeBox>
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
    }
  }
  #profile {
    margin-bottom: 21px;
    width: 100%;
    margin-left: 20px;

    h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      line-height: 38px;
      margin-right: 8px;
      color: #2c2c2e;
      margin-bottom: 6px;
    }
    span {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: #828282;
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
    cursor: pointer;
  }
  h1 {
    margin-left: 35px;
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 46px;
    color: #636366;
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
  height: auto;
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
const UpIcon = styled(FaChevronUp)`
  margin-top: 5px;
`;

const DownIcon = styled(FaChevronDown)``;

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
  margin-top: 20px;
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
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 46px;
    color: #636366;
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

export default UserPage;
