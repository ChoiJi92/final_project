import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { houseInfoMap } from "../recoil/atoms";
import {Map, MapMarker } from "react-kakao-maps-sdk";
/*global kakao*/
const { kakao } = window;
const TestMap = () => {
//   const isHouseInfoMap = useRecoilValue(houseInfoMap);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  // console.log(isHouseInfoMap);
  const [isList, setIsList] = useRecoilState(houseInfoMap);
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

  setIsList(data);
  console.log(isList)
  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    const geocoder = new kakao.maps.services.Geocoder();

    const zoomControl = new kakao.maps.ZoomControl();
    let markers = [];
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    // geocoder.addressSearch()
    // for(let i = 0; i <isList.length; i++){
    //     geocoder.addressSearch(isList[i].fullAddress, function(result, status){
    //         if(status === kakao.maps.services.Status.OK){
    //             const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //             markers.push({
    //                 position:coords
    //             });
    //         }
    //     })
    // }
    // setMarkers(markers);
    ps.keywordSearch((data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 33.3616666,
        lng: 126.5291666
      }}
      style={{
        width: "100%",
        height: "350px",
      }}
      level={10}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info &&info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
};

// const Map = styled.div``;

// const MapMarker = styled.div``;

export default TestMap;
