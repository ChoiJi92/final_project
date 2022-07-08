import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import styled from "styled-components";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogImg = (props) => {
  const { listImg, open, onClose } = props;
  console.log(props);
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      aria-describedby="alert-dialog-slide-description"
      TransitionComponent={Transition}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{"사진 더보기"}</DialogTitle>
      <Container>
        <Wrap id="alert-dialog-slide-description">
          {listImg.map((item, idx) => {
            return (
              <img style={{ marginTop: "20px" }} src={item} alt="이미지" />
            );
          })}
        </Wrap>
      </Container>
    </Dialog>
  );
};
const Container = styled(DialogContent)`
  width: 100%;
  border: 1px solid green;
  display: flex;
  justify-content: center;
  /* align-items: center;  */
`;
const Wrap = styled(DialogContentText)`
  width: 60%;
  display: grid;
  grid-gap: 20px;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(50%,auto));

  /* border: 1px solid red; */

  img {
    width: 500px;
    height: 500px;
    /* border: 1px solid; */
    /* object-fit: none; */
    /* object-fit: scale-down; */
    object-fit: contain;
    /* object-fit: fill; */
    /* object-fit: cover; */
    overflow: hidden;
  }
`;

export default DialogImg;