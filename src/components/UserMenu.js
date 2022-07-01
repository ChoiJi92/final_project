import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const UserMenu = ({userImage,nickName}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
        <MenuItem onClick={handleClose}>숙소 호스트 되기</MenuItem>
        <MenuItem onClick={handleClose}>계정</MenuItem>
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        <MenuItem onClick={()=>{
            localStorage.clear()
            handleClose()
        }}>로그아웃</MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu