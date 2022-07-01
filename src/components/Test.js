import React, { useEffect } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import styled from "styled-components";
import instance from "../shared/axios";
import { useQuery } from "react-query";

const Test = () => {
  const { isLoading, data } = useQuery(["content"], () =>
    instance.get("/post").then((res) => res.data)
  );
  if (isLoading) {
    return "Loading....";
  }
  return (
    <Container>
      {data.map((v) => (
        <div  key={v.id}>
        <Viewer height="200px" initialValue={v.postContent || ""} />
        <div>{v.title}</div>
        </div>
      ))}

      {/* <div>{data[0].id}</div>
      <div>{data[1].id}</div> */}
    </Container>
  );
};
const Container = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid;
`;
export default Test;
