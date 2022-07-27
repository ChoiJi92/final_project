import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import inside from "../assests/css/내륙.webp";
import nearby from "../assests/css/관광지근처.webp";
import nearbySea from "../assests/css/해변근처.webp";
import quietVil from "../assests/css/조용한마을.webp";
import icecream from "../assests/css/icecream.webp";
import sunrise from "../assests/css/sunrise.webp";
import { Link, useNavigate } from "react-router-dom";
import SlideImg from "../components/SlideImg";
import saveIcon from "../assests/css/saveIcon.webp";
import unsaveIcon2 from "../assests/css/unsaveIcon2.webp";
import Map from "../components/Map";
import { useQuery,useMutation,useQueryClient } from "react-query";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { hostData } from "../recoil/atoms";
import FormControl from '@mui/material/FormControl';
import instance from "../shared/axios";
import TestMap2 from "../components/TestMap2";

const HouseInfo = () => {
  const [leftPosition, setLeftPosition] = useState("");
  const [rigthPosition, setRigthPosition] = useState("");
  const [fleftPosition, setFLeftPosition] = useState("");
  const [frigthPosition, setFRigthPosition] = useState("");
  
  const [secondPosition, setSecondPosition] = useState("");
  const [sRigthPosition, setSRigthPosition] = useState("");
  const [sFleftPosition, setSFLeftPosition] = useState("");
  const [sFrigthPosition, setSFRigthPosition] = useState("");

  const [firstUnderbar, setFirstUnderbar] = useState(false);
  const [secondUnderbar, setSecondtUnderbar] = useState(false);

  const liveCozy = useRef(null);
  const liveBudget = useRef(null);

  const liveUnderlineRef = useRef(null);
  const spotUnderlineRef = useRef(null);
  // const firstBox = useRef(null);
  const liveFirstBox = useRef(null);

  const [isHostData, isSetHostData] = useRecoilState(hostData);

  const userId = localStorage.getItem("userId");

  const [category, setCategory] = useState("all");
  // const { data } = useQuery(
  //   ["houseInfo"],

  //   // ()=>getWriteData(paramsId),
  //   () => {
  //     return instance
  //       .get(`/host`)
  //       .then((res) => res.data);
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );
  const queryClient = useQueryClient();
  const { data } = useQuery(
    ["houseInfo"],
    () =>
      instance
        .get(`/host`,{ params: { userId: Number(userId) } })
        .then((res) => {
          console.log(res.data);
          return (
            res.data
          );
        })
        .catch((err) => {
          console.log(err);
        }),
        {
          refetchOnWindowFocus: false,
          onSuccess: (data) => {
            isSetHostData(data);
            
          },
        },
    
  );
  const savePost = useMutation(
    ["save"],(id) =>
      instance
        .post(`/save/${id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err, "why");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houseInfo");
      },
    }
  );      
  const saveDelete = useMutation(
    ["save"],(id) =>
      instance
        .delete(`/save/${id}/unsave`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err, "why");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houseInfo");
      },
    }
  );
  
  const saveClick = (id) => {
    savePost.mutate(id)
    // saveDelete.mutate(id)
    console.log(id)
  }

  const cancelSaveClick = (id) => {
    saveDelete.mutate(id)
  }

  useEffect(() => {
    // autoSpotClick();
    autoLiveClick();
  }, []);
  // const autoSpotClick = () => {
  //   spotUnderlineRef.current.style.left = firstBox.current.offsetLeft + "px";
  //   spotUnderlineRef.current.style.width = firstBox.current.offsetWidth + "px";
  //   setFLeftPosition(firstBox.current.offsetLeft + "px");
  //   setFRigthPosition(firstBox.current.offsetWidth + "px");
  // };
  // 클릭시 메뉴 언더바 이동
  const menuOnClick = (e) => {
    spotUnderlineRef.current.style.left = e.currentTarget.offsetLeft + "px";
    spotUnderlineRef.current.style.width = e.currentTarget.offsetWidth + "px";
    setLeftPosition(e.currentTarget.offsetLeft + "px");
    setRigthPosition(e.currentTarget.offsetWidth + "px");
    setFirstUnderbar(true);
  };

  //마우스 올릴시 메뉴 언더바 이동
  

  const autoLiveClick = () => {
    liveUnderlineRef.current.style.left =
      liveFirstBox.current.offsetLeft + "px";
    liveUnderlineRef.current.style.width =
      liveFirstBox.current.offsetWidth + "px";
    setSFLeftPosition(liveFirstBox.current.offsetLeft + "px");
    setSFRigthPosition(liveFirstBox.current.offsetWidth + "px");
    liveCozy.current.style.fontWeight = "bolder";
  };

  const liveOnLeave = () => {
    if (secondUnderbar === true) {
      liveUnderlineRef.current.style.left = secondPosition;
      liveUnderlineRef.current.style.width = sRigthPosition;
    } else {
      liveUnderlineRef.current.style.left = sFleftPosition;
      liveUnderlineRef.current.style.width = sFrigthPosition;
    }
  };
  const liveOnOver = (e) => {
    liveUnderlineRef.current.style.left = e.currentTarget.offsetLeft + "px";
    liveUnderlineRef.current.style.width = e.currentTarget.offsetWidth + "px";
  };
  const liveOnClick = (e) => {
    liveUnderlineRef.current.style.left = e.currentTarget.offsetLeft + "px";
    liveUnderlineRef.current.style.width = e.currentTarget.offsetWidth + "px";
    console.log(e.target.innerText);
    // console.log(liveCozy.current.style.fontWeight)

    if (e.target.innerText === "편하게 한달 살기") {
      liveBudget.current.style.fontWeight = "";
      liveCozy.current.style.fontWeight = "bolder";
    } else {
      liveCozy.current.style.fontWeight = "";
      liveBudget.current.style.fontWeight = "bolder";
    }
    // liveCozy.current.style.fontWeight = "bolder"
    // liveBudget.current.style.fontWeight = "bolder"
    setSecondPosition(e.currentTarget.offsetLeft + "px");
    setSRigthPosition(e.currentTarget.offsetWidth + "px");
    setSecondtUnderbar(true);
  };

  return (
    <MainBox>
      <LiveMainBox>
        <div
          ref={liveFirstBox}
          onMouseLeave={liveOnLeave}
          onMouseOver={liveOnOver}
          onClick={liveOnClick}
          id="live"
        >
          <p ref={liveCozy} onClick={liveOnClick}>
            편하게 한달 살기
          </p>
        </div>
        <div
          onMouseLeave={liveOnLeave}
          onMouseOver={liveOnOver}
          onClick={liveOnClick}
          id="live1"
        >
          <p ref={liveBudget}>최소비용으로 한달 살기</p>
        </div>
        <LiveUnderBar ref={liveUnderlineRef} />
      </LiveMainBox>
      <SpotMainBox category={category}>
        <div
          // ref={firstBox}
          className="all"
          onClick={() => {
            // isSetHostData(data)
            setCategory("all")
          }}
          id="spot"
        >
            <img src={nearbySea} alt="모두보기" />
          <span>모두보기</span>
          {/* <SpotUnderBar ref={spotUnderlineRef} /> */}
        </div>
        <div
        className="land"
          // onClick={menuOnClick}
          onClick={() => {
            // isSetHostData(data.filter((v) => v.category === "내륙"))
            setCategory("land")
          }}
          id="spot"
          // style={{"opacity":"0.3"}}
        >
            <img src={inside} alt="내륙" />
          <span>내륙</span>
        </div>
        <div
        className="tour"
          // onClick={menuOnClick}
          onClick={() => {
            // isSetHostData(data.filter((v) => v.category === "관광지 근처"))
            setCategory("tour")
          }}
          id="spot"
        >
            <img src={nearby} alt="관광지근처" />
          <span>관광지 근처</span>
        </div>
        <div
          className="town"
          // onClick={menuOnClick}
          onClick={() => {
            // isSetHostData(data.filter((v) => v.category === "조용한 마을"))
            setCategory("town")
          }}
          id="spot"
        >
     
            <img src={quietVil} alt="조용한 마을" />
       
          <span>조용한 마을</span>
        </div>
        <div
        className="icecream"
        
          // onClick={menuOnClick}
          onClick={() => {
            // isSetHostData(data.filter((v) => v.category === "우도"))
            setCategory("icecream")
          }}
          id="spot"
        >
         
            <img src={icecream} alt="우도" />
      
          <span>우도</span>
        </div>
        <div
          className="sunrise"
          // onClick={menuOnClick}
          onClick={() => {
            // isSetHostData(data.filter((v) => v.category === "해변근처"))
            setCategory("sunrise")
          }}
          id="spot"
        >
          
            <img src={sunrise} alt="해변근처" />
          
          <span>해변근처</span>
        </div>
      </SpotMainBox>

      <div id="contentsMapBox">
        <ContentsBox>
          <OrderingBox>
            
              <StyleSelect
                style={{ width: "30%", height: "50px", borderRadius: "10px",underline:"none"  }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={""}
              >
                <MenuItem value="" disabled={true}>
                  숙소형태
                </MenuItem>
                <MenuItem value="단독 또는 다세대">단독</MenuItem>
                <MenuItem value="호텔">호텔</MenuItem>
                <MenuItem value="관광지 근처">관광지 근처</MenuItem>
                <MenuItem value="조용한 마을">조용한 마을</MenuItem>
                <MenuItem value="우도">우도</MenuItem>
                <MenuItem value="성산일출봉">성산일출봉</MenuItem>
              </StyleSelect>
      
            
              <Select
                style={{ width: "30%", height: "50px", borderRadius: "10px",backgroundColor:"#f7f3ef", border:"none" }}
                displayEmpty
                inputProps={{ "aria-label": "Without label",disableUnderline: true }}
                defaultValue={""}

              >
                <MenuItem value="" disabled={true}>
                  위치별
                </MenuItem>
                <MenuItem value="east">동쪽</MenuItem>
                <MenuItem value="west">서쪽</MenuItem>
                <MenuItem value="south">남쪽</MenuItem>
                <MenuItem value="north">북쪽</MenuItem>
              </Select>
            
              <Select
                style={{ width: "30%", height: "50px", borderRadius: "10px",backgroundColor:"#f7f3ef" }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={""}
              >
                <MenuItem value="" disabled={true}>
                  추천순
                </MenuItem>
                <MenuItem value="별점순">별점순</MenuItem>
  
              </Select>
          </OrderingBox>
          <div
            style={{ fontSize: "22px", marginBottom: "18px" }}
            id="houseCount"
          >
            {data.findAllAcc.length} 개의 숙소
          </div>
          <ListWrap>
            {data.findAllAcc.map((item, idx) => {
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
                        한달살기의 조건에 관한 설명 ...한달살기의 조건에 관한
                        설명 ...한달살기의 조건에 관한 설명 ...
                      </span>
                    </div>
                    <LikeBox>
                      <div style={{}}>
                        <StarIcon />
                        <span
                          style={{
                            margin: "5px 0px 3px 20px",
                            fontSize: "27px",
                          }}
                        >
                          4.0
                        </span>
                      </div>
                      {item.isSave ? (
                      <SaveImg
                      src={saveIcon}
                        onClick={() => {
                          cancelSaveClick(item.hostId);
                        }}
                      />) : (
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
          <TestMap2 isinfo={"isinfo"} data={data.findAllAcc} />
        </MapBox>
      </div>
    </MainBox>
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
  #spot {
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
    :hover{
      *{
        opacity: 1;
      }
    }
    
    /* margin-top: 10px; */
    
  }
  span {
    text-align: center;
    margin-top: 5px;
    /* margin-right: 16px; */
    font-size: 100%;
    opacity: 0.2;
  }
  img{
      width: 52px;
      height: 52px;
      opacity: 0.2;
    }
  .${(props) => props.category} {
    border-bottom: 5px solid #8e8e93;
    * {
      opacity: 1;
    }
  }
`;
const SpotUnderBar = styled.div`
  position: absolute;
  height: 4px;
  background-color: #bdc3c7;
  transition: 0.5s;
  top: 295px;
  
`;

const LiveUnderBar = styled.div`
  position: absolute;
  height: 4px;
  transition: 0.5s;
  top: 176px;
  background-color: #bdc3c7;
`;

const SpotMiniBox = styled.div`
  width: 40%;
  height: 40px;
  border: 1px solid blue;
  img {
    width: 52px;
    height: 52px;
  }
`;

const LiveMainBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0px 255px;
  align-items: center;
  div {
    cursor: pointer;
  }
  p {
    font-size: 30px;
  }
  #live {
    margin-left: 35px;
  }
  #live1 {
    margin-left: 40px;
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
  height: 50px;
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
`

const ContentsListBox = styled.div`
  height: 260px;
  display: flex;
  box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.12);
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
  span {
    margin-bottom: 10px;
  }
  #infoHouse {
    height: 200px;
    display: flex;
    align-items: center;
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
`

const StarIcon = styled(FaStar)`
  font-size: 25px;
  color: #2A7047;
