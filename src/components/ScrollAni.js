import React from "react";
import { Animator, ScrollContainer, ScrollPage, batch, Sticky, Fade, ZoomIn, Move, FadeIn, StickyIn } from "react-scroll-motion";
import room1 from "../assests/css/room1.jpeg"
import room2 from "../assests/css/room2.jpeg"
import jeju1 from "../assests/css/jeju1.jpeg"
import jeju2 from "../assests/css/jeju2.jpeg"
import styled from "styled-components";

const ImgBox = styled.div`
  display: flex;
  img{
    margin-left: 10px;
    border-radius:5px;
  }
`

const HostBox = styled.div`
  
  width: 500px;
  height: 200px;
  h2{
    margin-left: 20px;
  }
`
const ChatBox = styled.div`
  
  width: 300px;
  height: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #54a0ff;
  color: #ffffff;
  font-size: 15px;
`

const ChatBox2 = styled.div`
  
  width: 300px;
  height: 50px;
  margin:15px 0px 0px 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* border-top-right-radius: 0px;
  border-top-left-radius: 15px; */
  border-radius: 10px;
  background-color:#54a0ff;
  color: #ffffff;
  font-size: 15px;
`

const ScrollAni = () => {
    return(
        <ScrollContainer>
      <ScrollPage page={1}>
        <Animator animation={batch(Sticky(), Fade())}>
          <h1>hello</h1>
        </Animator>
      </ScrollPage>

      <ScrollPage page={2}>
        <Animator animation={batch(StickyIn(), FadeIn(), ZoomIn())}>
          <h1>멘도롱 제주와 함께 롱 하게 즐기는 제주</h1>
        </Animator>
      </ScrollPage>

      <ScrollPage page={3}>
        <Animator animation={batch(StickyIn(30, 40),Move(50),Fade())}>
          <ImgBox>
            <img src={room1} />
            <img src={room2} />
          </ImgBox>
          <h2>멘도롱제주에서 원하는 숙소를 찾아보세요.</h2>
        </Animator>    
         
        <Animator animation={batch(StickyIn(70, 75),Fade(),Move(10))}>
          <HostBox>
            <ChatBox><span>호스트님, 7월 1일부터 7월 31일까지 방 있나요?</span></ChatBox>
            <ChatBox2><span>잠시만요, 확인해보겠습니다.</span></ChatBox2>
            <h2>호스트와 직접 대화해보세요!</h2>
          </HostBox>
        </Animator> 

      </ScrollPage>
      <ScrollPage page={4}> 
        <Animator animation={batch(StickyIn(30, 40),Fade(),Move(10))}>
          <HostBox>
            <ChatBox><span>제주은갈치님, 여기서 스텝활동 어떠셨나요?</span></ChatBox>
            <ChatBox2><span>호스트님도 좋았고 숙소도 굉장히 깔끔했어요!</span></ChatBox2>
            <h2>유저와 직접 대화해보세요!</h2>
          </HostBox>
          {/* 30, 40, 70, 75 */}
        </Animator>
        <Animator animation={batch(StickyIn(70, 75),Move(10),Fade())}>
          <ImgBox>
            <img src={jeju1} />
            <img src={jeju2} />
          </ImgBox>
          <h2>멘도롱제주에서 여행지 주변 정보를 찾아보세요</h2>
        </Animator>    
        
      </ScrollPage>
      <ScrollPage page={5}>
        <Animator animation={batch(Sticky(), Fade())}>
          <h1>hello</h1>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
    )
}

export default ScrollAni;