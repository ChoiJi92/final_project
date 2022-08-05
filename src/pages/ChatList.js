import React, { useRef, useState } from "react";
import { useMutation, useQuery} from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import AvatarGroup from "@mui/material/AvatarGroup";
import saveIcon from "../assests/css/images/saveIcon.webp";
import instance from "../shared/axios";
import searchIconBlack from "../assests/css/images/searchIconBlack.webp";
import RoomModal from "../components/RoomModal";
import Footer from "../components/Footer";
import MetaTag from "./MetaTag";
import { useRecoilState } from "recoil";
import { chatRoomList } from "../recoil/atoms";
import ScrollTopBtn from "../components/ScrollTopBtn";

const ChatList = () => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const [chatRoom, setChatRoom] = useRecoilState(chatRoomList);
  const [sort, setSort] = useState("");
  const [hashTag, setHashTag] = useState();
  const [search, setSearch] = useState();
  const { data } = useQuery(
    ["loadChatRoom"],
    () =>
      instance.get("/room").then((res) => {
        setChatRoom(res.data.allRoom);
        return res.data;
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const joinRoom = useMutation(
    (roomId) =>
      instance
        .post(`/room/${roomId}`)
        .then((res) => {
          navigate(`/chatroom/${roomId}`);
        })
        .catch((err) => {
          window.alert(err.response.data.errorMEssage);
        })
  );
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearch(searchRef.current.value);
      searchRef.current.value = "";
    }
  };
  const popularChatRoom = useQuery(
    ["popularChatRoom", sort],
    () =>
      instance.get("/room/search/populer").then((res) => {
        setChatRoom(res.data.allRoom)
        return res.data;
      }).catch((err)=>console.log(err)),
    {
      enabled: !!sort,
      refetchOnWindowFocus: false,
    }
  );
  const sortChange = (e) => {
    setSort(e.target.value);
    console.log(e.target.value)
  };
  const searchRoom = useQuery(
    ["searchRoom", search],
    () =>
      instance
        .get(`/room/search`, { params: { search: search } })
        .then((res) => {
          setChatRoom(res.data.searchResult);
          return res.data.searchResult;
        }).catch((err)=>console.log(err)),
    {
      enabled: !!search,
      refetchOnWindowFocus: false,
    }
  );
  const searchHashTag = useQuery(
    ["searchHashTag", hashTag],
    () =>
      instance
        .get(`/room/search/hashTag`, { params: { search: hashTag } })
        .then((res) => {
          setChatRoom(res.data.rooms);
          return res.data.rooms;
        }).catch((err)=>console.log(err)),
    {
      enabled: !!hashTag,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <MetaTag title={"오픈채팅 | 멘도롱 제주"}></MetaTag>
      <Container>
        <Top>
          <div className="title">
            <h2>제주살이 오픈 챗 방</h2>
            <p>제주 살이에 관한 이모저모를 오픈 챗방에서 나눠보세요.</p>
          </div>
          <div className="search">
            <input
              placeholder="채팅방 검색하기"
              ref={searchRef}
              onKeyPress={onKeyPress}
            ></input>
            <img
              src={searchIconBlack}
              alt="검색"
              onClick={() => {
                setSearch(searchRef.current.value);
                searchRef.current.value = "";
              }}
            ></img>
          </div>
          <div className="keyword">
            <div className="keywordTitle">인기 키워드</div>
            <div className="keywordList">
              {data.tags?.map((v, i) => (
                <p
                  key={i}
                  onClick={() => {
                    setHashTag(v);
                  }}
                >
                  {v}
                </p>
              ))}
            </div>
          </div>
        </Top>
        <Bottom>
          <div className="header">
            <Select
              style={{
                width: "26.3%",
                height: "58px",
                border: "none",
                borderRadius: "10px",
                fontSize: "20px",
                textAlign: "center",
                fontStyle: "normal",
                fontWeight: "400",
                background: "#EEE9E4",
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              defaultValue={""}
              onChange={sortChange}
            >
              <MenuItem value="" onClick={()=>{
                setChatRoom(data.allRoom)
              }}>최신순</MenuItem>
              <MenuItem value="인기순">인기순</MenuItem>
            </Select>
            <RoomModal width={"31.74%"} borderRadius={"10px"}></RoomModal>
          </div>

          {chatRoom.map((v, i) => (
            <Card
              key={v.roomId}
              onClick={() => {
                joinRoom.mutate(v.roomId);
              }}
            >
              <div className="roomInfo">
                <h3>{v.title}</h3>
                <div className="avatar">
                  <div className="host">
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <img
                          style={{ width: "17px", height: "17px" }}
                          src={saveIcon}
                          alt="호스트"
                        ></img>
                      }
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
                <div className="tagList">
                  {v.hashTag.map((v, i) => (
                    <p key={i}>{v}</p>
                  ))}
                </div>
              </div>
              <div className="roomUserNumber">
                <p>참여자</p>
                <p className="number">{v.roomUserNum}명</p>
              </div>
            </Card>
          ))}
        </Bottom>
      </Container>
      <ScrollTopBtn/>
      <Footer />
    </>
  );
};

const Container = styled.div`
  height: auto;
  min-height: 100vh;
`;
const Top = styled.div`
  background-color: #f7f3ef;
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
    border: none;
    border-radius: 20px;
    height: 62px;
    width: 29.17%;
    /* width: 560px; */
    padding: 0 20px;
    margin: 32px 0 25px 0;
    background-color: #eee9e4;
    input {
      width: 95%;
      /* height: 50px; */
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      border: none;
      outline: none;
      background: #eee9e4;
      padding: 0 10px;
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
        background-color: #eee9e4;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #3a3a3c;
        cursor: pointer;
      }
    }
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 41.459%;
  height: 170px;
  border: none;
  padding: 20px;
  background: #fdfcfb;
  box-shadow: 0px 12px 42px #eee9e4;
  border-radius: 20px;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  :hover {
    background: #f7f3ef;
    .roomUserNumber {
      /* background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
        #eee9e4; */
      background: #eee9e4;
      border-radius: 10px;
    }
  }
  .roomInfo {
    h3 {
      margin-bottom: 12px;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      color: #636366;
    }
    .avatar {
      width: 70%;
      display: flex;
      flex-direction: row;
      /* justify-content: space-between; */
      align-items: center;
    }
    .host {
      display: flex;
      align-items: center;
      /* margin-right: 40px; */
      width: 280px;
      white-space: nowrap;
      text-overflow: ellipsis;
      /* overflow: hidden; */
      /* border: 1px solid; */
      p {
        margin-left: 10px;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: #636366;
      }
    }
    .tagList {
      margin-top: 22px;
      display: flex;
      flex-direction: row;
      p {
        /* margin-top: 10px; */
        /* width: 25.865%; */
        width: 122px;
        height: 35px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        background-color: #eee9e4;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #3a3a3c;
      }
    }
    .MuiAvatar-root {
      width: 36px;
      height: 36px;
    }
  }

  .roomUserNumber {
    width: 130px;
    /* border: 1px solid; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f7f3ef;
    border-radius: 10px;
    border: none;
    p {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #636366;
    }
    .number {
      margin-top: 10px;
      font-style: normal;
      font-weight: 600;
      font-size: 27px;
      line-height: 32px;
      color: #636366;
    }
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
      padding: 0 10px;
    }
  }
`;

export default ChatList;
