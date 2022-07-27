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
import Footer from "../components/Footer";

const UserPage = () => {
  const [myLike, setMyLike] = useState(true);

  const [upMore, setUpMore] = useState(false);

  // 데이터
  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickName");
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const userImage = localStorage.getItem("userImage");
  const params = useParams();

  const { data } = useQuery(
    ["loadMyPage"],
    () =>
      instance
        .get(`oauth/other/${params.id}`)
        .then((res) => {
          console.log(res.data);
          return (
            //   setMyLikePost(res.data.mylikespost), setMyPost(res.data.mypostinfo)
            res.data.otherinfo
          );
        })
        .catch((err) => {
          console.log(err);
        }),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <MainBox>
        <ProfileBox>
          <div className="profileWrap">
            <div id="profile">
              <img src={userImage} alt="프로필 이미지"></img>
              <div className="nickname">
                <h3>{nickName}</h3>
                <span>작성글 · {data.length}개</span>
              </div>
            </div>
          </div>
        </ProfileBox>
        <MyDefaultBoxTop>
          <div id="mylike">
            <h1>작성한 글</h1>
            <span>
              {data.length === 0 ? (
                ""
              ) : (
                <>
                  {!upMore ? (
                    <img
                      src={moreIcon}
                      alt="더보기"
                      onClick={() => {
                        setUpMore(true);
                      }}
                    />
                  ) : (
                    <img
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
          </div>
          {!upMore ? (
            <>
              {data.length === 0 ? (
                <EmptyImgBox>
                  <img src={mypageImg} alt="없어요 이미지" />
                  <span>아직 좋아요 한 글이 없어요.</span>
                </EmptyImgBox>
              ) : (
                <DefaultImgBox>
                  {data?.slice(0, 3).map((v, i) => (
                    <img src={v.images[0].thumbnailURL} key={i} alt="이미지" />
                  ))}
                </DefaultImgBox>
              )}
            </>
          ) : (
            <>
              <HiddenMyLikeBox>
                {data.map((v, i) => {
                  return (
                    <div key={i} id="listBox">
                      <img
                        className="thumbnailImg"
                        src={v.images[0].thumbnailURL}
                        alt="이미지"
                      />
                      <span className="title" style={{ marginTop: "5px" }}>
                        {v.title}
                      </span>
                      <div id="icons">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src={commentIcon} alt="댓글" />
                          <span style={{ marginLeft: "10px" }}>
                            {v.commentNum}
                          </span>
                        </div>
                        <img src={likeIcon} alt="좋아요" />
                      </div>
                    </div>
                  );
                })}
              </HiddenMyLikeBox>
            </>
          )}
        </MyDefaultBoxTop>
      </MainBox>
      <Footer />
    </>
  );
};

const MainBox = styled.div`
  /* width: 100%; */
  width: 836px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  margin: 0 auto;
`;

const ProfileBox = styled.div`
  margin-top: 92px;
  .profileWrap {
    display: flex;
  }
  #profile {
    margin-bottom: 21px;
    width: 100%;
    margin-left: 20px;
    display: flex;
    img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .nickname {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 6px;
      height: ${(props) => props.isEdit && "56px"};
      h3 {
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 38px;
        margin-bottom: 6px;
      }
    }
    span {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: #828282;
    }
  }
`;

const MyDefaultBoxTop = styled.div`
  margin-top: 74px;
  margin-bottom: 20px;
  #mylike {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span {
    cursor: pointer;
  }
  h1 {
    color: #636366;
    margin-left: 35px;
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 46px;
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
  margin-left: 10px;
  margin: 5px 0;
  #listBox {
    width: 30.3%;
    /* width: 252px; */
    display: flex;
    flex-direction: column;
    margin: 0 12px;
    margin-bottom: 40px;

    /* margin: 25px 10px 0px 10px; */

    .title {
      font-style: normal;
      font-weight: 700;
      font-size: 27px;
      line-height: 39px;
      color: #636366;
      // 넘치는 제목 자르기
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
  margin: 20px 0;
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
  #bottomUnderbar {
    border: 1px solid green;
    width: auto;
  }
`;

export default UserPage;
