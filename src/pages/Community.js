import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../shared/axios";
import allCategory from "../assests/css/모두보기.webp";
import land from "../assests/css/내륙.webp";
import nearby from "../assests/css/관광지근처.webp";
import quietVil from "../assests/css/조용한마을.webp";
import udo from "../assests/css/우도.webp";
import nearBySea from "../assests/css/해변근처.webp";
import unlike from "../assests/css/whiteLike.webp";
import like from "../assests/css/likeIcon.webp";
import unlike2 from "../assests/css/unlikeIcon.webp";
import commentIcon from "../assests/css/commentIcon.webp";
import commentIcon2 from "../assests/css/commentIcon2.webp";
import nextIcon from "../assests/css/nextIcon2.webp";
import prevIcon from "../assests/css/prevIcon2.webp";
import editIcon from '../assests/css/editIcon.webp'
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { bestPostData, postData } from "../recoil/atoms";
import MetaTag from "./MetaTag";

const Community = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [category, setCategory] = useState("all");
  const [communityData, setCommunityData] = useRecoilState(postData);
  const [bestData, setBestData] = useRecoilState(bestPostData);
  const userId = sessionStorage.getItem("userId");
  const { data } = useQuery(
    ["content"],
    () =>
      instance
        .get("/post")
        .then((res) => {
          console.log(res.data);
          setBestData(res.data.Top5);
          setCommunityData(res.data.allPost);
          return res.data.allPost;
        }),
    {
      refetchOnWindowFocus: false, // 다른화면 갔다와도 재호출 안되게 함
    }
  );
  const Like = useMutation(
    ["Like"],
    (id) => instance.post(`/like/${id}`).then((res) => {
      // console.log(res.data)
      return res.data
    }),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("content");
      },
    }
  );
  // 좋아요 취소
  const unLike = useMutation(
    ["unLike"],
    (id) =>
      instance
        .delete(`/like/${id}/unlike`)
        .then((res) => {
          // console.log(res.data)
          return res.data
        }),
    {
      onSuccess: () => {
        // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
        queryClient.invalidateQueries("content");
      },
    }
  );

  const [count, setCount] = useState(0);
  return (
    <>
    <MetaTag title={'커뮤니티 | 멘도롱 제주'}></MetaTag>
      <Container>
        <Top
          rightImage={
            bestData[count < bestData.length - 1 ? count + 1 : 0]?.images[0]
              .thumbnailURL
          }
          leftImage={bestData[count]?.images[0].thumbnailURL}
        >
          <div className="leftImage">
            <Wrap>
              <img
                className="prevIcon"
                src={prevIcon}
                alt="이전"
                onClick={() => {
                  if (count <= 0) {
                    setCount((prev) => prev + 4);
                  } else {
                    setCount(count - 1);
                  }
                }}
              ></img>
              <h2>{bestData[count]?.title}</h2>
              <div className="wrap">
                <div className="user">
                  <img src={bestData[count]?.images[0].userImageURL} alt="프로필"></img>
                  <p>{bestData[count]?.user?.nickname}</p>
                </div>
                <div className="like">
                  <div>
                    <img src={unlike} alt="좋아요"></img>
                    <p>{bestData[count]?.likeNum}개</p>
                  </div>
                  <div>
                    <img src={commentIcon2} alt="공유"></img>
                    <p>{bestData[count]?.commentNum}개</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate(`/community/${bestData[count]?.postId}`);
                    }}
                  >
                    보러가기
                  </button>
                </div>
              </div>
            </Wrap>
          </div>
          <div className="rightImage">
            <img
              src={nextIcon}
              alt="다음"
              onClick={() => {
                if (count < bestData?.length - 1) {
                  setCount((prev) => prev + 1);
                } else {
                  setCount(0);
                }
              }}
            ></img>
            <h2>
              {bestData[count < bestData.length - 1 ? count + 1 : 0]?.title
                .length > 18
                ? bestData[
                    count < bestData.length - 1 ? count + 1 : 0
                  ].title.slice(0, 18)+"..."
                : bestData[count < bestData.length - 1 ? count + 1 : 0]?.title}
            </h2>
          </div>
        </Top>

        <Middle category={category}>
          <div
            className="all"
            onClick={() => {
              setCommunityData(data);
              setCategory("all");
            }}
          >
            <img src={allCategory} alt="모두보기"></img>
            <p>모두보기</p>
          </div>
          <div
            className="land"
            onClick={() => {
              setCommunityData(data.filter((v) => v.category === "내륙"));
              setCategory("land");
            }}
          >
            <img src={land} alt="내륙"></img>
            <p>내륙</p>
          </div>
          <div
            className="nearby"
            onClick={() => {
              setCommunityData(
                data.filter((v) => v.category === "관광지근처")
              );
              setCategory("nearby");
            }}
          >
            <img src={nearby} alt="관광지 근처"></img>
            <p>관광지 근처</p>
          </div>
          <div
            className="quietVil"
            onClick={() => {
              setCommunityData(
                data.filter((v) => v.category === "조용한마을")
              );
              setCategory("quietVil");
            }}
          >
            <img src={quietVil} alt="조용한 마을"></img>
            <p>조용한 마을</p>
          </div>
          <div
            className="udo"
            onClick={() => {
              setCommunityData(data.filter((v) => v.category === "우도"));
              setCategory("udo");
            }}
          >
            <img src={udo} alt="우도"></img>
            <p>우도</p>
          </div>
          <div
            className="nearBySea"
            onClick={() => {
              setCommunityData(data.filter((v) => v.category === "해변근처"));
              setCategory("nearBySea");
            }}
          >
            <img src={nearBySea} alt="해변 근처"></img>
            <p>해변 근처</p>
          </div>
        </Middle>
        <Bottom>
          {communityData.map((v) => (
            <Card key={v.postId}>
              <div className="leftContent">
                <div className="user">{v.user?.nickname}</div>
                <h1
                  className="title"
                  onClick={() => {
                    navigate(`/community/${v.postId}`);
                  }}
                >
                  {v.title}
                </h1>
                <div className="icon">
                  <div className="like">
                    {v.islike ? (
                      <img
                        onClick={() => {
                          if(userId){
                          unLike.mutate(v.postId);
                          }else{
                            navigate('/loginerror')
                          }
                        }}
                        src={like}
                        alt="좋아요"
                      />
                    ) : (
                      <img
                        onClick={() => {
                          if(userId){
                            Like.mutate(v.postId);
                            }else{
                              navigate('/loginerror')
                            }
                        }}
                        src={unlike2}
                        alt="좋아요"
                      />
                    )}

                    <p>{v.likeNum}</p>
                  </div>
                  <div className="comment">
                    <img src={commentIcon} alt="댓글" />
                    <p>{v.commentNum}</p>
                  </div>
                </div>
              </div>
              <img
                className="thumnail"
                src={v.images[0].thumbnailURL}
                alt="이미지"
              ></img>
            </Card>
          ))}
        </Bottom>
      </Container>
      {userId && 
      <Edit onClick={()=>{navigate('/userwrite')}}>
        <img src={editIcon} alt="글쓰기"/>
      </Edit>
}
      <Footer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  min-height: 100vh;
