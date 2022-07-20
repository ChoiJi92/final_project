import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RoomModal from "../components/RoomModal";
import io from "socket.io-client";
import instance from "../shared/axios";
import enterIcon from "../assests/css/enterIcon.png";
// const socketUrl = 'http://gudetama.shop'
// const socketUrl = 'http://localhost:3000'
// const socket = io('http://gudetama.shop')
// const socket = io(socketUrl, {
//   cors: {
//       origin: socketUrl,
//       credentials: true,
//   },
// });

const ChatRoom = () => {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [message, setMessage] = useState([]);
  const [room, setRoom] = useState();
  const [chat, setChat] = useState([])
  // const socket = io.connect()  // backurl 넣기
  const messageRef = useRef();
  const titleRef = useRef();
  const nickName = localStorage.getItem('nickName')
  const userId = localStorage.getItem('userId')
  const userImage = localStorage.getItem('userImage')
  const url = "https://www.mendorong-jeju.com";
  // let socket = io(url);
  let socket;
  // const socket = useRef();
  useEffect(() => {
    console.log("연결");
    socket = io(url);
    // socketRef.current = io.connect(url);
    console.log('나는 이펙트 소켓',socket.id);
    socket.emit("join-chatRoom", 1, userId);
    socket.on("message",(messageChat,user,profileImage,roomId)=>{
      console.log(messageChat,user,profileImage,roomId)
      setChat([...chat,{user,messageChat,profileImage}])
      console.log(chat)
    })
    return () => {
      socket.disconnect();
      // socket.off('connect');
      // socket.off('disconnect');
    };
  }, [chat]);
  const sendMessage = (message) => {
    console.log(message)
    console.log(socket.id)
    console.log('나는 메세지 소켓',socket)
    socket.emit("chat_message", message, userId,'roomId');
    console.log(message, userId)
    messageRef.current.value = "";
  };
  const joinRoom = () => {
    console.log('나는 룸 소켓',socket)
    console.log(socket.id)
    const roomName = titleRef.current.innerText;
    socket.emit("join-room", roomName, nickName,userImage);
    console.log('룸입장')
    socket.on("welcome",(user,roomId,a) =>{
      console.log(user,roomId,a)
    }) 
    setRoom(roomName);
  };
  
  const onKeyPress = (e) => {
    if(e.key ==='Enter'){
      console.log(socket.id)
      console.log(messageRef.current.value)
    console.log('나는 메세지 소켓',socket)
    socket.emit("chat_message", messageRef.current.value, nickName, userImage, 'roomId');
    console.log(messageRef.current.value, nickName, userImage)
    messageRef.current.value = "";
    }
  }
  return (
    <Container>
      <Wrap>
        <ChatWrap>
          <ChatList>
            <Header>
              <div className="openChat">오픈챗방</div>
              <div className="hostChat">호스트와 대화</div>
            </Header>
            <div className="chat">
              <div onClick={joinRoom}>
                <h3 ref={titleRef}>서귀포 한달 살기 중, 밥친구 구해요.</h3>
                <p>참여자 00명</p>
              </div>
              <div>
                <h3>서귀포 한달 살기 중, 친구 구해요.</h3>
                <p>참여자 00명</p>
              </div>
            </div>
            <div className="chatButton">
              <RoomModal width={"91.09%"}></RoomModal>
            </div>
          </ChatList>
          <Room>
            <div className="messageWrap">
              <div className="title">
                <p>오픈 챗 방</p>
                <h2>{room}</h2>
              </div>
              <div className="chatWrap">
            {chat.map((v,i) =>
            <div className="messageList" key={i}>
                <img src={v.profileImage} alt="프로필"></img>
                <div className="message">
                  <p>{v.user}</p>
                  <div>{v.messageChat}</div>
                </div>
              </div>
             )}
              </div>
              </div>  
            <div className="chat">
              <img className="profile" src={userImage} alt="프로필"></img>
              <div className="chatInput">
                <input placeholder="입력해주세요!" ref={messageRef} onKeyPress={onKeyPress}></input>
                <img
                  className="enter"
                  src={enterIcon}
                  alt="입력"
                  onClick={() => {
                    sendMessage(messageRef.current.value);
                  }}
                />
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
  margin-top: 40px;
  margin-bottom: 70px;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
`;
const ChatWrap = styled.div`
  /* width: 100%; */
  height: 851px;
  display: flex;
  flex-direction: row;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  height: 54px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #48484a;
  border-bottom: 1px solid #c7c7cc;
  padding-left: 20px;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 17px;
    cursor: pointer;
    :hover {
      border-bottom: 2px solid;
    }
  }
`;
const ChatList = styled.div`
  width: 45.152%;
  border: 1px solid #c7c7cc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .chat {
    height: 90%;
    overflow-y: scroll;
    div {
      padding: 30px 27px;
      border-bottom: 1px solid #c7c7cc;
      :hover {
        background-color: #d1d1d6;
        cursor: pointer;
      }
      h3 {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        margin-bottom: 10px;
      }
      p {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 21px;
        color: #8e8e93;
      }
    }
  }
  .chatButton {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
`;
const Room = styled.div`
  width: 45.152%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .messageWrap {

    height: 90%;
    /* padding: 10px; */
    border: 1px solid #c7c7cc;
    border-radius: 10px;
  }
  .title {
    padding: 20px;
    border-bottom: 1px solid #c7c7cc;
    p {
      margin-bottom: 12px;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #aeaeb2;
    }
  }
  .chatWrap{
    height: 90%;
    overflow-y: scroll;
  }
  .messageList {
    display: flex;
    padding: 21px 16px 5px 11px;
    img {
      width: 34.51px;
      height: 34.51px;
      border-radius: 50%;
      border: 1px solid;
      margin-right: 11px;
    }
  }
  .message {
    p {
      margin-bottom: 5px;
      font-style: normal;
      font-weight: 600;
      font-size: 13.3568px;
      line-height: 16px;
    }
    div {
      border: 1px solid;
      border-radius: 5.56533px 11.1307px 11.1307px 11.1307px;
      padding: 10px;
    }
  }
  .chat {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0;
    .profile {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 1px solid;
      margin-right: 20px;
    }
  }
  .chatInput {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    border: 0.556533px solid #c7c7cc;
    border-radius: 10px;
    height: 60px;
    padding: 0 17px;
    input {
      width: 90%;
      border: none;
      outline: none;
    }
    .enter {
      width: 21.34px;
      height: 21.34px;
      cursor: pointer;
    }
  }
`;
export default ChatRoom;