`;

const MapBox = styled.div`
  width: 50%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

// {isList.slice(0,4).map((item, idx)=>(
//     <ContentsListBox ref={contentsBox} key={idx}>
//         <SlideImg listImg={listImg}/>
//         <DesBox>
//             <StyledLink to={`/house/${idx}`}>
//             <h3>해변근처의 게스트하우스ㅁㅁㅁ</h3>
//             </StyledLink>
//             <div id="infoHouse">
//             <span>한달살기의 조건에 관한 설명 ...한달살기의 조건에 관한 설명 ...
//             한달살기의 조건에 관한 설명 ...
//             </span>
//             </div>
//             <span>000,000원 1박</span>
//             <LikeBox>
//                 <StarIcon/>
//                 <HeartIcon onClick={()=>{onClick(isList[idx])}}/>
//             </LikeBox>
//         </DesBox>
//     </ContentsListBox>
// )
// )}
// {/* <AdContentsBox>
//     <div><span>이런 숙소는 어때요?</span></div>
//     <div id="adImg">
//         <img src={jeju1}/>
//         <img src={jeju2}/>
//         <img src={jeju3}/>

//     </div>
// </AdContentsBox> */}
// {isList.slice(5).map((item, idx)=>(
//     <ContentsListBox ref={contentsBox} key={idx}>
//     <SlideImg listImg={listImg}/>
//     <DesBox>
//         <StyledLink to={`/house/${idx}`}>
//         <h3>해변근처의 게스트하우스ㅁㅁㅁ</h3>
//         </StyledLink>
//         <div id="infoHouse">
//         <span>한달살기의 조건에 관한 설명 ...한달살기의 조건에 관한 설명 ...
//         한달살기의 조건에 관한 설명 ...
//         </span>
//         </div>
//         <span>000,000원 1박</span>
//         <LikeBox>
//             <StarIcon/>
//             <HeartIcon onClick={()=>{onClick(isList[idx])}}/>
//         </LikeBox>
//     </DesBox>
// </ContentsListBox>
// ))}
// </ContentsBox>
