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
        <div className="searchInput">
          <input placeholder="지역,원하는테마" ref={searchRef}></input>
          <img
            className="cancel"
            src={cancelIcon}
            alt="취소"
            onClick={() => {
              setSearch(false);
            }}
          ></img>
        </div>
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
            <User search={search}>
              <UserMenu nickName={nickName} userImage={userImage}></UserMenu>
            </User>
          )}
        </div>
      </Center>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid;
  font-size: large;

  .title {
    text-align: center;
    width: 7%;
    margin-left: 150px;
    /* margin-bottom: 10px; */
    cursor: pointer;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60%;
  white-space: nowrap;
  .search {
    margin-right: 20px;
    position: relative;
    right: ${(props) => (props.search ? "50px" : "0px")};
    cursor: pointer;
    transition: 1s;
  }

  .searchInput {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background-color: #f2f2f7;
    /* border: 1px solid; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    display: ${(props) => !props.search && "none"};
    input {
      width: 80%;
      height: 40px;
      background-color: #f2f2f7;
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
      display: ${(props) => (props.search ? "none" : "block")};
    }
    width: 60%;
    height: 50px;
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
    margin-right: 10px;
    font-size: large;
    display: ${(props) => props.search && "none"};
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: ${(props) => props.search && "none"};
  }
`;

export default Header;
