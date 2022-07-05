import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import instance from "../shared/axios";
import searchIconBlack from "../assests/css/searchIconBlack.png";
import { Link } from "react-router-dom";

const ChatList = () => {
  const [room, setRoom] = useState();
  const [search, setSearch] = useState(true)
  const queryClient = useQueryClient();
  const createChatRoom = useMutation(
    ["createChatRoom", room],
    () =>
      instance
        .post("/chat", { roomName: room })
        .then((res) => console.log(res.data)),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("loadChatRoom");
      },
    }
  );
  const { data } = useQuery(
    ["loadChatRoom"],
    () =>
      instance.get("/chat").then((res) => {
        console.log(res.data);
        return res.data;
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const onChange = (e) => {
    setRoom(e.target.value);
  };
  const searchRoom =() =>{
    if(search){
      setSearch(false)
    }
    else{
      if(!room){
        window.alert('방 이름을 입력해 주세요 :)')
      }
      else{
      createChatRoom.mutate()
      setRoom("")
      setSearch(true)
      }
    }
  }
  return (
    <>
      <Top>
        <div className="title">
          <h2>현재 참여중인 채팅방</h2>
          <Link to ='/chatroom' style={{color:'black'}}>모두보기</Link>
        </div>
        <Card>
          <h3>방제목</h3>
          <div>내용들</div>
          <button>입장하기</button>
        </Card>
      </Top>
      <Bottom>
        <div className="header">
          <select>
            <option value="최신순">최신순</option>
            <option value="인기순">인기순</option>
          </select>
          <div className="search">
            {search ?  <>
            <input
              placeholder="채팅방 검색하기"
              onChange={onChange}
              value={room || ""}
            ></input>
            <img src={searchIconBlack} alt="검색"></img>
            </>: <input placeholder="채팅방 제목을 입력해 주세요 :)"onChange={onChange}
              value={room || ""}></input>}
          </div>
          <button
            onClick={() => {
                searchRoom()
            }}
          >
            챗방 만들기
          </button>
        </div>
        <div className="keyword">
          <div>인기 키워드</div>
          <p># 키워드</p>
          <p># 키워드</p>
          <p># 키워드</p>
        </div>
        {data.map((v) => (
          <Card key={v.id}>
            <h3>{v.roomName}</h3>
            <div>내용들</div>
            <button>입장하기</button>
          </Card>
        ))}
      </Bottom>
    </>
  );
};
const Top = styled.div`
  background-color: #e5e5ea;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
`;
const Card = styled.div`
  width: 40%;
  border: 1px solid;
  height: 150px;
  border-radius: 10px;
  padding: 15px;
  background-color: white;
  position: relative;
  margin-bottom: 20px;
  :hover {
    background-color: #d1d1d6;
    border: none;
    button {
      display: block;
    }
  }
  h3 {
    margin-bottom: 10px;
  }
  button {
    display: none;
    width: 25%;
    height: 50px;
    border: none;
    border-radius: 30px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #9090a0;
    color: white;
    font-size: medium;
    cursor: pointer;
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    width: 40%;
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    select {
      width: 20%;
      height: 60%;
      border-radius: 10px;
      padding: 0 10px;
    }
    .search {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border: 1px solid;
      border-radius: 10px;
      height: 60%;
      width: 50%;
      padding: 0 10px;
      input {
        width: 90%;
        border: none;
        outline: none;
      }
      img {
        cursor: pointer;
      }
    }
    button {
      width: 25%;
      height: 60%;
      border-radius: 10px;
      background-color: #c7c7cc;
      border: none;
      cursor: pointer;
    }
  }
  .keyword {
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    div {
      margin-right: 10px;
    }
    p {
      width: 100px;
      height: 25px;
      border: 1px solid;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
    }
  }
`;

export default ChatList;
