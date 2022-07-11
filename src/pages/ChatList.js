import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import instance from "../shared/axios";
import searchIconBlack from "../assests/css/searchIconBlack.png";
import { Link } from "react-router-dom";
import RoomModal from "../components/RoomModal";

const ChatList = () => {
  const [room, setRoom] = useState();
  const { data } = useQuery(
    ["loadChatRoom"],
    () =>
      instance.get("/room").then((res) => {
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
  const searchRoom = () => {};
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
    }
  };
  return (
    <>
      <Top>
        <div className="title">
          <h2>제주살이 오픈 챗 방</h2>
          <p>제주 살이에 관한 이모저모를 오픈 챗방에서 나눠보세요.</p>
          <Link to="/chatroom" style={{ color: "black" }}>
            모두보기
          </Link>
        </div>
        <div className="search">
          <input
            placeholder="채팅방 검색하기"
            onChange={onChange}
            value={room || ""}
          ></input>
          <img src={searchIconBlack} alt="검색"></img>
        </div>
        <div className="keyword">
          <div>인기 키워드</div>
          <p># 키워드</p>
          <p># 키워드</p>
          <p># 키워드</p>
        </div>
      </Top>
      <Bottom>
        <div className="header">
          <Select
            // onChange={handleChange}
            defaultValue="최신순"
            style={{
              width: "23%",
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
          <RoomModal width={'30%'}></RoomModal>
        </div>
        {data.map((v) => (
          <Card key={v.id}>
            <h3>{v.roomName}</h3>
            <div className="avatar">
              <div className="host">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 40, height: 40 }} />
            <p>방장 이름</p>
            </div>
              <AvatarGroup max={4}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 40, height: 40 }}/>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: 40, height: 40 }}/>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" sx={{ width: 40, height: 40 }}/>
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" sx={{ width: 40, height: 40 }}/>
                <Avatar
                  alt="Trevor Henderson"
                  src="/static/images/avatar/5.jpg"
                  sx={{ width: 40, height: 40 }}
                />
              </AvatarGroup>
            </div>
            {/* <div>내용들</div> */}
            {/* <button>입장하기</button> */}
          </Card>
        ))}
      </Bottom>
    </>
  );
};
const Top = styled.div`
  background-color: #e5e5ea;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    width: 40%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    margin-top: 20px;
    h2 {
      margin-bottom: 10px;
    }
    p {
      color: #626273;
    }
  }
  .search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-radius: 10px;
    height: 20%;
    width: 30%;
    padding: 0 10px;
    margin: 30px 0;
    background-color: white;
    input {
      width: 95%;
      /* height: 50px; */
      font-size: medium;
      border: none;
      outline: none;
      ::placeholder {
        text-align: center;
      }
    }
    img {
      cursor: pointer;
    }
  }
  .keyword {
    width: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    div {
      margin-right: 10px;
    }
    p {
      width: 100px;
      height: 27px;
      /* border: 1px solid; */
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      background-color: white;
      font-size: 14px;
    }
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
  .avatar{
    /* border: 1px solid; */
    width: 70%;
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    align-items: center;
  }
  .host{
      display: flex;
      align-items: center;
      margin-right: 40px;
      p{
        margin-left: 10px;
      }

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
    
    /* button {
      width: 28%;
      height: 60%;
      border-radius: 10px;
      background-color: #c7c7cc;
      border: none;
      cursor: pointer;
    } */
  }
  /* .keyword {
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
  } */
`;

export default ChatList;
