import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled  from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import allCategory from "../assests/css/images/모두보기.webp";
import land from "../assests/css/images/내륙.webp";
import nearby from "../assests/css/images/관광지근처.webp";
import quietVil from "../assests/css/images/조용한마을.webp";
import udo from "../assests/css/images/우도.webp";
import nearBySea from "../assests/css/images/해변근처.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SlideImg from "../components/SlideImg";
import saveIcon from "../assests/css/images/saveIcon.webp";
import unsaveIcon2 from "../assests/css/images/unsaveIcon2.webp";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRecoilState} from "recoil";
import { hostData} from "../recoil/atoms";
import instance from "../shared/axios";
import KakaoMap from "../components/KakaoMap";
import Footer from "../components/Footer";
import MetaTag from "./MetaTag";
import LoginModal from "../components/LoginModal";

const HouseInfo = () => {
  //로그인 안 할시 로그인 모달창 오픈
  const [open, setOpen] = useState(false);

  window.history.replaceState({}, document.title)
  const location = useLocation();
  const [isCozy, setIsCozy] = useState("cozy");
  const [isHostData, setIsHostData] = useRecoilState(hostData);
  const [address, setAddress] = useState(
    location.state?.address ? location.state?.address : ""
  );
  const [search, setSearch] = useState(
    location.state?.search ? location.state?.search : ""
  );
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const userId = sessionStorage.getItem("userId");

  const [category, setCategory] = useState(
    location.state?.category ? location.state?.category : "all"
  );

  const { data } = useQuery(
    ["houseInfo",address],
    () =>
      instance
        .get(`/host`)
        .then((res) => {
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
        }),
    {
      enabled:!address,
      refetchOnWindowFocus: false,
    }
  );
  const searchData = useQuery(
    ["searchData", search],
    () =>
      instance
        .get(`/host/search`, { params: { search: search } })
        .then((res) => {
          setIsHostData(res.data.searchResult);
        })
        .catch((err) => console.log(err)),
    {
      enabled: !!search,
      refetchOnWindowFocus: false,
    }
  );
  const addressChange = (e) => {
    setAddress(e.target.value);
    setType("")
    setSort("")
    setCategory("all")
  };

  const addressData = useQuery(
    ["addressData", address],
    () =>
      instance
        .get(`/host/address/search`, { params: { search: address } })
        .then((res) => {
          setType("")
          setIsHostData(res.data.hostPost);
        })
        .catch((err) => console.log(err)),
    {
      enabled: !!address,
      refetchOnWindowFocus: false,
    }
  );
  const typeChange = (e) => {
    setType(e.target.value);
    setAddress("")
    setSort("")
    setCategory("all")
  };
  
  const typeData = useQuery(
    ["typeData", type],
    () =>
      instance
        .get(`/host/type/search`, { params: { search: type } })
        .then((res) => {
          setIsHostData(res.data.housebyType);
        })
        .catch((err) => console.log(err)),
    {
      enabled: !!type,
      refetchOnWindowFocus: false,
    }
  );
  const sortChange = (e) =>{
    setSort(e.target.value)
    setType("");
    setAddress("")
    setCategory("all")
  }
  const sortData = useQuery(
    ["sortData", sort],
    () =>
      instance
        .get(`/host/starPoint`)
        .then((res) => {
          setIsHostData(res.data.findAllAcc);
        })
        .catch((err) => console.log(err)),
    {
      enabled: !!sort,
      refetchOnWindowFocus: false,
    }
  );
  const savePost = useMutation(
    ["save"],
    (id) =>
      instance
        .post(`/save/${id}`)
        .then((res) => {
          setIsHostData([...isHostData.map((v,i)=> v.hostId===id  ? {...v,isSave:true} : v)])
        })
        .catch((err) => {
          console.log(err, "why");
        }),
  );
  const saveDelete = useMutation(
    ["save"],
    (id) =>
      instance
        .delete(`/save/${id}/unsave`)
        .then((res) => {
          setIsHostData([...isHostData.map((v,i)=> v.hostId===id  ? {...v,isSave:false} : v)])
        })
        .catch((err) => {
          console.log(err, "why");
        }),
  );

  const saveClick = (id) => {
    if(userId){
      savePost.mutate(id);
    }else{
      setOpen(true)
    }
  };

  const cancelSaveClick = (id) => {
      saveDelete.mutate(id);
  };

  return (
    <>
      <MetaTag title={"숙소찾기 | 멘도롱 제주"}></MetaTag>
      <MainBox>
        <LiveMainBox isCozy={isCozy}>
          <div
            className="cozy"
            onClick={() => {
              setIsCozy("cozy");
              setCategory("all")
              setSort("")
              setType("");
              setAddress("")
              setIsHostData(data.findAllAcc);
            }}
          >
            편하게 한 달 살기
          </div>
          <div
            className="uncozy"
            onClick={() => {
              setIsHostData(
                data.findAllAcc.filter((v) => v.houseInfo === "게스트하우스")
              );
              setIsCozy("uncozy");
              setCategory("all")
              setSort("")
              setType("");
              setAddress("")
            }}
          >
            최소비용으로 한 달 살기
          </div>
        </LiveMainBox>
        <SpotMainBox category={category}>
          <div
            className="all"
            onClick={() => {
              setAddress("")
              setCategory("all");
              setSort("")
              setType("");
              setIsHostData(data.findAllAcc);
            }}
            id="spot"
          >
            <img src={allCategory} alt="모두보기" />
            <span>모두 보기</span>
          </div>
          <div
            className="해변근처"
            onClick={() => {
              setAddress("")
              setCategory("해변근처");
              setSort("")
              setType("");
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "해변근처")
              );
            }}
            id="spot"
          >
            <img src={nearBySea} alt="해변근처" />

            <span>해변 근처</span>
          </div>
          <div
            className="내륙"
            onClick={() => {
              setAddress("")
              setCategory("내륙");
              setSort("")
              setType("");
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "내륙")
              );
            }}
            id="spot"
          >
            <img src={land} alt="내륙" />
            <span>내륙</span>
          </div>
          <div
            className="관광지근처"
            onClick={() => {
              setAddress("")
              setCategory("관광지근처");
              setSort("")
              setType("");
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "관광지근처")
              );
            }}
            id="spot"
          >
            <img src={nearby} alt="관광지 근처" />
            <span>관광지 근처</span>
          </div>
          <div
            className="조용한마을"
            onClick={() => {
              setAddress("")
              setCategory("조용한마을");
              setSort("")
              setType("");
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "조용한마을")
              );
            }}
            id="spot"
          >
            <img src={quietVil} alt="조용한 마을" />

            <span>조용한 마을</span>
          </div>
          <div
            className="우도"
            onClick={() => {
              setIsHostData(
                data.findAllAcc.filter((v) => v.category === "우도")
              );
              setCategory("우도");
              setSort("")
              setType("");
              setAddress("")
            }}
            id="spot"
          >
            <img src={udo} alt="우도" />

            <span>우도</span>
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
                value={type||""}
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
                value={address ||""}
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
                value={sort||""}
                onChange={sortChange}
              >
                <MenuItem value="" onClick={()=>{
                  setIsHostData(data.findAllAcc);
                }}>
                  최신순
                </MenuItem>
                <MenuItem value="별점순">별점순</MenuItem>
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
                        <div style={{}}>
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
                );
              })}
            </ListWrap>
          </ContentsBox>
          <LoginModal open={open} setOpen={setOpen}/>
          <MapBox>
            <KakaoMap data={isHostData} height={"85%"} singleMarker={false}/>
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
    height: 120px;
    :hover {
      * {
        opacity: 1;
      }
    }
    span {
      text-align: center;
      margin-top: 5px;
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


const LiveMainBox = styled.div`
  width: 70%;
  height: 80px;
  display: flex;
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
  display: flex;
  flex-direction: column;
  #houseCount {
    margin: 15px 0px 0px 15px;
  }
`;
const ListWrap = styled.div`
  overflow-y: auto;
  padding: 0 10px;
`;
const OrderingBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 20px 10px;
  div {
    height: 50px;
    margin: 0px 15px 0px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 21px;
  }
`;

const StyleSelect = styled(Select)`
  height: 60px;
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


