import React, { useEffect, useState } from "react";
import styled from "styled-components";
import nextIcon from "../assests/css/nextIcon.webp";
import { FaAngleDoubleUp } from "react-icons/fa";
const ScrollTopBtn = () => {
    const [isScroll, setIsScroll] = useState(false);

    const throttle = (callback, delay) => {
        let timer = null;
        return () => {
            if(timer)return;
            timer = setTimeout(()=>{
                callback();
                timer = null;
            }, delay) 
        }
    }
    const updateScroll = () => {
        const {scrollY} = window;
        scrollY > 50 ? setIsScroll(true) : setIsScroll(false);
    };
    const handleScroll = throttle(updateScroll, 100);
    useEffect(()=> {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    },[]);
    
    const moveToTop = () => (document.documentElement.scrollTop = 0);
    return(
    <>
    {isScroll ? (<Btn onClick={moveToTop}></Btn>) : ("")}
    </>)
};

const Btn = styled(FaAngleDoubleUp)`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: fixed;
    bottom: 30px;
    right: 35px;
    z-index: 1;
    opacity: 0.6;
    /* box-shadow: 0px 12px 42px #eee9e4; */
    box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.2);
    /* transition: 0.4s; */
    background-image: url(${nextIcon}) no-repeat;
    border: none;
    cursor: pointer;
    /* border: 1px solid red; */
    padding: 10px;
`

// const ImgBtn = styled.ImgBtn`
//     width: 50px;
//     height: 50px;   
// `

export default ScrollTopBtn;