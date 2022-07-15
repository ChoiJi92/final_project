import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "./Modal"; //modal
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
        {search ? 
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
        </div> :
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
            <User >
              <UserMenu nickName={nickName} userImage={userImage}></UserMenu>
            </User>
          )}
        </div>
}
      </Center>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid;
  font-size: large;

  .title {
    margin-left: 306px;
    cursor: pointer;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  width: 75%;
  white-space: nowrap;
  .search {
    position: relative;
    margin-left: ${(props) => (props.search ? "70px" : "450px")};
    cursor: pointer;
    /* transition: 1s; */
  }

  .searchInput {
    width: 67%;
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
    div {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      width: 22%;
      text-align: center;
    }
    width: 45%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`;
const User = styled.div`
  width: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: right;
  div {
    margin-right: 28px;
    font-size: 24px;
    font-weight: 500;
    line-height: 34.75px;
    color: black;
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;

  }
`;

export default Header;
