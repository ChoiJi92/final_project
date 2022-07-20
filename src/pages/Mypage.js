import React, { useEffect, useState } from "react";
import jeju1 from "../assests/css/jeju1.jpeg";
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

const Mypage = () => {
  const [myLike, setMyLike] = useState(true);
  const [myWrite, setMyWrite] = useState(true);
  const navigate = useNavigate()
  const nickName = localStorage.getItem("nickName");
  const userImage = localStorage.getItem("userImage");
  const email = localStorage.getItem("email");
  const host = localStorage.getItem("host");
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const likeClick = () => {
    setMyLike((prev) => !prev);
  };
  const writeClick = () => {
    setMyWrite((prev) => !prev);
  };

  return (
    <MainBox>
      <ProfileBox>
        <div className="profileWrap">
          <img src={userImage} alt="프로필" />
          <div id="profile">
            <h3>{nickName}</h3>
            <span>{email}</span>
          </div>
        </div>
        <div id="btn">
          <button>개인 정보 수정</button>
          {/* {host && <button>호스트 되기</button> } */}
          {host ? <button onClick={()=>{
            navigate('/hostwrite')
          }}>숙소 등록</button> : <HostRegistModal></HostRegistModal>}
        </div>
      </ProfileBox>

      <MyDefaultBox>
        <div id="mylike">
          <h1>내 좋아요</h1>
          <span>
            {myLike ? (
              <DownIcon onClick={likeClick} />
            ) : (
              <UpIcon onClick={likeClick} />
            )}
          </span>
        </div>
        {myLike ? (
          <DefaultImgBox>
            <img src={jeju1} />
            <img src={jeju1} />
            <img src={jeju1} />
          </DefaultImgBox>
        ) : (
          ""
        )}
        {myLike ? (
          ""
        ) : (
          <HiddenMyLikeBox>
            {list.map((item, idx) => {
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
      </MyDefaultBox>

      <MyDefaultBox>
        <div id="myWrite">
          <h1>내가 쓴 글</h1>
          <span>
            {myWrite ? (
              <DownIcon onClick={writeClick} />
            ) : (
              <UpIcon onClick={writeClick} />
            )}
          </span>
        </div>
        {myWrite ? (
          <DefaultImgBox>
            <img src={jeju1} />
            <img src={jeju1} />
            <img src={jeju1} />
          </DefaultImgBox>
        ) : (
          ""
        )}
        {myWrite ? (
          ""
        ) : (
          <HiddenMyLikeBox>
            {list.map((item, idx) => {
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
      </MyDefaultBox>
    </MainBox>
  );
};

const MainBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 41.563%;
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
    h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      line-height: 38px;
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
    }
  }
`;

const MyDefaultBox = styled.div`
  width: 45%;
  margin-top: 100px;
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
  }
`;

const DefaultImgBox = styled.div`
  width: 100%;
  height: 270px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: #f2f2f7;
  img {
    width: 30%;
    height: 230px;
    margin: 0px 10px 0px 10px;
  }
`;
const HiddenMyLikeBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: auto;
  #listBox {
    width: 30%;
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

export default Mypage;
