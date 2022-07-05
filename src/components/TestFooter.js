
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TestFooter = (props) => {
    
    
    const handleCancel = () => {
        
    }
    const handleSave = () => {
        console.log(props.getValues())
    }

    return(
    <Wrap>
        <DeleteBox>
            <Link to={"/"}>
            <input type="button" value={"작성취소"}/>
            </Link>
        </DeleteBox>
        <SubmitBox>
            <input onClick={handleSave}  type="button" value={"임시저장"}/>
            <button>저장</button>
        </SubmitBox>
    </Wrap>
    )
};

const Wrap = styled.div`
    width: 100%;
    height: 50px;
    background-color: gray;
    display: flex;
    justify-content: space-between;
`

const DeleteBox = styled.div`
    margin-left: 350px;
`
const SubmitBox = styled.div`
    margin-right: 350px;
    button{
        margin-left: 10px;
    }
`
export default TestFooter;