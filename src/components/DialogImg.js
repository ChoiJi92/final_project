import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogImg = (props) => {
    const {listImg, open, onClose} = props;
    console.log(props)
    return(
    <Dialog 
          fullWidth={true}
            maxWidth="xl"   aria-describedby="alert-dialog-slide-description" TransitionComponent={Transition} open={open} onClose={onClose}>
        <DialogTitle>{'사진 더보기'}</DialogTitle>
        <DialogContent style={{}}>
        <DialogContentText  id="alert-dialog-slide-description">
           {/* <div style={{"width":"90%","height":"90vh"}}> */}
           {listImg.map((item, idx)=>{return(<img style={{"marginTop":"20px"}} src={item}/>)})}
            {/* </div> */}
          </DialogContentText>
        </DialogContent>
        
    </Dialog>);
};


// const Dialog


export default DialogImg;