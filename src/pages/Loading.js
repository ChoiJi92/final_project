import React from 'react';
import styled from 'styled-components';
import loadingPage from '../assests/css/loadingPage.webp'
const Loading = () => {
    return (
        <Container>
            <img src={loadingPage} alt="로딩중..."/>
        </Container>
    );
};
const Container = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default Loading;