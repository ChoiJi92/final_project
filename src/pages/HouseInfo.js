import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import styled, { css } from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import allCategory from "../assests/css/모두보기.webp";
import land from "../assests/css/내륙.webp";
import nearby from "../assests/css/관광지근처.webp";
import quietVil from "../assests/css/조용한마을.webp";
import udo from "../assests/css/우도.webp";
import nearBySea from "../assests/css/해변근처.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SlideImg from "../components/SlideImg";
import saveIcon from "../assests/css/saveIcon.webp";
import unsaveIcon2 from "../assests/css/unsaveIcon2.webp";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { hostData } from "../recoil/atoms";
import instance from "../shared/axios";
import KakaoMap from "../components/KakaoMap";
import Footer from "../components/Footer";
import MetaTag from "./MetaTag";

const HouseInfo = () => {
  // const [leftPosition, setLeftPosition] = useState("");
  // const [rigthPosition, setRigthPosition] = useState("");
  // const [fleftPosition, setFLeftPosition] = useState("");
  // const [frigthPosition, setFRigthPosition] = useState("");

  // const [secondPosition, setSecondPosition] = useState("");
  // const [sRigthPosition, setSRigthPosition] = useState("");
  // const [sFleftPosition, setSFLeftPosition] = useState("");
  // const [sFrigthPosition, setSFRigthPosition] = useState("");

  // const [firstUnderbar, setFirstUnderbar] = useState(false);
  // const [secondUnderbar, setSecondtUnderbar] = useState(false);

  // const liveCozy = useRef(null);
  // const liveBudget = useRef(null);

  // const liveUnderlineRef = useRef(null);
  // const spotUnderlineRef = useRef(null);
  // // const firstBox = useRef(null);
  // const liveFirstBox = useRef(null);
  const location = useLocation();
  // console.log(location.state.address)
  const [isCozy, setIsCozy] = useState("cozy");
  const [isHostData, setIsHostData] = useRecoilState(hostData);
  const [address, setAddress] = useState(
    location.state?.address ? location.state?.address : ""
  );
  const [type, setType] = useState("");
  const userId = localStorage.getItem("userId");

  const [category, setCategory] = useState(
    location.state?.category ? location.state?.category : "all"
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery(
    ["houseInfo"],
    () =>
      instance
        .get(`/host`)
        .then((res) => {
          // console.log(res.data);
          if (category === "all") {
            setIsHostData(res.data.findAllAcc);
          } else {
            setIsHostData(
              res.data.findAllAcc.filter((v) => v.category === category)
            );
          }
          return res.data;
        })
        .catch((err) => {
          // console.log(err);
        }),
    {
      refetchOnWindowFocus: false,
      // onSuccess: (data) => {
      //   setIsHostData(data);
      // },
    }
  );

  const addressChange = (e) => {
    // console.log(e.target.value);
    setAddress(e.target.value);
  };

  const addressData = useQuery(
    ["addressData", address],
    () =>
      instance
        .get(`/host/address/search`, { params: { search: address } })
        .then((res) => {
          // console.log(res.data, "지역검색");
          setIsHostData(res.data.hostPost);
        })
        .catch((err) => {
          // console.log(err)
        }),
    {
      enabled: !!address,
      refetchOnWindowFocus: false,
    }
  );
  const typeChange = (e) => {
    console.log(e.target.value);
    setType(e.target.value);
  };
  const typeData = useQuery(
    ["typeData", type],
    () =>
      instance
        .get(`/host/type/search`, { params: { search: type } })
        .then((res) => {
          // console.log(res.data, "숙소형태검색");
          setIsHostData(res.data.housebyType);
        })
        .catch((err) => {
          // console.log(err)
        }),
    {
      enabled: !!type,
      refetchOnWindowFocus: false,
    }
  );
  const savePost = useMutation(
    ["save"],
    (id) =>
      instance
        .post(`/save/${id}`)
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          // console.log(err, "why");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houseInfo");
      },
    }
  );
  const saveDelete = useMutation(
    ["save"],
    (id) =>
      instance
        .delete(`/save/${id}/unsave`)
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          // console.log(err, "why");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houseInfo");
      },
    }
  );

  const saveClick = (id) => {
    if(userId){
      savePost.mutate(id);
    }else{
      navigate("/loginerror")
    }
    // saveDelete.mutate(id)
  };

  const cancelSaveClick = (id) => {
    if(userId){
      saveDelete.mutate(id);
    }else{
      navigate("/loginerror")
    }
  };

  // useEffect(() => {
  //   // autoSpotClick();
  //   autoLiveClick();
  // }, []);
  // const autoSpotClick = () => {
  //   spotUnderlineRef.current.style.left = firstBox.current.offsetLeft + "px";
  //   spotUnderlineRef.current.style.width = firstBox.current.offsetWidth + "px";
  //   setFLeftPosition(firstBox.current.offsetLeft + "px");
  //   setFRigthPosition(firstBox.current.offsetWidth + "px");
  // };
  // 클릭시 메뉴 언더바 이동
  // const menuOnClick = (e) => {
  //   spotUnderlineRef.current.style.left = e.currentTarget.offsetLeft + "px";
  //   spotUnderlineRef.current.style.width = e.currentTarget.offsetWidth + "px";
  //   setLeftPosition(e.currentTarget.offsetLeft + "px");
  //   setRigthPosition(e.currentTarget.offsetWidth + "px");
  //   setFirstUnderbar(true);
  // };

  //마우스 올릴시 메뉴 언더바 이동

  // const autoLiveClick = () => {
  //   liveUnderlineRef.current.style.left =
  //     liveFirstBox.current.offsetLeft + "px";
  //   liveUnderlineRef.current.style.width =
  //     liveFirstBox.current.offsetWidth + "px";
  //   setSFLeftPosition(liveFirstBox.current.offsetLeft + "px");
  //   setSFRigthPosition(liveFirstBox.current.offsetWidth + "px");
  //   liveCozy.current.style.fontWeight = "bolder";
  // };

  // const liveOnLeave = () => {
  //   if (secondUnderbar === true) {
  //     liveUnderlineRef.current.style.left = secondPosition;
  //     liveUnderlineRef.current.style.width = sRigthPosition;
  //   } else {
  //     liveUnderlineRef.current.style.left = sFleftPosition;
  //     liveUnderlineRef.current.style.width = sFrigthPosition;
  //   }
  // };
  // const liveOnOver = (e) => {
  //   liveUnderlineRef.current.style.left = e.currentTarget.offsetLeft + "px";
  //   liveUnderlineRef.current.style.width = e.currentTarget.offsetWidth + "px";
  // };
  // const liveOnClick = (e) => {
  //   liveUnderlineRef.current.style.left = e.currentTarget.offsetLeft + "px";
  //   liveUnderlineRef.current.style.width = e.currentTarget.offsetWidth + "px";
  //   console.log(e.target.innerText);
  //   // console.log(liveCozy.current.style.fontWeight)

  //   if (e.target.innerText === "편하게 한달 살기") {
  //     liveBudget.current.style.fontWeight = "";
  //     liveCozy.current.style.fontWeight = "bolder";
  //   } else {
  //     liveCozy.current.style.fontWeight = "";
  //     liveBudget.current.style.fontWeight = "bolder";
  //   }
  //   // liveCozy.current.style.fontWeight = "bolder"
  //   // liveBudget.current.style.fontWeight = "bolder"
  //   setSecondPosition(e.currentTarget.offsetLeft + "px");
  //   setSRigthPosition(e.currentTarget.offsetWidth + "px");
  //   setSecondtUnderbar(true);
  // };
  return (
    <>
      <MetaTag title={"숙소찾기 | 멘도롱 제주"}></MetaTag>
      <MainBox>
        <LiveMainBox isCozy={isCozy}>
          <div
            className="cozy"
            onClick={() => {
              setIsCozy("cozy");
              setIsHostData(data.findAllAcc);
            }}
          >
            편하게 한달 살기
          </div>
          <div
            className="uncozy"
            onClick={() => {
              setIsHostData(
                data.findAllAcc.filter((v) => v.houseInfo === "게스트하우스")
              );
              setIsCozy("uncozy");
            }}
          >
            최소비용으로 한달 살기
          </div>
          {/* <LiveUnderBar ref={liveUnderlineRef} /> */}
        </LiveMainBox>
        <SpotMainBox category={category}>
          <div
            // ref={firstBox}
            className="all"
            onClick={() => {
              setIsHostData(data.findAllAcc);
              setCategory("all");
            }}
            id="spot"
          >
            <img src={allCategory} alt="모두보기" />
            <span>모두보기</span>
            {/* <SpotUnderBar ref={spotUnderlineRef} /> */}
          </div>
          <div
            className="내륙"
            // onClick={menuOnClick}
            onClick={() => {
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "내륙")
              );
              setCategory("내륙");
            }}
            id="spot"
            // style={{"opacity":"0.3"}}
          >
            <img src={land} alt="내륙" />
            <span>내륙</span>
          </div>
          <div
            className="관광지근처"
            // onClick={menuOnClick}
            onClick={() => {
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "관광지근처")
              );
              setCategory("관광지근처");
            }}
            id="spot"
          >
            <img src={nearby} alt="관광지 근처" />
            <span>관광지 근처</span>
          </div>
          <div
            className="조용한마을"
            // onClick={menuOnClick}
            onClick={() => {
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "조용한마을")
              );
              setCategory("조용한마을");
            }}
            id="spot"
          >
            <img src={quietVil} alt="조용한 마을" />

            <span>조용한 마을</span>
          </div>
          <div
            className="우도"
            // onClick={menuOnClick}
            onClick={() => {
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "우도")
              );
              setCategory("우도");
            }}
            id="spot"
          >
            <img src={udo} alt="우도" />

            <span>우도</span>
          </div>
          <div
            className="해변근처"
            // onClick={menuOnClick}
            onClick={() => {
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "해변근처")
              );
              setCategory("해변근처");
            }}
            id="spot"
          >
            <img src={nearBySea} alt="해변근처" />

            <span>해변근처</span>
          </div>
        </SpotMainBox>

        <div id="contentsMapBox">
          <ContentsBox>
            <OrderingBox>
              <StyleSelect
                style={{
                  width: "30%",
                  height: "60px",
                  borderRadius: "20px",
                  underline: "none",
                  color:'#828282'
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={""}
                onChange={typeChange}
              >
                <MenuItem value="" disabled={true}>
                  숙소형태
                </MenuItem>
                <MenuItem value="게스트하우스">게스트하우스</MenuItem>
                <MenuItem value="펜션">펜션</MenuItem>
                <MenuItem value="한옥">한옥</MenuItem>
                <MenuItem value="오피스텔/아파트">오피스텔/아파트</MenuItem>
              </StyleSelect>

              <Select
                style={{
                  width: "30%",
                  height: "60px",
                  borderRadius: "20px",
                  backgroundColor: "#f7f3ef",
                  border: "none",
                  color:'#828282'
                }}
                displayEmpty
                inputProps={{
                  "aria-label": "Without label",
                }}
                defaultValue={address}
                onChange={addressChange}
              >
                <MenuItem value="" disabled={true}>
                  위치별
                </MenuItem>
                <MenuItem value="Eastarea">동쪽</MenuItem>
                <MenuItem value="Westarea">서쪽</MenuItem>
                <MenuItem value="Southarea">남쪽</MenuItem>
                <MenuItem value="Northarea">북쪽</MenuItem>
              </Select>

              <Select
                style={{
                  width: "30%",
                  height: "60px",
                  borderRadius: "20px",
                  backgroundColor: "#f7f3ef",
                  color:'#828282'
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={""}
              >
                <MenuItem value="" disabled={true}>
                  최신순
                </MenuItem>
                {/* <MenuItem value="별점순">별점순</MenuItem> */}
              </Select>
            </OrderingBox>
            <div
              style={{ fontSize: "22px", marginBottom: "18px" }}
              id="houseCount"
            >
              {isHostData.length} 개의 숙소
            </div>
            <ListWrap>
              {isHostData.map((item, idx) => {
                return (
                  // <div id="testBox">
                  <ContentsListBox key={idx}>
                    <SlideImg
                      item={item.images}
                      width={"36.4%"}
                      height={"220px"}
                    />
                    <DesBox>
                      <StyledLink to={`/house/${item.hostId}`}>
                        <h2>{item.title}</h2>
                      </StyledLink>
                      <div id="infoHouse">
                        <span>
                          {item.hostContent.length > 50
                            ? `${item.hostContent.slice(0, 50)}...`
                            : item.hostContent}
                        </span>
                      </div>
                      <LikeBox>
                        <div >
                          <StarIcon />
                          <span
                            style={{
                              margin: "5px 0px 3px 20px",
                              fontSize: "27px",
                            }}
                          >
                            {item.average.toFixed(1)}
                          </span>
                        </div>
                        {item.isSave ? (
                          <SaveImg
                            src={saveIcon}
                            onClick={() => {
                              cancelSaveClick(item.hostId);
                            }}
                          />
                        ) : (
                          <SaveImg
                            src={unsaveIcon2}
                            onClick={() => {
                              saveClick(item.hostId);
                            }}
                          />
                        )}
                      </LikeBox>
                    </DesBox>
                  </ContentsListBox>
                  // </div>
                );
              })}
            </ListWrap>
          </ContentsBox>
          <MapBox>
            <KakaoMap isinfo={"isinfo"} data={isHostData} height={"85%"} />
          </MapBox>
        </div>
      </MainBox>
      <Footer />
    </>
  );
};

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  #contentsMapBox {
    display: flex;
  }
`;

const SpotMainBox = styled.div`
  width: 100%;
  height: 120px;
  border-top: 1px solid #e5e5ea;
  border-bottom: 1px solid #e5e5ea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 243px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 13%;
    margin-left: 40px;
    /* border: 1px solid red; */
    /* border-bottom: 4px solid red; */
    height: 120px;
    :hover {
      * {
        opacity: 1;
      }
    }
    span {
      text-align: center;
      margin-top: 5px;
      /* margin-right: 16px; */
      font-size: 100%;
      opacity: 0.2;
      color: #828282;
    }
    img {
      width: 52px;
      height: 52px;
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
// const SpotUnderBar = styled.div`
//   position: absolute;
//   height: 4px;
//   background-color: #bdc3c7;
//   transition: 0.5s;
//   top: 295px;
// `;

// const LiveUnderBar = styled.div`
//   position: absolute;
//   height: 4px;
//   transition: 0.5s;
//   top: 176px;
//   background-color: #bdc3c7;
// `;

// const SpotMiniBox = styled.div`
//   width: 40%;
//   height: 40px;
//   border: 1px solid blue;
//   img {
//     width: 52px;
//     height: 52px;
//   }
// `;

const LiveMainBox = styled.div`
  width: 70%;
  height: 80px;
  display: flex;
  /* padding: 0px 255px; */
  align-items: center;
  margin: 0 auto;
  div {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 63px;
    cursor: pointer;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 35px;
    color: #636366;
    :hover {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 35px;
      color: #636366;
    }
  }
  .${(props) => props.isCozy} {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;
    color: #636366;
    border-bottom: 5px solid #8e8e93;
  }
`;

const ContentsBox = styled.div`
  width: 35%;
  height: 90vh;
  margin-left: 280px;
  /* margin-right: 10px; */
  display: flex;
  flex-direction: column;
  /* #testBox{
        margin-right: 10px;
        margin-top: 10px;
    } */
  #houseCount {
    margin: 15px 0px 0px 15px;
  }
`;
const ListWrap = styled.div`
  /* border: 1px solid red; */
  overflow-y: auto;
  padding: 0 10px;
`;
const OrderingBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 20px 10px;
  /* border: 1px solid red; */
  div {
    /* width: 30%; */
    height: 50px;
    /* border: 1px solid blue; */
    margin: 0px 15px 0px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 21px;
    /* background-color: #f7f3ef; */
  }
`;

const StyleSelect = styled(Select)`
  height: 60px;
  /* border: 1px solid blue; */
  border: none;
  outline: none;
  margin: 0px 15px 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 21px;
  background-color: #f7f3ef;
  color: #828282;
`;

const ContentsListBox = styled.div`
  height: 260px;
  display: flex;
  background: #fdfcfb;
  box-shadow: 0px 12px 42px #eee9e4;
  border-radius: 20px;
  width: 99%;
  margin-bottom: 20px;
  align-items: center;
  padding: 20px;
`;
const DesBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  width: 100%;
  height: 220px;
  margin-left: 20px;
  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;
    color: #828282;
    :hover{
      color: #3498db;
    }
  }
  span {
    margin-bottom: 10px;
  }
  #infoHouse {
    height: 200px;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    color: #828282;
  }
`;
const LikeBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  div {
    display: flex;
    align-items: center;
  }
`;

const SaveImg = styled.img`
  cursor: pointer;
`;

const StarIcon = styled(FaStar)`
  font-size: 25px;
  color: #2a7047;
`;

const MapBox = styled.div`
  width: 50%;
  height: 90vh;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  position: relative;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  :hover {
    color: #3498db;
  }
`;

export default HouseInfo;