`;
const Top = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  margin: 40px 0 50px 0;
  overflow: hidden;

  .leftImage {
    width: 66%;
    height: 500px;
    border-radius: 20px;
    margin-right: 20px;
    position: relative;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      ),
      url(${(props) => props.leftImage});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    :hover {
      .prevIcon {
        display: flex;
      }
    }
  }
  .rightImage {
    /* width: 433px; */
    width: 32%;
    height: 500px;
    border-radius: 20px;
    /* border: 1px solid; */
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* align-items: center; */
    position: relative;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      ),
      url(${(props) => props.rightImage});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    overflow: hidden;
    :hover {
      img {
        display: flex;
      }
    }
    div {
      border: none;
      border-radius: 50%;
      margin-right: 20px;
      width: 50px;
      height: 50px;
      background-color: #f2f2f7;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      display: none;
      top: 50%;
      right: 10px;
      cursor: pointer;
    }
    h2 {
      color: white;
      width: 100%;
      overflow: hidden;
      /* white-space: nowrap; */
      text-overflow: ellipsis;
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 46px;
    }
    img {
      display: none;
      position: absolute;
      top: 40%;
      right: -10px;
      cursor: pointer;
    }
  }
`;
const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  /* justify-content: flex-end; */
  position: absolute;
  bottom: 0;
  padding: 0 26px 30px 30px;
  /* border: 1px solid black; */
  color: white;
  white-space: nowrap;
  .prevIcon {
    position: absolute;
    bottom: 180px;
    left: -10px;
    display: none;
    cursor: pointer;
  }
  h2 {
    font-weight: 700;
    font-size: 32px;
    line-height: 46px;
    margin-bottom: 20px;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
  }
  .user {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    width: 30%;
    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      margin-right: 10px;
    }
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 35px;
    }
  }
  .like {
    width: 53%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 40px;
      p {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 29px;
      }
      img {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
    }
    button {
      width: 51%;
      /* width: 200px; */
      height: 56px;
      border-radius: 16px;
      border: none;
      font-weight: 700;
      font-size: 21px;
      line-height: 30px;
      background-color: white;
      color: #636366;
      cursor: pointer;
    }
  }
