import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import AvatarGroup from "@mui/material/AvatarGroup";
import saveIcon from '../assests/css/saveIcon.png'
import instance from "../shared/axios";
import searchIconBlack from "../assests/css/searchIconBlack.png";
import { Link } from "react-router-dom";
import RoomModal from "../components/RoomModal";
import LoginError from "./LoginError";

const ChatList = () => {
  const searchRef = useRef()
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = localStorage.getItem('userId')
  const { data } = useQuery(
    ["loadChatRoom"],
    () =>
      instance.get("/room").then((res) => {
        console.log(res.data);
        return res.data.allRoom;
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const joinRoom = useMutation((roomId) =>
    instance
      .post(`/room/${roomId}`)
      .then((res) => {
        console.log(res.data);
        navigate(`/chatroom/${roomId}`);
      })
      .catch((err) => {
        window.alert(err.response.data.msg);
      })
      // ,{
      //   onSuccess: () => {
      //     // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
      //     queryClient.invalidateQueries("loadDetailRoom");
      //   },
      // }
  );
  // const searchRoom = useQuery(['searchRoom'],()=>
  // instance.get(`/room/search`,{params:{search:searchRef.current.value}}).then((res)=>{
  //   console.log(res)
  // }))
  
  // const searchRoom = () => {};
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
            ref={searchRef}
          ></input>
          <img src={searchIconBlack} alt="검색"></img>
        </div>
        <div className="keyword">
          <div className="keywordTitle">인기 키워드</div>
          <div className="keywordList">
            <p># 키워드</p>
            <p># 키워드</p>
            <p># 키워드</p>
          </div>
        </div>
      </Top>
      <Bottom>
        <div className="header">
          <Select
            // onChange={handleChange}
            defaultValue="최신순"
            style={{
              width: "26.3%",
              height: "58px",
              border: "1px solid #C7C7CC",
              borderRadius: "10px",
              fontSize: "20px",
              textAlign: "center",
              fontStyle: "normal",
              fontWeight: "400",
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="최신순">최신순</MenuItem>
            <MenuItem value="인기순">인기순</MenuItem>
          </Select>
          <RoomModal width={"31.74%"}></RoomModal>
        </div>
        {data.map((v, i) => (
          <Card
            key={v.roomId}
            onClick={() => {
              userId ? 
              joinRoom.mutate(v.roomId) : <LoginError></LoginError>
              
            }}
          >
            <h3>{v.title}</h3>
            <div className="avatar">
              <div className="host">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={<img style={{width:'17px',height:'17px'}} src={saveIcon} alt="호스트"></img>}
                >
                  <Avatar
                    alt="호스트 이미지"
                    src={v.hostImg}
                    sx={{ width: 36, height: 36 }}
                  />
                </Badge>
                <p>{v.hostNickname}</p>
              </div>
              <AvatarGroup max={4}>
                {v.roomUserImg.map((v, i) => (
                  <Avatar
                    key={i}
                    alt={`${v}-${i}`}
                    src={v}
                    sx={{ width: 36, height: 36 }}
                  />
                ))}
              </AvatarGroup>
            </div>
          </Card>
        ))}
      </Bottom>
    </>
  );
};
const Top = styled.div`
  background-color: #e5e5ea;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  .title {
    width: 40%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    margin-top: 70px;
    h2 {
      margin-bottom: 12px;
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      line-height: 38px;
      color: #636366;
    }
    p {
      color: #636366;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
    }
  }
  .search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #aeaeb2;
    border-radius: 10px;
    height: 62px;
    width: 29.17%;
    /* width: 560px; */
    padding: 0 10px;
    margin: 32px 0 25px 0;
    background-color: white;
    input {
      width: 95%;
      /* height: 50px; */
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      border: none;
      outline: none;
      ::placeholder {
        color: #c7c7cc;
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
    margin-bottom: 60px;
    height: auto;
    .keywordTitle {
      margin-right: 20px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      color: #2c2c2e;
      white-space: nowrap;
    }
    .keywordList {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      p {
        /* margin-top: 10px; */
        width: 25.865%;
        height: 35px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        background-color: white;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #3a3a3c;
      }
    }
  }
`;
const Card = styled.div`
  width: 41.459%;
  /* width: 796px; */
  height: 190px;
  border-radius: 10px;
  border: 1px solid #d1d1d6;
  padding: 20px;
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
    margin-bottom: 12px;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #636366;
  }
  .avatar {
    /* border: 1px solid; */
    width: 70%;
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    align-items: center;
  }
  .host {
    display: flex;
    align-items: center;
    margin-right: 40px;
    width: 100px;
    p {
      margin-left: 10px;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #636366;
    }
  }
  .MuiAvatar-root {
    width: 36px;
    height: 36px;
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
    /* width: 40%; */
    width: 41.459%;
    height: 58px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0 20px 0;
    select {
      width: 20%;
      border-radius: 10px;
      border: 1px solid #c7c7cc;
      padding: 0 10px;
    }
  }
`;

export default ChatList;
