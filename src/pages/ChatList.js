import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../shared/axios";

const ChatList = () => {
  const [room, setRoom] = useState();
  const queryClient = useQueryClient();
  const createChatRoom = useMutation(
    ["createChatRoom", room],
    () => instance.post("/chat", {roomName :room}).then((res) => console.log(res.data)),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("loadChatRoom");
      },
    }
  );
  const {data} = useQuery(["loadChatRoom"], () =>
    instance.get("/chat").then((res) => {
      console.log(res.data);
      return res.data;
    }),{
        
        refetchOnWindowFocus:false
      }
  );
  const onChange = (e) => {
    setRoom(e.target.value);
  };
  console.log(data)
  return (
    <div>
      <input onChange={onChange} value={room}></input>
      <button
        onClick={() => {
          createChatRoom.mutate();
          setRoom("")
        }}
      >
        챗방 만들기
      </button>
      {data.map(v => <div key={v.id}>{v.roomName}</div>)}
    </div>
  );
};

export default ChatList;
