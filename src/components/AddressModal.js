import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import cancelIcon from '../assests/css/cancelIcon.png'
import searchIcom from "../assests/css/search.png";
import DaumPostCode from 'react-daum-postcode';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
  };


const AddressModal = ({setAddress}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleComplete = (data) => {
      console.log(data)
        let fullAddress = data.roadAddress;
        // let extraAddress = '';
        // if (data.addressType === 'R') {
            // if (data.bname !== '') {
            //     extraAddress += data.bname;
            // }
            // if (data.buildingName !== '') {
            //     extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            // }
            // fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            handleClose()
            setAddress(fullAddress)
            
        // }
        //fullAddress -> 전체 주소반환
    }
    return (
        <div>
        <img style={{cursor:'pointer'}} onClick={handleOpen} src={searchIcom} alt="검색"/>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Container id="transition-modal-title" variant="h6" component="h2">
                <div>
                주소 찾기
                </div>
                <img className="cancel" src={cancelIcon} alt="닫기" onClick={handleClose}></img>
              </Container>
              <Middle id="transition-modal-description" sx={{ mt: 2 }} component="div">
              <DaumPostCode style={{height:'80%'}} onComplete={handleComplete} className="post-code" />
              </Middle>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
};
const Container = styled(Typography)`
    display: flex;
    justify-content: center;
    align-items: center;
    div{
        font-size: 25px;
        font-weight: 400;
    }
    img{
        position: absolute;
        right: 10px;
        cursor: pointer;
    }

`
const Middle = styled(Typography)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60vh;
  
`

export default AddressModal;