import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { houseInfoMap } from "../recoil/atoms";
import back2 from "../assests/css/배경2.webp";
import starIcon from "../assests/css/starIcon.png";
import unsaveIcon from "../assests/css/unsaveIcon.png";
import cancelIcon from "../assests/css/cancelIcon.png";
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  RemovableCustomOverlayStyle,
} from "react-kakao-maps-sdk";
/*global kakao*/
const { kakao } = window;
const TestMap = () => {
  //   const isHouseInfoMap = useRecoilValue(houseInfoMap);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [isOpen, setIsOpen] = useState(false);
  // console.log(isHouseInfoMap);
  const { data } = useQuery(
    ["houseInfo"],

    // ()=>getWriteData(paramsId),
    () => {
      return axios
        .get(`http://localhost:5001/testList/`)
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // setIsList(data);

  useEffect(() => {
    if (!map) return;
    // const ps = new kakao.maps.services.Places();
    const geocoder = new kakao.maps.services.Geocoder();

    const zoomControl = new kakao.maps.ZoomControl();
    let markers = [];
    const bounds = new kakao.maps.LatLngBounds();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    geocoder.addressSearch();
    for (let i = 0; i < data.length; i++) {
      geocoder.addressSearch(data[i].fullAddress, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result, "It's result");
          console.log(result[0].x, result[0].y);
          // const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // markers.push({
          //     position:coords
          // });
          markers.push({
            position: {
              lat: result[0].y,
              lng: result[0].x,
            },
            content: result[0].address_name,
          });
          bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
          console.log(markers);
        }
        setMarkers(markers);
        map.setBounds(bounds);
      });
    }

    // ps.keywordSearch((data, status, _pagination) => {
    //   if (status === kakao.maps.services.Status.OK) {
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가합니다
    //     const bounds = new kakao.maps.LatLngBounds();
    //     let markers = [];

    //     for (var i = 0; i < data.length; i++) {
    //       // @ts-ignore
    //       markers.push({
    //         position: {
    //           lat: data[i].y,
    //           lng: data[i].x,
    //         },
    //         content: data[i].place_name,
    //       });
    //       // @ts-ignore
    //       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //     }
    //     setMarkers(markers);

    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //     map.setBounds(bounds);
    //   }
    // });
  }, [map]);
  const btnClick = () => {
    console.log("");
  };
  // let a = document
  //   .querySelectorAll("#map > div > div > div")[5]
  //   ?.querySelectorAll("div:last-child")[5];
  // console.log(a);

  const mapClick = (marker) => {
    setInfo(marker);
    let b = document.querySelectorAll("#map > div > div > div>div")[1]
    // console.log(b.remove());
  };
  return (
    <Map // 로드뷰를 표시할 Container
      id={`map`}
      center={{
        lat: 34.3616666,
        lng: 127.5291666,
      }}
      style={{
        width: "100%",
        height: "500px",
      }}
      level={12}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapBox
          key={`${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => {
            mapClick(marker);
          }}
          // style={{"display":"none"}}
        >
          {info && info.content === marker.content && (
            // <MapBox>
            // <div style={{color:"#000" ,"width":"100px","height":"100px", "borderRadius":"10px"}}>{marker.content}</div>
            // <button onClick={() => setInfo("")}>x</button>
            // <button onClick={btnClick}>a</button>
            // </MapBox>
            <CustomOverlayMap position={marker.position}>
              <Wrap className="wrap">
                <div className="info">
                  <div className="title">
                    <img
                      src={cancelIcon}
                      className="close"
                      onClick={() => setInfo("")}
                      alt="닫기"
                    ></img>
                  </div>
                  <div className="body">
                    <div className="desc">
                      <div className="house">해변근처의 게스트하우스</div>
                      <div className="iconWrap">
                        <div>
                          <img src={starIcon} alt="별점"></img>
                          <p>5.0</p>
                        </div>
                        <img
                          onClick={() => {
                            console.log(marker);
                          }}
                          src={unsaveIcon}
                          alt="저장"
                        ></img>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </Wrap>
            </CustomOverlayMap>
          )}
        </MapBox>
      ))}
    </Map>
  );
};

// const Map = styled.div``;

// const MapMarker = styled.div``;

const MapBox = styled(MapMarker)`
  display: none;
  width: 300px;
  height: 200px;
`;

// const MapBox = styled.div`
//   border-radius: 30px;
//   width: 100px;
//   height: 100px;
//   border: 1px solid red;
//   display: flex;
//   justify-content: center;
//   align-items:center ;

// `
const Wrap = styled.div`
  border-radius: 20px;
  position: relative;
  bottom: 200px;
  .info {
    /* border: 1px solid red; */
  }
  .title {
    background: url(${back2}) no-repeat;
    background-size: cover;
    width: 400px;
    height: 220px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
    img {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
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
      width: 26px;
      height: 26px;
    }
  }
`;

export default TestMap;
