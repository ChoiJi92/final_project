import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import searchIcon from "../assests/css/images/search.webp";
import cancelIcon from "../assests/css/images/cancelIcon.webp";
import jejuLogo from "../assests/css/images/jejuLogo.webp";
import LoginModal from "./LoginModal";

const Header = () => {
  let params = new URL(window.location.href).pathname.slice(1);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState();
  const [open, setOpen] = useState(false);

  

  const searchRef = useRef();
  const navigate = useNavigate();
  const nickName = sessionStorage.getItem("nickName");
  const userImage = sessionStorage.getItem("userImage");

  const [isScroll, setIsScroll] = useState(false);
  const throttle = (callback, delay) => {
    let timer = null;
    return () => {
        if(timer)return;
        timer = setTimeout(()=>{
            callback();
            timer = null;
        }, delay) 
    }
  }
  const updateScroll = () => {
    const { scrollY } = window;
    const isScrolled = scrollY !== 0;
    setIsScroll(isScrolled);
  };
const handleScroll = throttle(updateScroll, 100);

  useEffect(() => {
    setMenu(params);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [params]);
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate("/house", { state: { search: searchRef.current.value } });
      setSearch(false);
    }
  };
  return (
    <Container scroll={isScroll}>
      <Wrap
        scroll={isScroll}
      >
        <img
          className="title"
          onClick={() => {
            navigate("/");
            setMenu("");
          }}
          src={jejuLogo}
          alt="로고"
        ></img>
        <Center scroll={isScroll} search={search} menu={menu}>
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
              <input
                placeholder="지역, 원하는 숙소"
                ref={searchRef}
                onKeyPress={onKeyPress}
              ></input>
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
                className="house"
                onClick={() => {
                  navigate("/house");
                }}
              >
                숙소 찾기
              </div>
              <div
                className="community"
                onClick={() => {
                  navigate("/community");
                }}
              >
                유저 커뮤니티
              </div>
              <div
                className="chat"
                onClick={() => {
                  navigate("/chat");
                }}
              >
                오픈 채팅방
              </div>

              {!nickName ? (
                <>
                <div style={{fontSize:'23px'}} className="login" onClick={()=>{
                    setOpen(true)
                }}>로그인</div>
                <LoginModal open={open} setOpen={setOpen}/>
                </>
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
  height: ${(props)=>props.scroll ? "60px" : "120px"};
  position: ${(props)=>props.scroll ? "fixed" : "none"};
  z-index:${(props)=>props.scroll ? 3 : "0"};
  border-bottom: 2px solid #e5e5ea;
  background: #fff;
  top:0;
  /* border: 1px solid blue; */
`;
const Wrap = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid red; */
  height: ${(props)=>props.scroll ? "60px" : "120px"};
  .title {
    cursor: pointer;
    width: ${(props)=>props.scroll ? "70px" : "121px"};
    height: ${(props)=>props.scroll ? "40px" : "66px"};
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
    height: ${(props)=>props.scroll ? "45px" : "60px"};
    border-radius: 10px;
    background-color: #f7f3ef;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    input {
      width: 80%;
      height: ${(props)=>props.scroll ? "45px" : "60px"};
      background-color: #f7f3ef;
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
    div {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 120%;
      text-align: center;
      color: #828282;
      cursor: pointer;
      :hover {
        color: #636366;
        font-weight: 1000;
      }
    }
    .${(props) => props.menu} {
      color: #636366;
      font-weight: 1000;
    }
  }
`;
const User = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Header;
