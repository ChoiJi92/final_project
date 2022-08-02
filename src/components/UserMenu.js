import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import HostModal from "./HostModal";

const UserMenu = ({ userImage, nickName }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Wrap
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div style={{ color: "black" }}>{nickName}</div>
        <img src={userImage} alt="프로필"></img>
      </Wrap>
      <MenuWrap
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Write>
          <MenuItem
            onClick={() => {
              navigate("/userwrite");
              handleClose();
            }}
            style={{
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "20px",
              lineHeight: "120%",
              display: "flex",
              justifyContent: "center",
              height: "62px",
              color: "white",
              border: "none",
              borderRadius: "10px",
              marginBottom:'20px',
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #EEE9E4",
            }}
          >
            글쓰러 가기
          </MenuItem>
        </Write>
        <MenuItem>
          <HostModal setAnchorEl={setAnchorEl}></HostModal>
        </MenuItem>
        <Divider  style={{margin:'20px 0'}}/>
        <MenuItem
          style={{
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "120%",
            marginBottom:'10px'
          }}
          onClick={() => {
            handleClose()
            navigate("/mypage");
            window.location.reload()
          }}
        >
          마이페이지
        </MenuItem>
        <MenuItem
          style={{
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "120%",
            color: "#AEAEB2" 
          }}
          onClick={() => {
            sessionStorage.clear();
            handleClose();
            window.location.reload();
          }}
        >
          로그아웃
        </MenuItem>
      </MenuWrap>
    </>
  );
};
const MenuWrap=styled(Menu)`
.MuiPaper-root {
  border-radius: 20px;
  padding: 10px;
}
`
const Wrap = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    font-size: 24px;
    font-weight: 500;
    line-height: 34.75px;
    color: black;
    margin-right: 10px;
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
const Write = styled.div`
  margin: 10px;
  border-radius: 10px;
  width: 240px;
`;
export default UserMenu;
