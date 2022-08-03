# 🍊멘도롱 제주
제주도 숙소 검색 및 숙소 정보 공유 커뮤니티 사이트입니다!😄
<img width="1080" alt="이미지1" src="https://user-images.githubusercontent.com/103625778/182082800-4b30bea5-0e1f-46b6-ae24-96d1f3534615.png">

## 🏛 아키텍처
![KakaoTalk_Photo_2022-07-31-17-05-16](https://user-images.githubusercontent.com/103625778/182083611-6b07b906-fa0c-4d7f-8851-8a54fd0df4d4.png)

## 📆 제작 기간 및 팀원 소개 👨‍💻
- 2022.06.24 ~ 2022.08.05
- Front-end
	- 최지훈 [Github](https://github.com/Choiji92)
	- 송완준 [Github](https://github.com/natural-nine)
- Back-end
    - 강유신 [Github](https://github.com/Usiniverse)
	- 윤기남 [Github](https://github.com/wea9677)
	- 이재근 [Github](https://github.com/flypig-hub)

## 💻 Front-end 
- 소셜 로그인 구현
- 숙소,후기 CRUD 기능 구현
- 커뮤니티 게시글, 댓글 CRUD 기능 구현
- 숙소 저장, 게시물 좋아요 기능 구현
- 숙소 위치 지도에 마커 기능
- 실시간 채팅 기능

## 💻 Back-end
[Back-end](https://github.com/Usiniverse/Main-Project)

## 🌎 Website
[멘도롱 제주](https://mendorong-jeju.co.kr/)

## 🎬 기능 구현 영상
[유튜브영상](https://youtu.be/7FfDIUuBeQU)

## 📘 팀 노션
[멘도롱제주 노션](https://unmarred-judge-712.notion.site/875e0fb4b7bf42d69e2fe7b217286aaa)
## 🛠 Front-end 기술 스택 및 개발 환경
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
	<img src="https://img.shields.io/badge/react-444444?style=for-the-badge&logo=react"> 
	 <img src="https://img.shields.io/badge/React--Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=FFFFFF">
	  <img src="https://img.shields.io/badge/recoil-2C5BB4?style=for-the-badge&logo=recoil&logoColor=white">
      		<img src="https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white">
		 <br/>
		   <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">
		 <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
	  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
       <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
	 <img src="https://img.shields.io/badge/axios-FFCA28?style=for-the-badge&logo=axios&logoColor=white">
		 <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
		 <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
		
## 🗒️  페이지 & 기능
### 1. 소셜로그인
- 카카오, 네이버, 구글 로그인을 통해 간편하게 로그인 가능

### 2. 숙소 정보
- 사업자등록번호 인증을 거친 호스트만 숙소를 등록 할 수 있음
- 숙소 정보를 지도를 통해 한 눈에 볼 수 있음
- 지역별, 숙소종류별, 카테고리별로 숙소를 필터해서 볼 수 있음
- 원하는 숙소를 저장하여 마이페이지에서 확인 가능
- 숙소 후기에서 별점을 남길 수 있어 숙소의 평점 확인 가능
### 3. 커뮤니티
- 게시글의 댓글 수가 가장 많은 5개의 게시글을 볼 수 있음
- 원하는 게시글에 좋아요를 눌러 마이페이지에서 확인 가능
- 상세 페이지에서 해당 게시글을 쓴 유저페이지로 이동가능
- 상세 페이지에서 해당 숙소의 상세페이지로 이동가능
### 4. 오픈채팅
- 방의 인원수 제한을 걸어 인원이 꽉차면 못들어 옴
- 실시간 오픈 채팅을 통해 여러가지 정보를 공유할 수 있음


## ⚙️ Trouble Shooting
<details>
<summary>텍스트에디터(Toast UI)에서 이미지 업로드</summary>
<div markdown="1">

`문제점`

텍스트에디터에서 입력하는 데이터는 html 형식으로 DB에 저장을 하게 되는데 이미지를 업로드하게 되면 자동으로 base64 URL로 변경되어 ```<img src=”base64:~~~~~~”/>``` 이런식으로 저장하게 되어 DB에 부담이 된다.

`해결방법`

프론트엔드

Toast UI 라이브러리에 내장되어있는 addImageBlobHook 을 이용하여 이미지를 업로드시 바로 백엔드와 통신을 통해 S3에 이미지를 저장후 S3 URL을 받아서 사용

백엔드

1. API를 2개를 생성한다.
2. 프론트엔드에서 이미지를 이미지에디터에 업로드 할 때마다 AWS S3에 업로드하는 API를 호출하여 S3 URL로 바꾼다.

`다른 문제점`

1. API가 2번 호출되는 상황이라 자원 낭비가 있다.
2. 게시글 작성 중 페이지를 이탈했을 경우 이미 DB와 AWS S3에 저장된 이미지를 통제할 수 있는 방법이 없다.

`해결방법`

프론트

1. 이미지를 업로드 할 때 base64 URL 이 아닌 blob URL로 변경
2. 이미지 업로드 한 파일객체를 리스트에 저장하고 blob URL 도 다른 리스트에 저장
3. 유저가 게시글 작성을 완료하고 백엔드와 통신할 때 위의 두 리스트도 같이 보내줌

백엔드

1. 백엔드에서 파일객체들이 담긴 리스트를 S3에 저장 후 S3 URL을 blob URL이 담긴 리스트와 비교

* 이미지 치환 전 ```<p>제주도!</p><p><img src="blob:[http://localhost:3000/f2da32da-71c4-4dbc-8ad2-0db2ddaea21b](http://localhost:3000/f2da32da-71c4-4dbc-8ad2-0db2ddaea21b)" contenteditable="false">```
* 이미지 치환 후 ```<p>제주도!</p><p><img src=\"[https://yushin-s3.s3.amazonaws.com/images/93d7504b-9d22-4aa4-ab79-56dce525a114.jpg\\](https://yushin-s3.s3.amazonaws.com/images/93d7504b-9d22-4aa4-ab79-56dce525a114.jpg%5C%5C)" contenteditable=\"false\">```

2. 이미지 치환 후 데이터를 DB에 저장

</div>
</details>

<details>
<summary>카카오 로그인 Scope</summary>
<div markdown="1">

`문제점`

로컬에서 테스트 할 때 기존에 로그인을 했었던 유저들은 배포상황에서도 로그인이 되는데 신규 유저들은 로그인이 안되는 상황이 발생
![image](https://user-images.githubusercontent.com/103625778/182110624-b73a9d95-8c23-4681-aa86-f35ddf32e0b3.png)
위 이미지처럼 username과 displayName 이 미연동계정이라고 응답이 옴

`해결방법`
	
KAKAO_AUTH_URL의 scope가 account_email로 되어있어서 카카오 측에서 유저의 이름은 보내주지 않고 이메일만 보내주는 것이었음

```const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email'```;

그래서 scope를 지웠더니 해결
	
```const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code'```;
</div>
</details>
