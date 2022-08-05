import React from "react";
import cancelIcon from "../assests/css/images/cancelIcon.webp";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Profile from "./Profile";
import { FaStar } from "react-icons/fa";
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
  const {open, close, data} = props;
  let totalStar = []
  for(let i =0; i < data?.starpoint; i ++){
    totalStar.push(i)
  }

  const nonStart = 5 - data?.starpoint;

  let totalNonStar = []

  for(let i =0; i < nonStart; i ++){
    totalNonStar.push(i)
  }
 
  return (
    <>
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
            <MainProfile id="transition-modal-title" variant="h6" component="h2">
              <div id="profle">
              <Profile data={data}/>
              </div>
              <div id="score">
                {totalStar.map((i, idx)=>(
                  <StarIcon key={idx}></StarIcon>
                ))}
                {totalNonStar?.map((i,idx)=>(
                  <NonStarIcon key={idx}/>
                ) )}
              </div>
            </MainProfile>
            <Main>
              <div id="reviewDetail">
               {data?.review}
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
  #reviewDetail{
    background-color: #F7F3EF;
    width: 100%;
    height: 300px;
    border-radius: 20px; 
    margin-top: 35px;
    padding: 35px;
    font-size: 20px;
  }

`

const MainProfile = styled(Typography)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  #profle{
    width: 60.3%;
  }
  #score{
    display: flex;
    margin-top: 20px;
    margin-right: 20px;
    align-items: center;
    
    span{
      opacity: 0.5;
      margin-top: 5px;
    }
  }
`

const StarIcon = styled(FaStar)`
  width: 25px;
  height: 25px;
  opacity: 0.7;
  color: #2A7047;
  margin-right: 10px;
`

const NonStarIcon = styled(FaStar)`
  width: 25px;
  height: 25px;
  opacity: 0.7;
  margin-right: 10px;
  color: #EEE9E4;
`
 
export default ReviewDetailModal;
