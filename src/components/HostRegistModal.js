import React, { useEffect, useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import cancelIcon from "../assests/css/cancelIcon.png";
import notHost from "../assests/css/notHost.webp";
import host from "../assests/css/host.webp";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import instance from "../shared/axios";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 880,
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  background: 'linear-gradient(0deg, rgba(246, 243, 239, 0.5), rgba(246, 243, 239, 0.5)), #FFFFFF',
  p: 2,
  outline: "none",
};

const HostRegistModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputRef = useRef();
  const [ishost, setIshost] = useState(false);
  const navigate = useNavigate()
  const hostRegister = useMutation((CNU)=>{
    console.log(CNU)
    instance.put('/oauth/mypage/checkCNU',{CNU}).then((res)=>{
        console.log(res.data)
        setIshost(res.data.result)
        localStorage.setItem('host',res.data.result)
  }).catch((err)=>{console.log(err)})   
  })
  return (
    <div>
      <button
        onClick={() => {
          handleOpen();
        }}
      >
        호스트 되기
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container id="transition-modal-title" variant="h6" component="div">
              <div>Become a host</div>
              <img
                className="cancel"
                src={cancelIcon}
                alt="닫기"
                onClick={handleClose}
              ></img>
            </Container>
            {ishost ? (
              <>
                <Middle id="transition-modal-description" sx={{ mt: 2 }} component="div">
                  <Img src={host} alt="notHost"></Img>
                  <div>축하합니다!</div>
                  <p>멘도롱 제주의 호스트가 되었습니다.</p>
                </Middle>
                <Btn>
                  <button onClick={()=>{
                    navigate('/hostwrite')
                    handleClose()
                  }}>숙소 등록하기</button>
                  <button className="home" onClick={()=>{
                    navigate('/')
                    handleClose()
                  }}>홈으로 가기</button>
                </Btn>
              </>
            ) : (
              <>
                <Middle id="transition-modal-description" sx={{ mt: 2 }} component="div">
                  <Img src={notHost} alt="notHost"></Img>
                  <p>사업자 등록번호를 입력해주세요.</p>
                </Middle>
                <Btn>
                  <input
                    type="number"
                    ref={inputRef}
                    placeholder="******"
                  ></input>
                  <button onClick={()=>{
                        hostRegister.mutate(inputRef.current.value)
                        inputRef.current.value=""
                  }}>호스트 되기</button>
                </Btn>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const Container = styled(Typography)`
  /* border: 1px solid; */
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
    margin: 20px;
  }
  img {
    position: absolute;
    right: 30px;
    cursor: pointer;
  }
`;
const Middle = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 150%;
    color: #3a3a3c;
    text-align: center;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    color: #3a3a3c;
    text-align: center;
  }
`;
const Img = styled.img`
  width: 580px;
  height: 200px;
  margin: 60px auto 52px auto;
`;
const Btn = styled.div`
  width: 77.832%;
  margin: 40px auto 75px auto;
  display: flex;
  flex-direction: column;
  .home{
    height: 79px;
    border: none;
    border-radius: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    margin-top: 20px;
    background: #EEE9E4;
    color: black;
    cursor: pointer;
  }
  button {
    height: 79px;
    border: none;
    border-radius: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #EEE9E4;
    color: white;
    cursor: pointer;
  }
  input {
    margin-bottom: 20px;
    height: 79px;
    border: none;
    border-radius: 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    background: #F7F3EF;
    padding: 0 20px;
    ::placeholder {
      color: #c7c7cc;
      text-align: center;
    }
  }
`;
export default HostRegistModal;
