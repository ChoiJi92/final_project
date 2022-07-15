import React from "react";
import styled from "styled-components";
import shareIcon2 from "../assests/css/shareIcon2.png";
import shareIcon from "../assests/css/shareIcon.png";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import KakaoShare from "./KakaoShare";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

const Share2 = ({data}) => {
  const currentUrl = window.location.href;
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <Container>
          <Btn {...bindTrigger(popupState)}>
        
            <img className="shareIcon" src={shareIcon} alt="공유" />
          </Btn>
		  
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography sx={{ p: 2 }} component="div">
              <GridContainer>
                <FacebookShareButton url={currentUrl}>
                  <FacebookIcon
                    size={48}
                    round={false}
                    borderRadius={50}
                  ></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton url={currentUrl}>
                  <TwitterIcon
                    size={48}
                    round={true}
                    borderRadius={24}
                  ></TwitterIcon>
                </TwitterShareButton>
                <CopyToClipboard text={currentUrl}>
                  <URLShareButton onClick={()=>{
					window.alert("클립보드에 복사되었습니다.")
				  }}>URL</URLShareButton>
                </CopyToClipboard>
                <KakaoShare data={data} />
              </GridContainer>
            </Typography>
          </Popover>
        </Container>
      )}
    </PopupState>
  );
};
const Container = styled.div`
	width: 20%;
`
const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  cursor: pointer;

`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 48px);
  grid-column-gap: 10px;
  justify-content: center;
  /* align-items: center; */
  /* margin-bottom: 16px; */
`;
const URLShareButton = styled.button`
  width: 48px;
  height: 48px;
  color: white;
  border-radius: 24px;
  border: none;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  background-color: #7362ff;
  /* &:hover {
    background-color: #a99fee;
  } */
`;
export default Share2;
