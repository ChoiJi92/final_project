import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import searchIcon from "../assests/css/search.png";
import cancelIcon from "../assests/css/cancelIcon.png";
import jejuLogo from "../assests/css/jejuLogo.png";
import LoginModal from "./LoginModal";

const Header = () => {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState();
  const searchRef = useRef();
  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickName");
  const userImage = localStorage.getItem("userImage");
  return (
    <Container>
      <Wrap>
        <img
          className="title"
          onClick={() => {
            navigate("/");
            setMenu("");
          }}
          src={jejuLogo}
          alt="로고"
        ></img>
        <Center search={search}>
          <img
            className="search"
            src={searchIcon}
            alt="검색"
            onClick={() => {
              setSearch(true);
            }}
          ></img>
          {search ? (
            <div className="searchInput">
              <input placeholder="지역, 원하는테마" ref={searchRef}></input>
              <img
                className="cancel"
                src={cancelIcon}
                alt="취소"
                onClick={() => {
                  setSearch(false);
                }}
              ></img>
            </div>
          ) : (
            <div className="menu">
              <div
                style={{ color: menu === "house" ? "gray" : "black" }}
                onClick={() => {
                  setMenu("house");
                  navigate("/house");
                }}
              >
                숙소 찾기
              </div>
              <div
                style={{ color: menu === "community" ? "gray" : "black" }}
                onClick={() => {
                  setMenu("community");
                  navigate("/community");
                }}
              >
                유저 커뮤니티
              </div>
              <div
                style={{ color: menu === "chat" ? "gray" : "black" }}
                onClick={() => {
                  navigate("/chat");
                  setMenu("chat");
                }}
              >
                오픈 채팅방
              </div>

              {!nickName ? (
                <LoginModal />
              ) : (
                <User>
                  <UserMenu
                    nickName={nickName}
                    userImage={userImage}
                  ></UserMenu>
                </User>
              )}
            </div>
          )}
        </Center>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 2px solid;
`;
const Wrap = styled.div`
  width: 70%;
  height: 120px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .title {
    cursor: pointer;
  }
`;
const Center = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  white-space: nowrap;
  .search {
    position: relative;
    margin-left: ${(props) => (props.search ? "70px" : "450px")};
    cursor: pointer;
    /* transition: 1s; */
  }

  .searchInput {
    width: 85%;
    height: 60px;
    border-radius: 10px;
    background-color: #f2f2f7;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    input {
      width: 80%;
      height: 60px;
      background-color: #f2f2f7;
      font-size: 24px;
      font-weight: 300;
      line-height: 28.8px;
      border: none;
      padding-left: 20px;
      border-radius: 10px;
      outline: none;
    }
    img {
      padding-right: 20px;
      height: 30px;
      cursor: pointer;
    }
  }
  .menu {
    width: 57%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    div {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      text-align: center;
    }
  }
`;
const User = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Header;
