import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import plusIcon from "../assests/css/images/plusIcon.webp";
import minusIcon from "../assests/css/images/minusIcon.webp";
import styled from "styled-components";
import starIcon from "../assests/css/images/starIcon.webp";
import unsaveIcon from "../assests/css/images/unsaveIcon.webp";
import saveIcon from "../assests/css/images/saveIcon.webp";
import cancelIcon from "../assests/css/images/cancelIcon.webp";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { hostData, testDataMap } from "../recoil/atoms";
import { useMutation, useQueryClient } from "react-query";
import instance from "../shared/axios";
import { Login } from "@mui/icons-material";
import LoginModal from "./LoginModal";
const KakaoMap = ({ data, height, singleMarker }) => {
  const { kakao } = window;
  const [isOpen, setIsOpen] = useState(false);
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [info, setInfo] = useState();
  const [save, setSave] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  // const isTest = useRecoilValue(hostData)
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const savePost = useMutation(
    ["save"],
    (id) =>
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
    ["save"],
    (id) =>
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

  const saveClick = (id, save) => {
    if (userId) {
      savePost.mutate(id);
    } else {
      setOpen(true)
    }
  };

  const cancelSaveClick = (id, save) => {
      saveDelete.mutate(id);
  };
  const bounds = new kakao.maps.LatLngBounds();
  let geocoder = new kakao.maps.services.Geocoder();
  useEffect(() => {
    if (!map) return;

    let markers = [];
    // if(data){
    // for (let i = 0; i < data.length; i++) 
    data.forEach((v,i) => 
    {
      geocoder.addressSearch(v.mainAddress, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          markers.push({
            position: {
              lat: result[0].y,
              lng: result[0].x,
            },
            content: v,
          });

          bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
        }
        map.setBounds(bounds);
        setMarkers([...markers]);
      });
    })
    // setMarkers([...markers]);
    // }else{
    //   for (let i = 0; i < isTest.length; i++) {
    //     geocoder.addressSearch(isTest[i].mainAddress,  function (result, status) {
    //       // 정상적으로 검색이 완료됐으면
    //       if (status === kakao.maps.services.Status.OK) {
    //         markers.push({
    //           position: {
    //             lat: result[0].y,
    //             lng: result[0].x,
    //           },
    //           content: isTest[i],
    //         });

    //         bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
    //       }
    //       console.log("렌더링 two~~~~")
    //       map.setBounds(bounds);

    //       setMarkers([...markers]);
    //     });
    //   }
    // }

    // setIsTest(markers1)
  }, [map, data]);
  const mapRef = useRef();
  const zoomIn = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() - 1);
  };
  const zoomOut = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() + 1);
  };
  return (
    <>
      <Map // 지도를 표시할 Container
        id={`map`}
        center={{
          // 지도의 중심좌표
          lat: 33.3616666,
          lng: 126.5291666,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          // height: "300px",
          height: `${height}`,
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          // marginTop:'40px'
        }}
        level={8} // 지도의 확대 레벨
        onCreate={setMap}
        ref={mapRef}
      >
        {markers.map((v, i) => (
          <div key={`${v.position.lat}-${v.position.lng}-${i}`}>
            <MapMarker
              position={v.position}
              onClick={() => {
                if (!singleMarker) {
                  setInfo(v);
                  setIsOpen(true);
                }
              }}
            />
            {isOpen && info.content === v.content && (
              <CustomOverlayMap position={v.position}>
                <Wrap image={v.content.images[0].postImageURL} >
                  <div className="info">
                    <div className="title" onClick={(e)=>{
                  e.stopPropagation()
                  navigate(`/house/${v.content.hostId}`)
                }}>
                      <img
                        src={cancelIcon}
                        className="close"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsOpen(false)}}
                        alt="닫기"
                      ></img>
                    </div>
                    <div className="body">
                      <div className="desc">
                        <div
                          className="house"
                          onClick={(e) => {
                            // e.stopPropagation()
                            navigate(`/house/${v.content.hostId}`);
                          }}
                        >
                          {v.content.title}
                        </div>
                        <div className="iconWrap">
                          <div>
                            <img src={starIcon} alt="별점"></img>
                            <p>{v.content.average.toFixed(1)}</p>
                          </div>
                          {v.content.isSave ? (
                            <img
                              onClick={(e) => {
                                e.stopPropagation()
                                cancelSaveClick(v.content.hostId);
                              }}
                              src={saveIcon}
                              alt="저장"
                            ></img>
                          ) : (
                            <img
                              onClick={(e) => {
                                e.stopPropagation()
                                saveClick(v.content.hostId);
                              }}
                              src={unsaveIcon}
                              alt="저장"
                            ></img>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <LoginModal open={open} setOpen={setOpen}/>
                </Wrap>
              </CustomOverlayMap>
            )}
          </div>
        ))}
        <Zoom>
          <span onClick={zoomIn}>
            <img className="plusIcon" src={plusIcon} alt="확대" />
          </span>
          <hr style={{ width: "52px", color: "#8E8E93" }} />
          <span onClick={zoomOut}>
            <img className="minusIcon" src={minusIcon} alt="축소" />
          </span>
        </Zoom>
      </Map>
    </>
  );
};
const Zoom = styled.div`
  position: absolute;
  /* margin-left: 350px; */
  margin-top: 40px;
  top: 0;
  right: 20px;
  z-index: 1;
  overflow: hidden;
  background: #fdfcfb;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  width: 72px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    display: block;
  }
  .plusIcon {
    margin-bottom: 20px;
    width: 20px;
  }
  .minusIcon {
    margin-top: 30px;
  }
`;
const Wrap = styled.div`
  border-radius: 20px;
  position: relative;
  bottom: 200px;
  .info {
    width: 400px;
    /* border: 1px solid red; */
  }
  .title {
    background: url(${(props) => props.image}) no-repeat;
    background-size: cover;
    /* width: 400px; */
    width: 100%;
    height: 220px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      z-index: 99;
    }
  }
  .body {
    background-color: white;
    padding: 12px 20px 16px 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .desc {
    display: flex;
    flex-direction: column;
  }
  .house {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 32px;
    color: #828282;
    margin-bottom: 11px;
    cursor: pointer;
  }
  .iconWrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      p {
        font-style: normal;
        font-weight: 300;
        font-size: 24px;
        line-height: 29px;
        color: #828282;
        margin-left: 8px;
      }
    }
    img {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
`;

export default KakaoMap;
