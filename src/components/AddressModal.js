import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import "../assests/css/modal.css";
import DaumPostCode from 'react-daum-postcode';

//Login Modal
const AddressModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        close()
        console.log(fullAddress)
    }
    //fullAddress -> 전체 주소반환
}
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
            <DaumPostCode style={{height:'90%'}} onComplete={handleComplete} className="post-code" />
            </LoginWrap>
          </main>
        </section>
      ) : null}
    </div>
  );
};

const LoginWrap = styled.div`
  background-color: whitesmoke;
  height: 100%;
  width: 90%;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export default AddressModal;
