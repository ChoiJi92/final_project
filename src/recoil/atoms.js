import {atom} from 'recoil'

export const addressState = atom({
    key: 'addressState',
    default:''
})
export const contentState = atom({
  key: 'contentState',
  default:''
})
export const tagState = atom({
  key: 'tagState',
  default:[]
})