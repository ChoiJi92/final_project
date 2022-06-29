import React from "react";
import styled from "styled-components";
import Modal from "./Modal"; //modal

const Header = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const openLoginModal = () => {
    setModalOpen(true);
  };
  const closeLoginModal = () => {
    setModalOpen(false);
  };
  const nickName = localStorage.getItem("nickName");
  const userImage = localStorage.getItem("userImage");
  return (
    <Container>
      <div className="title">멘도롱 제주</div>
      <Center>
        <div>숙소 찾기</div>
        <div>유저 커뮤니티</div>
        <div>오픈 채팅방</div>
      </Center>
      {!nickName ? (
        <Btn onClick={openLoginModal}>로그인</Btn>
      ) : (
        <User>
          <img src={userImage} alt=""></img>
          <div>{nickName} 님</div>
          <button onClick={()=>{
            localStorage.clear()
            window.location.replace('/')
          }}>로그아웃</button>
        </User>
      )}

      <Modal open={modalOpen} close={closeLoginModal}></Modal>
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
    width: 25%;
  }
`;
const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 25%;
  white-space: nowrap;
  div {
    cursor: pointer;
  }
  /* margin: 0 auto; */
`;
const Btn = styled.button`
  width: 25%;
  border: none;
  background-color: transparent;
  font-size: large;
  cursor: pointer;
`;
const User = styled.div`
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  div {
    margin-right: 10px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  button {
    border: none;
    background-color: transparent;
    font-size: large;
    cursor: pointer;
  }
`;

export default Header;
