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
import event1 from "../assests/css/eventImage1.webp";

const style = {
  position: "absolute",
  top: "50%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 572,
  bgcolor: "background.paper",
  backgroundColor: "#FDFCFB",
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
              <div>멘도롱 제주 오픈 이벤트</div>
              <img
                className="cancel"
                src={cancelIcon}
                alt="닫기"
                onClick={handleClose}
              ></img>
            </Container>
            <Middle id="transition-modal-description" sx={{ mt: 2 }}>
                <Img src={event1} alt="이벤트"></Img>
              {/* <Img src={event2} alt="이벤트"></Img> */}
            </Middle>
            <EventBtn>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdm8GprASrYq2aP3mCDhGKKt89Q09R7KwKmDtEz9Higuv7jaw/viewform" target='_blank' onClick={()=>{handleClose()}}>이벤트 참여하러 가기</a>
            </EventBtn>
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
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 150%;
    color: #48484a;
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const Img = styled.img`
  margin: 20px 0;
  width: 540px;
  height: 540px;
`;
const EventBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #eee9e4;
    width: 320px;
    height: 62px;
    background-color: transparent;
    /* background: #FFFFFF; */
    border-radius: 100px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    color: #48484a;
    text-decoration: none;
  }
`;
const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #48484a;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
export default Event;
