import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RoomModal from "../components/RoomModal";
import io from "socket.io-client";
import instance from "../shared/axios";
import enterIcon from "../assests/css/enterIcon.png";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatState } from "../recoil/atoms";

const ChatRoom = () => {
  const messageRef = useRef();
  const chatBoxRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useRecoilState(chatState);
  const [host, setHost] = useState(false);
  const nickName = localStorage.getItem("nickName");
  const userId = localStorage.getItem("userId");
  const userImage = localStorage.getItem("userImage");
  const url = process.env.REACT_APP_BASE_URL;
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
          setChat([
            ...res.data.loadChat.map((v) => ({
              messageChat: v.chat,
              profileImage: v.userImg,
              user: v.userNickname,
            })),
          ]);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    console.log("연결");
    socket.current = io(url);
    // socketRef.current = io.connect(url);
    console.log("나는 이펙트 소켓", socket.current);
    socket.current.emit("join-room", params.id, userId);
    console.log("소켓", socket);
    console.log("111111", chat);

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
    socket.current.on("welcome", (nickname) => {
      // console.log(nickname);
      setChat([...chat, { messageChat: `${nickname}님이 입장하셨습니다.` }]);
      console.log(chat);
    });
  }, [chat]);
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
  const leaveRoom = (roomId) => {
    socket.current.emit("leave-room", roomId, userId);
    socket.current.on("bye", (nickname) => {
      console.log(nickname, "님이 퇴장하셨습니다.");
      setChat([...chat, { messageChat: `${nickname}님이 퇴장하셨습니다.` }]);
    });
    navigate("/chat");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (messageRef.current.value !== "") {
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
        console.log(chat);
        messageRef.current.value = "";
      }
    }
  };
  return (
    <Container>
      <Wrap>
        <ChatWrap>
          <ChatList>
            <Header host={host}>
              <div
                className="openChat"
                onClick={() => {
                  setHost(false);
                }}
              >
                오픈챗방
              </div>
              <div
                className="hostChat"
                onClick={() => {
                  setHost(true);
                }}
              >
                호스트와 대화
              </div>
            </Header>
            <div className="chat">
              {data.chatingRooms.map((v, i) => (
                <div
                  className={
                    v.roomId === Number(params.id)
                      ? "currentChatRoom"
                      : "chatRoom"
                  }
                  key={v.roomId}
                >
                  <h3
                    onClick={() => {
                      navigate(`/chatroom/${v.roomId}`);
                    }}
                  >
                    {v.title}
                  </h3>
                  <div className="btn">
                    <p>참여자 {v.roomUserNum}명</p>
                    <button
                      onClick={() => {
                        leaveRoom(v.roomId);
                      }}
                    >
                      방 나가기
                    </button>
                  </div>
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
                  v.user !== nickName ? (
                    i === 0 || v.user !== chat[i - 1].user ? (
                      !v.user ? (
                        <p className="notice" key={`${v.messageChat}-${i}`}>
                          {v.messageChat}
                        </p>
                      ) : (
                        <div className="messageList" key={i}>
                          <img src={v.profileImage} alt="프로필"></img>
                          <div className="message">
                            <p>{v.user}</p>
                            <div>{v.messageChat}</div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="sameUserMessage" key={i}>
                        <div className="message">
                          <div>{v.messageChat}</div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="myMessageList" key={i}>
                      <div className="myMessage">{v.messageChat}</div>
                    </div>
                  )
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
    /* :hover {
      border-bottom: 2px solid;
    } */
  }
  .openChat {
    border-bottom: ${(props) => !props.host && "3px solid #48484A"};
  }
  .hostChat {
    border-bottom: ${(props) => props.host && "3px solid #48484A"};
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
    .currentChatRoom {
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
      .btn {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        button {
          width: 30%;
          height: 30px;
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          line-height: 24px;
          background: #f2f2f7;
          border-radius: 10px;
          border: none;
          cursor: pointer;
        }
      }
    }
    .chatRoom {
      padding: 30px 27px;
      border-bottom: 1px solid #c7c7cc;
      button {
        display: none;
      }
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
  .sameUserMessage {
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
      font-style: normal;
      font-weight: 600;
      font-size: 13.3568px;
      line-height: 16px;
    }
  }
  .myMessage {
    border-radius: 11.1307px 11.1307px 5.56533px 11.1307px;
    background: #d1d1d6;
    color: white;
    padding: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 13.3568px;
    line-height: 16px;
  }
  .notice {
    text-align: center;
    border: 1px solid;
    width: 55%;
    margin: 10px auto;
    border-radius: 20px;
    background-color: #d1d1d6;
    border: none;
    padding: 5px;
    font-style: normal;
    font-weight: 600;
    font-size: 13.3568px;
    line-height: 16px;
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
