import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import HostModal from "./HostModal";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

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
      <Menu
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
              display: "flex",
              justifyContent: "center",
              color: "white",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#9090A0",
            }}
          >
            글쓰러 가기
          </MenuItem>
        </Write>
        <MenuItem>
          <HostModal></HostModal>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>마이페이지</MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            handleClose();
            window.location.reload();
          }}
        >
          로그아웃
        </MenuItem>
      </Menu>
    </>
  );
};
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
    margin-right:10px;
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
const User = styled.div`
width: 100%;
border: 1px solid;
display: flex;
flex-direction: row;
  div {
    /* width: 100%; */
    font-size: 24px;
    font-weight: 500;
    line-height: 34.75px;
    color: black;
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
