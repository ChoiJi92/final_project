import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userShare } from "../recoil/atoms";


const KakaoShare= ({data}) => {
  const isUserShare = useRecoilValue(userShare);
  // const isHostShare = useRecoilValue(hostShare);
  // console.log(isUserShare)
  console.log(data)
    const url = window.location.href; //현재 url가져오기
    useEffect(() => {
      initKakao(); //
    }, []);
  
  //자바스크립트키로 카카오 init
    const initKakao = () => {
      if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
          kakao.init(process.env.REACT_APP_KAKAO_KEY);
        }
      }
    };
  
  //버튼을 누르면 실행되는 함수
    const shareKakao = () => {
  //이부분이 매우 헷갈림 여러 사이트를 참고했는데 이 sendDefault부분을 잘 봐야한다.
      window.Kakao.Link.sendDefault({ 
        objectType: 'feed',
        content: {
          title: `${isUserShare.title}`,
          // description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
          imageUrl: `${isUserShare.thumbnailURL}`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        social: {
          likeCount: isUserShare.likeNum,
          commentCount: isUserShare.commentNum,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    };
  
    return (
     
          <Wrap className="share-node" onClick={shareKakao}>
              <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png" alt="카카오공유" />
          </Wrap>
    );
  };
  
  const Wrap = styled.div`
    /* border: 1px solid; */
    img{
        border-radius: 50%;
        border: none;
        width: 48px;
        height: 48px;
        cursor: pointer;
    }
  
  
  `
  export default KakaoShare;