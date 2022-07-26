import React, { useRef, useState } from "react";
import cancelIcon from "../assests/css/cancelIcon.png";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import instance from "../shared/axios";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "46%",
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
};

const HouseReviewModal = (props) => {
  // const [open, setOpen] = React.useState(false);

  const {open, close, userId} = props;
  const [score, setScore] = useState(0);
  const starRef = useRef();
  const params = useParams();
  const hostId = params.id;
  console.log(hostId,"its hostId")
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const { register, handleSubmit,formState: { errors }, } = useForm({ defaultValues: {} });

  const queryClient = useQueryClient();
  const testReview = useMutation((testData)=>{
    instance.post(`/review/${hostId}/review`, testData).then((res)=>{
        console.log(res.data)
  }).catch((err)=>{console.log(err,"why")})   
  },
  {
    onSuccess: () => {
      // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
      queryClient.invalidateQueries("reviweDetail");
    },
  })
  console.log(parseFloat(2.5))
  
  const reviewSubmit = (data) => {
    console.log(starRef);
    console.log(data.review, "its data");
    console.log(typeof(score))
    const testData = {
      review:data.review,
      starpoint:score
    }
    testReview.mutate(testData);
  }
  // const handleChange = () => {
  //   setScore(score)
  // }
  console.log(userId)
  return (
    <>
      {/* <Button onClick={handleOpen}>
        Open modal
      </Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Main id="transition-modal-title" variant="h6" component="h2">
              <div id="mainReview">
            
                <h3>후기 남기기</h3>
                <img
                  className="cancel"
                  src={cancelIcon}
                  alt="닫기"
                  onClick={close}
                />
              </div>
            </Main>
            <StarReview>별점을 남겨주세요</StarReview>
            <Main>
            <Stack>
                <Rating
                
                  style={{ fontSize: "60px",color:"#2A7047" }}
                  name="half-rating"
                  // defaultValue={score}
                  precision={0.5}
                  ref={starRef}
                  value={score}
                  onChange={(event, newValue) => {
                    setScore(newValue);
                  }}
                />
              </Stack>
            
            </Main>
            <StarReview style={{"marginTop": "57px"}}>상세후기를 남겨주세요.</StarReview>
            
            <Main id="transition-modal-description" sx={{ mt: 2 }}>
              <ReviewForm onSubmit={handleSubmit(reviewSubmit)}>
              
                <textarea
                //defailtValue 수정할 때 값 불러와야 함
                defaultValue={""}
                placeholder="내용을 입력해주세요."
                {...register("review", {
                  required: "내용을 입력해주세요 :)",
                })}
                />
                {/* 버튼에서 등록 수정버튼 만들어야 함 */}
                <Btn>등록</Btn>
              </ReviewForm>
            </Main>
            <ErrorMsg>{errors.review?.message}</ErrorMsg>
          </Box>
        </Fade>
      </Modal>
      </>
  );
};

const Main = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 20px;
    cursor: pointer;
  }
  h3 {
    font-weight: 500;
    font-size: 36px;
    line-height: 150%;
  }
  #mainReview {
    display: flex;
    justify-content: space-between;
  }
`;

const StarReview = styled.h4`
  margin: 20px 0px 20px 0px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 150%;
`;

const ReviewForm = styled.form`
  width: 100%;
  textarea{
    width: 100%;
    height: 273px;
    border-radius: 20px;
    background-color: #F2F2F7;
    border: none;
    padding: 20px;
    font-size: 28px;
  }
`

const ErrorMsg = styled.p`

`

const Btn = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 20px;
  border: none;
  font-size: 25px;
  cursor: pointer;
  background-color: #f7f3ef;
`

export default HouseReviewModal;
