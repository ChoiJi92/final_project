import {atom} from 'recoil'

export const chatState = atom({
    key: 'chatState',
    default:[]
})
export const myPostList = atom({
  key: 'myPostList',
  default:[]
})
export const myLikeList = atom({
  key: 'myLikeList',
  default:[]
})
export const mySaveList = atom({
  key: 'mySaveList',
  default:[]
})
export const myHostList = atom({
  key: 'myHostList',
  default:[]
})
export const userCount = atom({
  key: 'userCount',
  default:0
})
export const contentState = atom({
  key: 'contentState',
  default:''
})
export const tagState = atom({
  key: 'tagState',
  default:[]
})

export const userShare = atom({
  key:"userShare",
  default:[]
});

export const hostShareAndMap = atom({
  key:"hostShare",
  default:[]
});

export const houseInfoMap = atom({
  key:"houseInfo",
  default:['제주 서귀포시 중정로 24-7 1층']
});

export const houseDetailMap = atom({
  key:"houseDetail",
  default:[1,2,3]
});