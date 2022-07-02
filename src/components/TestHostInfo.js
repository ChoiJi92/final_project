import React, { useState } from "react";
import styled from "styled-components";
import {FaSortDown, FaSortUp} from "react-icons/fa";

const TestHostInfo = () => {
    const [isInfo, setIsInfo] = useState(false);
    const onClick = () => {
        setIsInfo((prev)=>!prev)
        console.log(isInfo)
    }
    return(
        <InfoMain>
            <InfoBox1>
            <h3>필수 정보 입력!</h3>
            <span>고객들이 숙소를 결정할 때 꼭 필요한 정보들이니 꼼꼼하게 작성해 주세요.</span>
            {isInfo ? (<DownIcon onClick={onClick}/>) : (<UpIcon onClick={onClick}/>)}
            </InfoBox1>
            
            <InfoMainBox style={{"display":isInfo? "none" : "" }}>
            <InfoBox2>
                <span>숙소형태 *</span>
                <span>평수 *</span>
                <span>지역 *</span>
                <span>스텝 공고 여부 *</span>
                <span>링크 *</span>
            </InfoBox2>
            <InfoBox3>
                <input id="house"/>
                <input id="square"/>    
                <input id="location"/>
                <input id="step"/>
                <input id="link"/>
            </InfoBox3>
            </InfoMainBox>
        
        </InfoMain>
    );
};

const InfoMain = styled.div`
    width: 550px;
    height: auto;
    border: 1px solid #c7ecee;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    h3{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const DownIcon = styled(FaSortDown)`
    cursor: pointer;
    font-size: 12px;
    margin: 5px 10px 0px 0px;
    color: #b2bec3;
`
const UpIcon = styled(FaSortUp)`
    cursor: pointer;
    font-size: 12px;
    margin: 10px 10px 0px 0px;
    color: #b2bec3;
`
const InfoMainBox  = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 0px 15px 0px;
`

const InfoBox1 = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 0px 5px 10px;
    span{
        font-size: 5px;
        margin: 10px 70px 0px 0px;
    }
`

const InfoBox2  = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    span{
        margin-top: 15px;
    }
`
const InfoBox3 = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 250px;
    input{  
        margin-top: 13px;
        border: 1.5px solid #c7ecee;
        border-radius: 5px;
        padding: 2px;
    }
`

export default TestHostInfo;