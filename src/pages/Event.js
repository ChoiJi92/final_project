import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie"; // 리액트 쿠-키 임포트 해오고
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import cancelIcon from "../assests/css/cancelIcon.png";
import event from '../assests/css/event.png'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  backgroundColor:'#FDFCFB',
  borderRadius: "20px",
  boxShadow: 24,
  p: 2,
  outline: "none",
};
const Event = () => {
  const COOKIE_KEY = "mendoronjeju"; // 쿠키이름세팅
  const [cookies, setCookie] = useCookies([COOKIE_KEY]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hideModal = () => {
    const decade = moment(); // 일단 moment 로 시간변수를 만들어주고
    decade.add(24, "h"); // 하루뒤로 값을 add 해준다.
    setCookie(COOKIE_KEY, "true", {
      // 쿠키를 셋해준다.
      path: "/", // path를 지정해주고
      expires: decade.toDate(), // 여기서 날짜를 지정해준다
    });
    handleClose();
  };
  useEffect(() => {
    function modal() {
      if (cookies[COOKIE_KEY]) {
        return null;
      } else {
        handleOpen();
      }
    }
    modal();
  }, []);
  return (
    <div>
      {/* <div style={{ fontSize: "23px" }} className="login" onClick={handleOpen}>
        로그인
      </div> */}
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
              <div>멘도롱 제주</div>
              <img
                className="cancel"
                src={cancelIcon}
                alt="닫기"
                onClick={handleClose}
              ></img>
            </Container>
            <Middle id="transition-modal-description" sx={{ mt: 2 }}>
              <Img src={event} alt="Logo"></Img>
            </Middle>
            <Btn>
              <button onClick={hideModal}>하루동안 보지 않기 </button>
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
    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
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
`;
const Img = styled.img`
    margin-bottom: 20px;
    width: 500px;
    height: 500px;
`
const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    color: #48484a;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
export default Event;
