import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useMutation, useQuery } from "react-query";
import instance from "../shared/axios";
import { useNavigate } from "react-router-dom";
import saveIcon from "../assests/css/saveIcon.png";
const SearchResult = ({ search, hashTag }) => {
  console.log(hashTag ,'나는 서치할것!!')
  const searchRoom= useQuery(
    ["searchRoom", search],
    () =>
      instance
        .get(`/room/search`, { params: { search: search } })
        .then((res) => {
          console.log(res)
          return res.data.searchResult;
        }),
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
          console.log(res)
          // return res.data;
        }),
    {
      enabled: !!hashTag,
      refetchOnWindowFocus: false,
    }
  );
  const navigate = useNavigate();
  const joinRoom = useMutation((roomId) =>
    instance
      .post(`/room/${roomId}`)
      .then((res) => {
        // console.log(res.data);
        navigate(`/chatroom/${roomId}`);
      })
      .catch((err) => {
        // console.log(err);
        window.alert(err.response.data.msg);
      })
  );
  return (
    <>
      {searchRoom.data.map((v, i) => (
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
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
    </>
  );
};

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

export default SearchResult;
