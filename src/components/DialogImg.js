import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import goki from "../assests/css/고기.png"
import { FaTimes } from "react-icons/fa";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogImg = (props) => {
  const { listImg, open, onClose } = props;
  console.log();
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      aria-describedby="alert-dialog-slide-description"
      TransitionComponent={Transition}
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { borderRadius: 30 }   }}
      
    >
      <DialogTitle><DeleteIcon onClick={onClose} /></DialogTitle>
      
      <Container>
        <Wrap id="alert-dialog-slide-description">
          {listImg.map((item, idx) => {
            return (
              <img style={{}} src={goki} alt="이미지" />
            );
          })}
        </Wrap>
      </Container>
    </Dialog>
  );
};
const Container = styled(DialogContent)`
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 30px;
  /* align-items: center;  */
`;
const Wrap = styled(DialogContentText)`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(50%,auto));
  border-radius: 30px;
  /* border: 1px solid red; */

  img {
    width: 100%;
    height: 592px;
    margin-top: 10px;
    /* border: 1px solid; */
    /* object-fit: none; */
    /* object-fit: scale-down; */
    object-fit: contain;
    /* object-fit: fill; */
    /* object-fit: cover; */
    overflow: hidden;
    border-radius: 30px;
    
  }
`;

const DeleteIcon = styled(FaTimes)`
  cursor: pointer;
  opacity: 0.4;
`

export default DialogImg;