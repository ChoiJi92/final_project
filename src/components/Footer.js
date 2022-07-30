import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <Wrap>
      <div className="wrap">
        <div className="title">멘도롱제주</div>
        <div className="service">
          <p
            onClick={() => {
              navigate("/userpolicy");
            }}
          >
            개인정보 처리 방침
          </p>
          <p>문의하기</p>
          <a href="https://www.instagram.com/_mendorong_jeju/" target='_black'>인스타그램</a>
        </div>
      </div>
    </Wrap>
  );
};

const Wrap = styled.footer`
  width: 100%;
  height: 200px;
  position: relative;
  bottom: 0;
  /* justify-content: space-between; */
  /* align-items: center; */
  background: #f7f3ef;
  .wrap {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 70%;
  }
  .title {
    width: 25%;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 110%;
    margin-top: 62.27px;
    opacity: 0.2;
    /* text-align: center; */
  }
  .service {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 110%;
    p {
      opacity: 0.2;
      margin-right: 60px;
      cursor: pointer;
      :hover {
        opacity: 1;
      }
    }
    a {
      text-decoration: none;
      color: black;
      opacity: 0.2;
      margin-right: 60px;
      cursor: pointer;
      :hover {
        opacity: 1;
      }
    }
  }
`;
export default Footer;
