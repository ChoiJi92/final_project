import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RoomModal from "../components/RoomModal";
import io from "socket.io-client";
import instance from "../shared/axios";
import enterIcon from "../assests/css/enterIcon.png";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const ChatRoom = () => {
  const messageRef = useRef();
  const chatBoxRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickName");
  const userId = localStorage.getItem("userId");
  const userImage = localStorage.getItem("userImage");
  const url = "https://www.mendorong-jeju.com";
  const socket = useRef();
  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };
  const { data } = useQuery(
    ["loadDetailRoom", params.id],
    () =>
      instance
        .get(`/room/${params.id}`)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const [chat, setChat] = useState([...data.loadChat.map(v => ({messageChat:v.chat,profileImage:v.userImg,user:v.userNickname}))]);
  useEffect(() => {
    console.log("연결");
    socket.current = io(url);
    // socketRef.current = io.connect(url);
    console.log("나는 이펙트 소켓", socket);
    socket.current.emit("join-room", params.id);
    console.log("소켓", socket);
    socket.current.on("welcome", (nickname) => {
      console.log(nickname);
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.current.on("message", (messageChat, user, profileImage, roomId) => {
      console.log(messageChat, user, profileImage, roomId);
      setChat([...chat, { user, messageChat, profileImage }]);
    });
    scrollToBottom();
  }, [chat]);
console.log(chat)
  const sendMessage = (message) => {
    console.log("나는 메세지 소켓", socket);
    if (message !== "") {
      socket.current.emit("chat_message", message, userId, params.id);
      setChat([
        ...chat,
        { messageChat: message, user: nickName, profileImage: userImage },
      ]);
      console.log(message, userId);
      messageRef.current.value = "";
    }
  };

  // const joinRoom = () => {
  //   console.log('나는 룸 소켓',socket)
  //   console.log(socket.id)
  //   const roomName = titleRef.current.innerText;
  //   socket.emit("join-room", roomName, nickName,userImage);
  //   console.log('룸입장')
  //   socket.on("welcome",(user,roomId,a) =>{
  //     console.log(user,roomId,a)
  //   })
  //   setRoom(roomName);
  // };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(messageRef.current.value);
      console.log("나는 메세지 소켓", socket);
      socket.current.emit(
        "chat_message",
        messageRef.current.value,
        userId,
        params.id
      );
      setChat([
        ...chat,
        {
          messageChat: messageRef.current.value,
          user: nickName,
          profileImage: userImage,
        },
      ]);
      console.log(chat)
      messageRef.current.value = "";
    }
  };
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
              {data.chatingRooms.map((v, i) => (
                <div className= {v.roomId === Number(params.id) ? 'currentChatRoom' : 'chatRoom'}
                  key={v.roomId}
                  onClick={() => {
                    navigate(`/chatroom/${v.roomId}`);
                  }}
                >
                  <h3>{v.title}</h3>
                  <p>참여자 {v.roomUserNum}명</p>
                </div>
              ))}
            </div>
            <div className="chatButton">
              <RoomModal width={"91.09%"}></RoomModal>
            </div>
          </ChatList>
          <Room>
            <div className="messageWrap">
              <div className="title">
                <p>오픈 챗 방</p>
                <h2>{data.Room.title}</h2>
              </div>
              <div className="chatWrap" ref={chatBoxRef}>
                {chat.map((v, i) => 
                  (v.user !== nickName ? (
                    i===0 || v.user !== chat[i-1].user ? (
                      <div className="messageList" key={i}>
                        <img src={v.profileImage} alt="프로필"></img>
                        <div className="message">
                          <p>{v.user}</p>
                          <div>{v.messageChat}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="sameUserMessage" key={i}>
                        <div className="message">
                          <div>{v.messageChat}</div>
                        </div>
                      </div>
                    ))
                   : (
                    <div className="myMessageList" key={i}>
                      <div className="myMessage">{v.messageChat}</div>
                    </div>
                  ))
                  )}
              </div>
            </div>
            <div className="chat">
              <img className="profile" src={userImage} alt="프로필"></img>
              <div className="chatInput">
                <input
                  placeholder="입력해주세요!"
                  ref={messageRef}
                  onKeyPress={onKeyPress}
                ></input>
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
  margin-bottom: 50px;
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
    overflow-y: auto;
    .currentChatRoom{
      padding: 30px 27px;
      border-bottom: 1px solid #c7c7cc;
      background-color: #d1d1d6;
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
    .chatRoom {
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
  .chatWrap {
    height: 84%;
    overflow-y: auto;
    padding: 21px 16.26px 21px 11.13px;
  }
  .messageList {
    display: flex;
    margin-bottom: 5px;
    img {
      width: 34.51px;
      height: 34.51px;
      border-radius: 50%;
      /* border: 1px solid; */
      margin-right: 11px;
    }
  }
  .sameUserMessage{
    display: flex;
    margin-bottom: 10px;
    margin-left: 45.51px;
  }
  .myMessageList {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
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
  .myMessage {
    border-radius: 11.1307px 11.1307px 5.56533px 11.1307px;
    background: #d1d1d6;
    color: white;
    padding: 10px;
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
      /* border: 1px solid; */
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
