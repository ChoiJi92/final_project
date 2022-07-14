import React from 'react';
import styled from "styled-components";
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterIcon,
	TwitterShareButton,
} from "react-share";
import KakaoShare from './KakaoShare';
import { CopyToClipboard } from "react-copy-to-clipboard";
const Share = () => {
    const currentUrl = window.location.href;
    return (
        <FlexContainer>
        <h2>공유하기</h2>
        <GridContainer>
        <FacebookShareButton url={currentUrl}>
					<FacebookIcon size={48} round={false} borderRadius={20}></FacebookIcon>
				</FacebookShareButton>
				<TwitterShareButton url={currentUrl}>
					<TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
				</TwitterShareButton>
                <CopyToClipboard text={currentUrl}>
					<URLShareButton>URL</URLShareButton>
				</CopyToClipboard>
            <KakaoShare/>
        </GridContainer>
    </FlexContainer>
    );
};
const FlexContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
    border: 1px solid;
    width: 20%;
    border-radius: 20px;
`;
const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 48px);
	grid-column-gap: 8px;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
`;
const URLShareButton = styled.button`
	width: 48px;
	height: 48px;
	color: white;
	border-radius: 24px;
	border: 0px;
	font-weight: 800;
	font-size: 18px;
	cursor: pointer;
	background-color: #7362ff;
	&:hover {
		background-color: #a99fee;
	}
`;
export default Share;