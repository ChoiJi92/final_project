/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import back from "../assests/css/back.jpeg";
import { MdOutlineCancel } from "react-icons/md";
import "../assests/css/map.css";
import { useRecoilValue } from "recoil";
import { hostShareAndMap, houseDetailMap, houseInfoMap } from "../recoil/atoms";
import { Link, useParams } from "react-router-dom";
import jeju1 from "../assests/css/jeju1.jpeg";
import unsaveIcon2 from "../assests/css/unsaveIcon2.jpeg";

const { kakao } = window;

const Map = ({ search, MapRadius, isinfo }) => {
  const isHouseInfoMap = useRecoilValue(houseInfoMap);
  const isHouseDetailMap = useRecoilValue(hostShareAndMap);

  // console.log(isHouseMap[0].mainAddress)
  const params = useParams();
  const paramsId = params.id;
  console.log(paramsId);

  useEffect(() => {
    
    let infowindow = new kakao.maps.InfoWindow({
      "border-radius": "30px",
      zIndex: 0,
      removable: true,
    });
    const container = document.getElementById("map"); // 지도를 표시할 div

    const options = {
      center: new kakao.maps.LatLng(33.3616666, 126.5291666), // 지도 중심 좌표
      level: 10, // 지도 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성!
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    // const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    // map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다

    // 디테일 페이지에서 줌 컨트롤 설정시 border-radius 때문에 짤리는 현상 발생 houseInfo 페이지에서만 줌 컨트롤러 생성함

    // const zoomControl = new kakao.maps.ZoomControl();
    // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 주소로 좌표를 검색합니다
    // let addressList = [
    //   "제주특별자치도 제주시 가령골길 1",
    //   "제주특별자치도 성산리",
    // ];

    //Detail page 지도 마커만 표시
    if (paramsId) {
      geocoder.addressSearch(
        isHouseDetailMap.fullAddress,
        function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            // let content = `<div id= "label" class ="label">카카오!</div>`;
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            // var customOverlay = new kakao.maps.CustomOverlay({
            //   position: coords,
            //   content: content,
            //   map: map,
            // });

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });
            // 커스텀 오버레이를 지도에 표시합니다
            // customOverlay.setMap(map);
            // 마커에 클릭이벤트를 등록
            // kakao.maps.event.addListener(marker, "click", function () {
            //   // 마커를 클릭하면 장소명이 인포윈도우에 표출
            //   infowindow.setContent(
            //     `
            //     <div >

            //       <div/>
            //       `
            //   );
            //   infowindow.open(map, marker);
            // });
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        }
      );
    } else {
      const zoomControl = new kakao.maps.ZoomControl();
      
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      
      for (let i = 0; i < isHouseInfoMap.length; i++) {
        geocoder.addressSearch(
          isHouseInfoMap[i].fullAddress,
          function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              // let content = `<div id= "label" class ="label">카카오!</div>`;
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              // var customOverlay = new kakao.maps.CustomOverlay({
              //   position: coords,
              //   content: content,
              //   map: map,
              // });
              
              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                // image:jeju1,
              });
              
              // 커스텀 오버레이를 지도에 표시합니다
              // customOverlay.setMap(map);
              // 마커에 클릭이벤트를 등록
              
              kakao.maps.event.addListener(marker, "click", function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출
                infowindow.setContent(
                  
                  `
          
                  <div class="card">
                      <div class="backimage">
                        <img class="houseImg" src=${jeju1} alt="jeju"/>
                      </div>
                      <div class="contents">
                        <div>${isHouseInfoMap[i].title}</div>   
                      </div>
                      <div class="reviewBox">
                        <div>
                          <span>1</span>
                          <span>2</span>
                        </div>
                        <img onclick="test()" class="saveImg" src=${unsaveIcon2} alt="haha"/>
                      <div/>
                  </div>
                  
                  `
                  
                );
                
                infowindow.open(map, marker);
                
              });
              
              // const imgClick = document.querySelector(".saveImg");
              // imgClick.addEventListener("click", clickFn);
              // const clickFn = () => {
              //   console.log("haah");
              // };
              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
              
            }
            
          }
          
        );
        
      }
      
    }
      
    // var contentUpperSection = $('#card').parent('div');
    // console.log(contentUpperSection)
    
  }, []);
  // const imgClick = document.querySelector(".saveImg");
  // imgClick.addEventListener("click", clickFn)
  // const clickFn = () => {
  //   console.log("haah")
  // }
  // 550px 450px 600px
  
  return (
    <Container MapRadius={MapRadius}>
      <div id="map"></div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  #map {
    width: 100%;
    height: 100%;
    border-radius: ${(props) => props.MapRadius};
    /* height: ${(props) => (props.isinfo ? "550px" : "400px")}; */
  }
`;

export default Map;
