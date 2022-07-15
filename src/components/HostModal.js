import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import cancelIcon from "../assests/css/cancelIcon.png";
import mendorongLogo2 from "../assests/css/mendorongLogo2.png";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
  outline: "none",
};

const HostModal = () => {
  const navigate = useNavigate();
  const host = localStorage.getItem("host");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (host) {
      setOpen(true);
    }
    else{
      navigate('/hostwrite')
    }
  };
  const handleClose = () => {
    // navigate("/");
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen}>숙소 등록하기</div>
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
              <button
                className="mywrite"
                onClick={() => {
                  navigate("/mypage");
                  setOpen(false);
                }}
              >
                호스트 되기
              </button>
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
    font-size: 20px;
    margin: 10px 0 5px 0;
  }
`;
const Img = styled.img`
  width: 300px;
  height: 250px;
  margin: 0 auto;
  position: relative;
  bottom: 10px;
`;
const Btn = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    height: 60px;
    border: none;
    border-radius: 10px;
    margin-top: 10px;
    font-size: large;
    font-weight: bold;
    cursor: pointer;
  }
  .mywrite {
    background-color: black;
    color: white;
  }
  .home {
    background-color: white;
    color: black;
    border: 1px solid #d1d1d6;
  }
`;
export default HostModal;
