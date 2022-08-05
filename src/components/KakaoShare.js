import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {hostShareAndMap } from "../recoil/atoms";

const KakaoShare = ({ data }) => {
  const isHostShare = useRecoilValue(hostShareAndMap);
  const url = window.location.href;
  useEffect(() => {
    initKakao(); 
  }, []);

  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
    }
  };

  const shareKakao = () => {
    
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${data? data.title : isHostShare.findAllAcc.title}`,
          description: `${data ? data.tagList : isHostShare.findAllAcc.tagList}`,
          imageUrl: `${data ? data.images[0].postImageURL : isHostShare.findAllAcc.images[0].postImageURL }`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        social: {
          likeCount: data ? data.likeNum : 0 ,
          commentCount: data  ? data.commentNum :0 ,
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          {
            title: "앱으로 보기",
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
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오공유"
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  img {
    border-radius: 50%;
    border: none;
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
`;
export default KakaoShare;
