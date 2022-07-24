import React, { useRef, useState } from "react";
import cancelIcon from "../assests/css/cancelIcon.png";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { current } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "react-query";
import instance from "../shared/axios";

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

const MyInfoModal = () => {
  const userImage = localStorage.getItem("userImage");
  const nickName = localStorage.getItem("nickName");
  const userId = localStorage.getItem("userId");
  // const { open, close } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentImg = useRef(null);

  const [isImgChnage, setIsImgChange] = useState(true);

  const nickRef = useRef(null);
  const [isImgUrl, setIsImgUrl] = useState("");
  const [profile,setProfile] = useState() 
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
    setProfile(e.target.files[0])
    const myImgChangeURl = URL.createObjectURL(userImgChange[0]);
    setIsImgUrl(myImgChangeURl);
    setIsImgChange(false);
  };
  const updateMutation = useMutation((formData) => {
    instance
      .put(
        `/oauth/mypage/${userId}/img`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('userImage',res.data.userImageURL[0])
        handleClose()
        window.location.reload()
      })
      .catch((err) => {
        console.log(err, "why");
      });
  });

  const userInfoChangeClick = () => {
    console.log("이미지", isImgUrl);
    const formData = new FormData();
    formData.append("images", profile);
    updateMutation.mutate(formData)
  };
  return (
    <div>
      <img src={userImage}
      alt="프로필이미지"
      style={{cursor:'pointer'}}
        onClick={() => {
          handleOpen();
        }}
      >
      </img>
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
                    handleClose()
                    setIsImgUrl("")
                  }}
                />
              </div>
            </Main>
            <Main component="div">
              <div id="imgBox">
                <MyImg src={isImgUrl ? isImgUrl : userImage}></MyImg>
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
  }
  #imgBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
      padding: 10px 15px;
      border: none;
      background-color: #f2f2f7;
      border-radius: 10px;
      margin-top: 25px;
      cursor: pointer;
    }
  }
  #nickNameBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    button {
      padding: 10px 15px;
      border: none;
      background-color: #f2f2f7;
      border-radius: 10px;
      margin-top: 25px;
      width: 100%;
      cursor: pointer;
    }
  }
`;

const MyImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 30px;
`;

const CancelImg = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 20px;
  cursor: pointer;
`;

export default MyInfoModal;
