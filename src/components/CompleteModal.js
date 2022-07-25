import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import cancelIcon from "../assests/css/cancelIcon.png";
import mendorong3 from "../assests/css/mendorong3.webp";
import { useNavigate, useParams } from "react-router-dom";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  p: 2,
  outline: "none",
  background: 'linear-gradient(0deg, rgba(246, 243, 239, 0.5), rgba(246, 243, 239, 0.5)), #FFFFFF',
};

const CompleteModal = ({ open, setOpen, isHost }) => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const params = useParams();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
    setOpen(false);
  };
  return (
    <div>
      <button style={{background:'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #EEE9E4',color:'white'}}>{params.id ? "수정" : "완료"}</button>
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
              <Img src={mendorong3} alt="Logo"></Img>
              {isHost ? (
                <>
                  <h2>숙소를 등록했습니다!</h2>
                  <p>숙소 찾기 페이지에서 내 숙소를 확인해보세요.</p>
                </>
              ) : (
                <>
                  <h2>
                    {params.id
                      ? "게시글을 수정했습니다!"
                      : "게시글을 업로드했습니다!"}
                  </h2>
                  <p>커뮤니티에서 내가 쓴 글을 확인해보세요.</p>
                </>
              )}
            </Middle>
            <Btn>
              {isHost ? (
                <button
                  className="mywrite"
                  onClick={() => {
                    navigate("/house");
                  }}
                >
                  내 숙소 보러가기
                </button>
              ) : (
                <button
                  className="mywrite"
                  onClick={() => {
                    navigate("/community");
                  }}
                >
                  내가 쓴 글 보러가기
                </button>
              )}
              <button
                className="home"
                onClick={() => {
                  navigate("/");
                }}
              >
                홈 화면 가기
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
  img {
    /* position: absolute; */
    /* right: 10px; */
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
    margin: 18px 0 6px 0;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
  }
`;
const Img = styled.img`
  width: 350px;
  height: 280px;
  margin: 23px auto 0 auto;
  position: relative;
`;
const Btn = styled.div`
  width: 100%;
  margin: 40px auto 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    height: 79px;
    border: none;
    border-radius: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    cursor: pointer;
  }
  .mywrite {
    background:linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #EEE9E4;
    color: white;
    margin-bottom: 12px;
  }
  .home {
    background-color: white;
    color: black;
    border: 1px solid #d1d1d6;
  }
`;
export default CompleteModal;
