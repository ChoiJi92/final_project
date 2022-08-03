import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaAngleDoubleUp } from "react-icons/fa";
import scrollTopIcon from '../assests/css/images/scrollTopIcon.webp'
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
    {/* {isScroll ? (<Btn onClick={moveToTop}></Btn>) : ("")} */}
    {isScroll ? (<Btn src={scrollTopIcon} onClick={moveToTop}></Btn>) : ("")}
    </>)
};

// const Btn = styled(FaAngleDoubleUp)`
//     width: 80px;
//     height: 80px;
//     border-radius: 50%;
//     position: fixed;
//     bottom: 30px;
//     right: 35px;
//     z-index: 1;
//     opacity: 0.6;
//     box-shadow: 0px 12px 42px rgba(0, 0, 0, 0.2);
//     /* transition: 0.4s; */
//     border: none;
//     cursor: pointer;
//     padding: 10px;
// `
const Btn = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: fixed;
    bottom: 30px;
    right: 35px;
    z-index: 1;
    border: none;
    cursor: pointer;

`
export default ScrollTopBtn;