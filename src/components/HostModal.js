import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import cancelIcon from "../assests/css/cancelIcon.png";
import mendorongLogo2 from "../assests/css/mendorong2.webp";
import { useNavigate } from "react-router-dom";
import HostRegistModal from "./HostRegistModal";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  background:
    "linear-gradient(0deg, rgba(246, 243, 239, 0.5), rgba(246, 243, 239, 0.5)), #FFFFFF",
  p: 2,
  outline: "none",
};

const HostModal = ({ close }) => {
  const navigate = useNavigate();
  const host = sessionStorage.getItem("host");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (host === "false") {
      setOpen(true);
    } else {
      navigate("/hostwrite");
      close();
    }
  };
  const handleClose = () => {
    // navigate("/");
    setOpen(false);
  };

  return (
    <div>
      <div
        style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "20px",
          lineHeight: "120%",
        }}
        onClick={handleOpen}
      >
        숙소 등록하기
      </div>
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
              <img
                className="cancel"
                src={cancelIcon}
                alt="닫기"
                onClick={handleClose}
              ></img>
            </Container>
            <Middle
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component="div"
            >
              <Img src={mendorongLogo2} alt="Logo"></Img>
              <h2>숙소는 호스트만 등록할 수 있어요!</h2>
              <p>멘도롱제주의 호스트가 되어주시겠어요?</p>
            </Middle>
            <Btn>
              <HostRegistModal open={true} onClick={()=>{
                handleClose()
              }}></HostRegistModal>
              <button
                className="home"
                onClick={() => {
                  setOpen(false);
                }}
              >
                아니요, 그냥 구경만 할래요.
              </button>
            </Btn>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
const Container = styled(Typography)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h1 {
    font-size: 30px;
    font-weight: 500;
  }
  img {
    /* position: absolute; */
    right: 10px;
    cursor: pointer;
  }
`;
const Middle = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 150%;
    margin-bottom: 6px;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 150%;
  }
`;
const Img = styled.img`
  width: 310px;
  height: 200px;
  margin: 80px auto 43px auto;
  position: relative;
`;
const Btn = styled.div`
  width: 100%;
  /* width: 540px; */
  margin: 40px auto 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    width: 540px;
    height: 79px;
    border: none;
    border-radius: 20px;
    margin-top: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    cursor: pointer;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      #eee9e4;
    color: white;
  }
  .home {
    background: #ffffff;
    color: black;
    border: 1px solid #d1d1d6;
    border-radius: 20px;
  }
`;
export default HostModal;
