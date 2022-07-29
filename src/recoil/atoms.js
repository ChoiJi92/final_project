import { atom } from "recoil";
export const postData = atom({
  key: "postData",
  default: [],
});
export const bestPostData = atom({
  key: "bestPostData",
  default: [],
});
export const chatState = atom({
  key: "chatState",
  default: [],
});
export const myPostList = atom({
  key: "myPostList",
  default: [],
});
export const myLikeList = atom({
  key: "myLikeList",
  default: [],
});
export const mySaveList = atom({
  key: "mySaveList",
  default: [],
});
export const myHostList = atom({
  key: "myHostList",
  default: [],
});

export const userShare = atom({
  key: "userShare",
  default: [],
});

export const hostShareAndMap = atom({
  key: "hostShare",
  default: [],
});

export const hostData = atom({
  key: "hostData",
  default: [],
});

export const updateImgList = atom({ 
  key: "images", 
  default: [] 
});

export const reviewStarList = atom({ 
  key: "review", 
  default: [] 
});

export const deletedImgList = atom ({
  key:"deleteImg",
  default:[]
});