`;
const Middle = styled.div`
  width: 100%;
  padding: 0 280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5ea;
  div {
    /* border: 1px solid; */
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    :hover {
      /* border-bottom: 5px solid #8E8E93; */
      * {
        opacity: 1;
      }
    }
    img {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      opacity: 0.2;
    }
    p {
      margin-top: 5px;
      color: #828282;
      text-align: center;
      opacity: 0.2;
    }
  }
  .${(props) => props.category} {
    border-bottom: 5px solid #8e8e93;
    * {
      opacity: 1;
    }
  }
`;
const Bottom = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;
`;
const Card = styled.div`
  width: 100%;
  height: 362px;
  padding-bottom: 30px;
  border-bottom: 2px solid #e5e5ea;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  cursor: pointer;
  :hover {
    .title {
      text-decoration: underline;
    }
    .thumnail {
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
      /* transition: transform 0.2s; */
      /* transition-property: transform;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      transition-delay: 0s; */
    }
  }
  .leftContent {
    /* height: 100%; */
    width: 60%;
    position: relative;
  }
  .user {
    color: #aeaeb2;
    margin-bottom: 28px;
    font-weight: 600;
    font-size: 27px;
    line-height: 32px;
  }
  .title {
    margin-bottom: 35px;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 43px;
  }
  .icon {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    .like {
      display: flex;
      flex-direction: row;
      margin-right: 40px;
      img {
        width: 32px;
        height: 32px;
      }
      p {
        margin-left: 12px;
        font-style: normal;
        font-weight: 400;
        font-size: 27px;
        line-height: 32px;
        color: #aeaeb2;
      }
    }
    .comment {
      display: flex;
      flex-direction: row;
      img {
        width: 32px;
        height: 32px;
      }
      p {
        margin-left: 12px;
        font-style: normal;
        font-weight: 400;
        font-size: 27px;
        line-height: 32px;
        color: #aeaeb2;
      }
    }
  }
  .thumnail {
    border: none;
    width: 39%;
    border-radius: 20px;
    object-fit: cover;
  }
`;
const Edit = styled.div`
  width: 80px;
  height: 80px ;
  /* border: 1px solid; */
  border-radius: 50%;
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2A7047;
  cursor: pointer;
  z-index: 1;
  img{
    width: 50px;
    height: 50px;
  }

`
export default Community;
