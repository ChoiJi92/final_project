import React, { useState } from "react";
import styled from "styled-components";
import errorPage from "../assests/css/images/errorPage.webp";
import LoginModal from "../components/LoginModal";
import MetaTag from "./MetaTag";
const LoginError = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MetaTag title={"로그인 후 사용해주세요"} />
      <Container>
        <img src={errorPage} alt="에러" />
        <p>로그인 후 사용해주세요.</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          로그인
          <LoginModal open={open} setOpen={setOpen} />
        </button>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    margin: 20px 0 80px 0;
  }
  button {
    width: 302px;
    height: 65px;
    border: 1px solid #aeaeb2;
    border-radius: 10px;
    background-color: transparent;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 150%;
    cursor: pointer;
  }
`;
export default LoginError;
