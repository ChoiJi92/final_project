import React, { useRef, useState } from "react";
import cancelIcon from "../assests/css/images/cancelIcon.webp";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { useMutation} from "react-query";
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
  outline: "none",
  p: 4,
};

const MyInfoModal = ({open,setOpen}) => {
  const userImage = sessionStorage.getItem("userImage");
  const userId = sessionStorage.getItem("userId");
  const handleClose = () => setOpen(false);
  const currentImg = useRef(null);
  const [isImgUrl, setIsImgUrl] = useState("");
  const [profile, setProfile] = useState();

  const imgChangeClick = () => {
    currentImg.current.click();
  };

  const onImgChange = (e) => {
    const userImgChange = e.target.files;
    setProfile(e.target.files[0]);
    const myImgChangeURl = URL.createObjectURL(userImgChange[0]);
    setIsImgUrl(myImgChangeURl);
    
  };
  const updateMutation = useMutation((formData) => {
    instance
      .put(`/oauth/mypage/${userId}/img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        sessionStorage.setItem("userImage", res.data.userImageURL[0]);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
      });
  });

  const userInfoChangeClick = () => {
    const formData = new FormData();
    formData.append("images", profile);
    updateMutation.mutate(formData);
  };
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
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
            <Main id="transition-modal-title" variant="h6" component="h2">
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
      width: 88.82%;
      height: 79px;
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
