import React, { useRef, useState } from "react";
import cancelIcon from "../assests/css/cancelIcon.webp";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import styled from "styled-components";
import { current } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "react-query";
import instance from "../shared/axios";
import profileEdit from "../assests/css/editIcon2.webp";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const MyInfoModal = () => {
  const userImage = sessionStorage.getItem("userImage");
  const nickName = sessionStorage.getItem("nickName");
  const userId = sessionStorage.getItem("userId");
  // const { open, close } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentImg = useRef(null);

  const [isImgChnage, setIsImgChange] = useState(true);

  const nickRef = useRef(null);
  const [isImgUrl, setIsImgUrl] = useState("");
  const [profile, setProfile] = useState();
  const [isnickChange, setIsNickChange] = useState(nickName);

  const queryClient = useQueryClient();

  // console.log(userImage, nickName);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  const imgChangeClick = () => {
    currentImg.current.click();
  };

  const onImgChange = (e) => {
    const userImgChange = e.target.files;
    setProfile(e.target.files[0]);
    const myImgChangeURl = URL.createObjectURL(userImgChange[0]);
    setIsImgUrl(myImgChangeURl);
    setIsImgChange(false);
    
  };
  const updateMutation = useMutation((formData) => {
    instance
      .put(`/oauth/mypage/${userId}/img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res.data);
        sessionStorage.setItem("userImage", res.data.userImageURL[0]);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err, "why");
      });
  });

  const userInfoChangeClick = () => {
    console.log("이미지", isImgUrl);
    const formData = new FormData();
    formData.append("images", profile);
    updateMutation.mutate(formData);
  };
  return (
    <div>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <img
            style={{ width: "24px", height: "24px" }}
            src={profileEdit}
            alt="프로필수정"
          ></img>
        }
      >
        <Avatar
          alt="프로필 이미지"
          src={userImage}
          sx={{ width: 72, height: 72 }}
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleOpen();
          }}
        />
      </Badge>
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
            <Main id="transition-modal-title" variant="h6" component="h2">
              <div id="profileTitle">
                <h3>프로필 이미지 수정</h3>
                <CancelImg
                  className="cancel"
                  src={cancelIcon}
                  alt="닫기"
                  onClick={() => {
                    handleClose();
                    setIsImgUrl("");
                  }}
                />
              </div>
            </Main>
            <Main component="div">
              <div id="imgBox">
                <MyImg src={isImgUrl ? isImgUrl : userImage}></MyImg>
                <div className="btn">
                <input 
                   style={{ display: "none", outline: "none" }}
                   ref={currentImg}
                   type={"file"}
                    accept={"image/*"}
                    onChange={onImgChange}
                />
                <button onClick={imgChangeClick}>프로필 이미지 선택</button>
                <button
                  className="save"
                  onClick={() => {
                    userInfoChangeClick();
                  }}
                >
                  저장
                </button>
                </div>
              </div>
            </Main>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const Main = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;

  #profileTitle {
    display: flex;
    justify-content: space-between;
    h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      line-height: 38px;
      margin-bottom: 90px;
    }
  }
  #imgBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .btn{
      margin-top: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    button {
      /* width: 540px; */
      width: 88.82%;
      height: 79px;
      /* padding: 10px 15px; */
      border: none;
      background: #eee9e4;
      border-radius: 20px;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 150%;
      cursor: pointer;
    }
    .save {
      margin-top: 12px;
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 150%;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        #eee9e4;
      border: 1px solid #d1d1d6;
      border-radius: 20px;
    }
  }
`;

const MyImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const CancelImg = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 20px;
  cursor: pointer;
`;

export default MyInfoModal;
