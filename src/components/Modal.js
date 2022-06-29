import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import "../assests/css/modal.css";

import instance from "../shared/axios";
import { useDispatch } from "react-redux";
import Kakao from "./Kakao";
import pracImage from "../assests/css/back.jpeg";
import Naver from "./Naver";
import Google from "./Google";
//Login Modal
const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  return (
    // 모달창이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <button
              style={{ fontSize: "40px" }}
              className="close"
              onClick={() => {
                close();
              }}
            >
              &times;
            </button>
          </header>
          <main>
            <LoginWrap>
              <Header>
                <Title>로그인</Title>
                <Img src={pracImage} alt=""></Img>
                <div>멘도롱제주에 어서오세요.</div>
              </Header>
              {/* 카카오로그인 버튼 */}
              <Kakao></Kakao>
              {/* 네이버로그인 버튼 */}
              <Naver></Naver>
              {/* 구글로그인 버튼 */}
              <Google></Google>
            </LoginWrap>
          </main>
        </section>
      ) : null}
    </div>
  );
};

const LoginWrap = styled.div`
  background-color: whitesmoke;
  height: 90%;
  width: 90%;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  div {
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
    font-size: 20px;
  }
`;
const Title = styled.h1`
  font-size: 25px;
  font-weight: 400;
`;
const Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 30px 0;
`;

export default Modal;
