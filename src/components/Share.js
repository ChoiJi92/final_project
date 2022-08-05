import React from "react";
import styled from "styled-components";
import shareIcon2 from "../assests/css/images/shareIcon2.webp";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import KakaoShare from "./KakaoShare";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

const Share = ({ data }) => {
  const currentUrl = window.location.href;
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <Container>
          {data ? (
            <Btn {...bindTrigger(popupState)}>
              공유
              <img className="shareIcon" src={shareIcon2} alt="공유" />
            </Btn>
          ) : (
            <HouseImg
              {...bindTrigger(popupState)}
              src={shareIcon2}
              alt="공유"
            />
          )}
        
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
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
                  <URLShareButton
                    onClick={() => {
                      window.alert("클립보드에 복사되었습니다.");
                    }}
                  >
                    URL
                  </URLShareButton>
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
  margin-right: 20px;
  width: 35%;
`;
const Btn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 58px;
  border-radius: 10px;
  border: none;
  margin-left: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 160%;
  background-color: #F7F3EF;
  color: #48484a;
  cursor: pointer;
  .shareIcon {
    width: 32px;
    height: 32px;
    margin-left: 6px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 48px);
  grid-column-gap: 10px;
  justify-content: center;
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
`;

const HouseImg = styled.img`
  width: 42px;
  height: 42px;
  margin-left: 10px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export default Share;
