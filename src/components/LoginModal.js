import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import cancelIcon from "../assests/css/cancelIcon.png";
import pracImage from "../assests/css/back.jpeg";
import mendorongLogo from "../assests/css/mendorongLogo.png";
import Kakao from "./Kakao";
import Naver from "./Naver";
import Google from "./Google";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
  outline: "none",
};

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div style={{width:'25%',textAlign:'center'}}>
      <div onClick={handleOpen}>로그인</div>
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
            <Container id="transition-modal-title" variant="h6" component="h2">
              <div>Log in</div>
              <img
                className="cancel"
                src={cancelIcon}
                alt="닫기"
                onClick={handleClose}
              ></img>
            </Container>
            <Middle id="transition-modal-description" sx={{ mt: 2 }}>
              <Img src={mendorongLogo} alt="Logo"></Img>
              {/* <div>멘도롱제주에 어서오세요.</div> */}
            </Middle>
            <Btn>
              {/* 카카오로그인 버튼 */}
              <Kakao></Kakao>
              {/* 네이버로그인 버튼 */}
              <Naver></Naver>
              {/* 구글로그인 버튼 */}
              <Google></Google>
            </Btn>
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
    font-size: 25px;
    font-weight: 500;
  }
  img {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
`;
const Middle = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    font-size: 20px;
    margin: 10px 0;
  }
`;
const Img = styled.img`
  width: 300px;
  height: 250px;
  margin: 10px auto;
`;
const Btn = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default LoginModal;
