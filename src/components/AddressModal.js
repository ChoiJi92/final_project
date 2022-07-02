import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import "../assests/css/modal.css";
import DaumPostCode from 'react-daum-postcode';
import cancelIcon from '../assests/css/cancelIcon.png'
import {addressState} from '../recoil/atoms'
import {useRecoilState} from 'recoil'
//Login Modal
const AddressModal = (props) => {
  const [adderess, setAddress] = useRecoilState(addressState)
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
        setAddress(fullAddress)
        
    }
    //fullAddress -> 전체 주소반환
}
  return (
    // 모달창이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
         
            {/* <button
              style={{ fontSize: "40px" }}
              className="close"
              onClick={() => {
                close();
              }}
            >
              &times;
            </button> */}
          </header>
          <main>
            <Wrap>
            <Img>
            <img src={cancelIcon} alt='닫기' onClick={()=>{
              close()
            }}></img>
            </Img>
            <DaumPostCode style={{height:'90%'}} onComplete={handleComplete} className="post-code" />
            </Wrap>
          </main>
        </section>
      ) : null}
    </div>
  );
};


const Img = styled.div`
  width: 100%;
  text-align: right;
  img{
    cursor: pointer;
  }
 
`

const Wrap = styled.div`
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
