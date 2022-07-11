import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RoomModal from "../components/RoomModal";
import io from "socket.io-client";
import instance from "../shared/axios";

const socket = io()

const ChatRoom = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState([])
  const [room, setRoom] = useState()
  // const socket = io.connect()  // backurl 넣기
  const messageRef = useRef()
  const titleRef = useRef()
  useEffect(()=>{
    socket.on('connect',()=>{
      setIsConnected(true)
    })

    socket.on('disconnect',()=>{
      setIsConnected(false)
    })
    socket.on('receive message')
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  },[])
  const joinRoom = () =>{
    const roomName = titleRef.current.innerText
    socket.emit('enter_room',roomName)
    setRoom(roomName)
  }
  const sendMessage = ()=>{
    socket.emit('chat_message',messageRef.current.value, room)
    messageRef.current.value=""
  }
  return (
    <Container>
      <Wrap>
        <Header>
        <Select
            // onChange={handleChange}
            defaultValue="최신순"
            style={{
              width: "40%",
              height: "40px",
              border: "1px solid black",
              fontSize: "14px",
              textAlign: "center",
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="최신순">최신순</MenuItem>
            <MenuItem value="인기순">인기순</MenuItem>
          </Select>
          <RoomModal width={'50%'}></RoomModal>
        </Header>
        <ChatWrap>
          <ChatList>
            <div onClick={joinRoom}>
              <h3 ref={titleRef}>서귀포 한달 살기 중, 밥친구 구해요.</h3>
              <p>참여자 00명</p>
            </div>
            <div>
              <h3>서귀포 한달 살기 중, 밥친구 구해요.</h3>
              <p>참여자 00명</p>
            </div>
          </ChatList>
          <Room>
            <div className="title">
              <p>오픈 챗 방</p>
              <h2>{room}</h2>
            </div>
            <div className="messageWrap">
            <div className="messageList">
                <img alt="프로필"></img>
                <div className="message">
                    <p>사용자1</p>
                    <div>블라블라블라</div>
                </div>
            </div>
            </div>
            <div className="chat">
              <img alt="프로필"></img>
              <div className="chatInput">
                <input placeholder="입력해주세요!"ref={messageRef}></input>
                <button onClick={()=>{
                sendMessage()
                }}>입력</button>
              </div>
            </div>
          </Room>
        </ChatWrap>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  /* align-items: center; */
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 48%;
  height: 70px;
  select {
    width: 40%;
    height: 60%;
    border-radius: 10px;
    padding: 0 10px;
  }
`;
const ChatWrap = styled.div`
  /* width: 100%; */
  height: 700px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  /* border: 1px solid; */
`;
const ChatList = styled.div`
  width: 48%;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  div {
    padding: 20px;
    border-bottom: 1px solid;
    cursor: pointer;
    :hover{
        background-color: #d1d1d6;
    }
  }
`;
const Room = styled.div`
  width: 48%;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title{
    padding: 20px;
    border-bottom: 1px solid;
    p{
        margin-bottom: 5px;
        color: gray;
    }
  }
  .messageWrap{
    height: 100%;
    padding: 10px;
  }
  .messageList{
    display: flex;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid;
        margin-right: 8px;
    }
  }
  .message{
    p{
        margin-bottom: 5px;
    }
    div{
        border: 1px solid;
        border-radius: 5px;
        padding: 10px;
    }
  }
  .chat{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding:10px;
    border-top: 1px solid;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid;
        margin-right: 8px;
    }
  }
  .chatInput{
    display: flex;
    justify-content: space-between;
    width: 85%;
    border: 1px solid;
    border-radius: 5px;
    height: 40px;
    padding: 0 10px;
    input{
      width: 90%;
        border: none;
        outline: none;
    }
    button{
        border: none;
        background-color:transparent;
        cursor: pointer;
    }
  }
`;
export default ChatRoom;
