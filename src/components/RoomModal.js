import React, { useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import cancelIcon from "../assests/css/cancelIcon.png";
import instance from "../shared/axios";
import { useMutation, useQueryClient } from "react-query";
import TagList from "./TagList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 'auto',
  bgcolor: "background.paper",
  borderRadius: "30px",
  outline: "none",
  boxShadow: 24,
  p: 4,
  background: 'linear-gradient(0deg, rgba(246, 243, 239, 0.5), rgba(246, 243, 239, 0.5)), #FFFFFF' 
};

const RoomModal = ({ width,borderRadius }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tagList, setTagList] = useState([]);
  const [userCount, setUserCount]=useState()
  const queryClient = useQueryClient();
  const roomNameRef = useRef();
  const userCountRef = useRef();

  const createChatRoom = useMutation(
    ["createChatRoom"],
    (data) => instance.post("/room", data).then((res) => console.log(res.data)),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("loadChatRoom");
        queryClient.invalidateQueries("loadDetailRoom");
      },
    }
  );
  const userCountChange = (event) => {
    setUserCount(event.target.value);
  };
  const createRoom = () => {
    if (!roomNameRef.current.value) {
      window.alert("방 제목을 입력해 주세요 :)");
    } else if (!userCount) {
      window.alert("방 인원을 정해주세요 :)");
    } else {
      console.log(roomNameRef.current.value)
      console.log(userCount)
      console.log(tagList)
      const data = {
        title: roomNameRef.current.value,
        max: userCount,
        hashTag: tagList,
      };
      createChatRoom.mutate(data);
      handleClose();
      setTagList([]);
    }
  };
  return (
    <Wrap width={width}>
      <RoomButton borderRadius={borderRadius} onClick={handleOpen}>챗방 만들기</RoomButton>
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
            <Container id="transition-modal-title" variant="h6" component="div">
              <h1>챗방 만들기</h1>
              <img
                className="cancel"
                src={cancelIcon}
                alt="닫기"
                onClick={()=>{handleClose()
                setTagList([])}}
              ></img>
            </Container>
            <Middle
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component="div"
            >
              <div className="roomName">
                <h3>방 제목</h3>
                <input
                  id="roomName"
                  ref={roomNameRef}
                  placeholder="방 제목을 입력해 주세요."
                ></input>
              </div>
              <div className="userCount">
                <h3>인원</h3>
                <Select
                defaultValue=""
                onChange={userCountChange}
                style={{
                  width: "80%",
                  height: "56px",
                  border: "none",
                  background: '#F7F3EF',
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "18px",
                  lineHeight: "150%",
                  borderRadius: "10px",
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" disabled={true}>
                  채팅방 인원을 선택해주세요.
                </MenuItem>
                <MenuItem value="2">
                  2
                </MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
              </Select>
              </div>
              <div className="hashTag">
                <h3>태그</h3>
                <TagList
                  maxLength={5}
                  width= {'100%'}
                  margin={'0'}
                  tagList={tagList}
                  setTagList={setTagList}
                />
              </div>
            </Middle>
            <Btn onClick={createRoom}>생성</Btn>
          </Box>
        </Fade>
      </Modal>
    </Wrap>
  );
};
const Wrap = styled.div`
  width: ${(props) => props.width};
  height: 58px;
`;
const RoomButton = styled.button`
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  border-radius: ${(props)=>props.borderRadius};
  background:linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #EEE9E4;;
  color: white;
  border: none;
  cursor: pointer;
  outline: none;
`;
const Container = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 30px;
    font-weight: 400;
  }
  img {
    position: absolute;
    right: 20px;
    cursor: pointer;
  }
`;
const Middle = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40vh;
  .roomName {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    input {
      padding: 20px;
      width: 80%;
      height: 56px;
      border: none;
      background: #F7F3EF;
      border-radius: 10px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      ::placeholder {
        color: #8e8e93;
      }
    }
  }
  .userCount {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    input {
      padding: 10px;
      width: 80%;
      height: 56px;
      border: 1px solid #c7c7cc;
      border-radius: 10px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      ::placeholder {
        color: #8e8e93;
      }
      // input type number 일 때 오른쪽 화살표 없애는 css
      /* ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button{
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      } */
    }
  }
  .hashTag {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    h3 {
      width: 25%;
    }
  }
`;
const Btn = styled.button`
  width: 50%;
  height: 56px;
  margin: 0 auto;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  border-radius: 10px;
  background:linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #EEE9E4;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;
export default RoomModal;
