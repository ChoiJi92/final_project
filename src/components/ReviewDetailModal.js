import React, { useRef, useState } from "react";
import cancelIcon from "../assests/css/cancelIcon.png";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
};

const ReviewDetailModal = (props) => {
 

  const {open, close, review} = props;
  console.log(review);
  return (
    <>
      {/* <Button onClick={handleOpen}>
        Open modal
      </Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Main id="transition-modal-title" variant="h6" component="h2">
              <div id="reviewTitle">
                <h3>후기 상세</h3>
                <img
                  className="cancel"
                  src={cancelIcon}
                  alt="닫기"
                  onClick={close}
                />
                </div>
            </Main>
          </Box>
        </Fade>
      </Modal>
      </>
  );
};

const Main = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  #reviewTitle{
    display: flex;
    justify-content: space-between;
    img {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 20px;
    cursor: pointer;
  }
  h3 {
    font-weight: 500;
    font-size: 25px;
    line-height: 150%;
  }
  }
`
 
export default ReviewDetailModal;
