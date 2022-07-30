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
import { useRecoilState } from "recoil";
import { reviewList } from "../recoil/atoms";

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
  const userId = localStorage.getItem("userId");
  const { open, close, isReivewUpdate } = props;
  const [score, setScore] = useState(0);

  const [isText, setIsText] = useState("");
  // const [ ] = useState("");

  const textRef = useRef(null);
  // const [isReview, setIsReview] = useRecoilState(reviewList);
  const starRef = useRef();
  const params = useParams();
  const hostId = params.id;
  // console.log(hostId, "its hostId");

  const textChange = (e) => {
    setIsText(e.target.value);
  };

  const queryClient = useQueryClient();

  const testReview = useMutation(
    (testData) =>
      instance
        .post(`/review/${hostId}/review`, testData)
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          // console.log(err, "why");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reviewDetail");
      },
    }
  );
  
  const updateReview = useMutation(
    (data) =>
      instance
        .put(`/review/${hostId}/${isReivewUpdate.reviewId}`, data)
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          // console.log(err, "why");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reviewDetail");
      },
    }
  );  
     const updateReview1= useMutation((data)=>(
    instance
    .put(`/review/${hostId}/${isReivewUpdate.reviewId}`, data)
    .then((res)=>{
      // console.log(res.data);
    })
    .catch((error)=>{
      // console.log(error, "why");
    }),{
      onSuccess: () => {
        queryClient.invalidateQueries("reviewDetail");
      },
    }
  ))
  const reviewSubmit = () => {
    
    if(!isReivewUpdate.review){
      const testData = {
      review: textRef.current.value,
      starpoint: score,
    };
    testReview.mutate(testData);
    // console.log(testData, "등록 데이터");
    setScore(0);
    close();
    }else
    {
      const data = {
        review: textRef.current.value,
        starpoint: isReivewUpdate.star ,
      };
      // console.log(data ,"수정 데이터")
      updateReview.mutate(data);
      setScore(0);
      close();
    }
    
  };
  // const handleChange = () => {
  //   setScore(score)
  // }
  // console.log(isReivewUpdate.reviewId, "수정 데이터다잉");
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
                <h3>
                  {userId == isReivewUpdate.id
                    ? "후기 수정하기"
                    : "후기 남기기"}
                </h3>
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
                  style={{ fontSize: "60px", color: "#2A7047" }}
                  name="half-rating"
                  // defaultValue={score}
                  precision={1}
                  ref={starRef}
                  defaultValue={isReivewUpdate.star ? isReivewUpdate.star : score}
                  onChange={(event, newValue) => {
                    setScore(newValue);
                  }}
                />
              </Stack>
            </Main>
            <StarReview style={{ marginTop: "57px" }}>
              상세후기를 남겨주세요.
            </StarReview>

            <Main id="transition-modal-description" sx={{ mt: 2 }}>
              <TextBox>
                <textarea
                  ref={textRef}
                  // defaultValue={isReivewUpdate.review}
                  defaultValue={isReivewUpdate.review}
                  placeholder="내용을 입력해주세요."
                  onChange={textChange}
                />
                {/* 버튼에서 등록 수정버튼 만들어야 함 */}
                <Btn onClick={reviewSubmit}>{userId == isReivewUpdate.id
                    ? "수정하기"
                    : "확인"}</Btn>
              </TextBox>
            </Main>
            {/* <ErrorMsg>{errors.review?.message}</ErrorMsg> */}
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
  color: #636366;
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

const TextBox = styled.div`
  width: 100%;
  textarea {
    width: 100%;
    height: 273px;
    border-radius: 20px;
    background-color: #f7f3ef;
    border: none;
    padding: 20px;
    font-size: 28px;
  }
`;



const Btn = styled.button`
  width: 100%;
  height: 72px;
  border-radius: 20px;
  border: none;
  font-size: 25px;
  cursor: pointer;
  margin-top: 30px;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #EEE9E4;
`;

export default HouseReviewModal;
