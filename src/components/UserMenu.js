import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const UserMenu = ({userImage,nickName}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
         <img src={userImage} alt=""></img>
          <div style={{color:'black'}}>{nickName} 님</div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Write>
        <MenuItem  onClick={()=>{
          navigate('/userwrite')
          handleClose()
        } }>글쓰기</MenuItem>
        </Write>
        
        <MenuItem onClick={handleClose}>숙소 호스트 되기</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>계정</MenuItem>
        <MenuItem onClick={()=>{
            localStorage.clear()
            handleClose()
        }}>로그아웃</MenuItem>
      </Menu>
    </div>
  );
}

const Write = styled.div`
  /* border: 1px solid;
  border-radius: 5px;
  width: 30%; */

`
export default UserMenu