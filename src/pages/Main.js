import React from "react";
import styled from "styled-components";
import Map from "../components/Map";

const Main = () => {
  return (
    <Container>
      <Map></Map>
    </Container>
  );
};

const Container = styled.div`
  height: auto;
  min-height: 100vh;
  padding-bottom: 100px;
`;
export default Main;
