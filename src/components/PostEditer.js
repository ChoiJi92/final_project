import React, { useEffect, useRef, useState } from "react";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";
// toast-ui Viewer import
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
// toast-ui color import
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// toast-ui kor import
import '@toast-ui/editor/dist/i18n/ko-kr'
import Test from "./Test";
import instance from "../shared/axios";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";

const PostEditer = ({thumbnail,title}) => {
    const [content, setContent]= useState()
    const editorRef = useRef();
    const queryClient = useQueryClient()
    console.log(thumbnail)
    const post = {
      thumbnailImage:thumbnail,
      title:title,
      postContent: content,
    }
    const formData = new FormData();
    // thumbnail.forEach((file) => formData.append("file", file));
    formData.append("file", thumbnail)
    const json = JSON.stringify(post);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("contents", blob);

    const createPost = useMutation(['userPost',formData], () => 
          instance.post('/post', formData, {
            headers:{
              "Content-Type": "multipart/form-data",
            }
          }).then((res)=>
          console.log(res.data)),{
            onSuccess: () => {
              // post 성공하면 'content'라는 key를 가진 친구가 실행 (content는 get요청하는 친구)
              queryClient.invalidateQueries("content");
            }
          }
        )
    const onChange = ()=>{
        setContent(editorRef.current?.getInstance().getHTML())
    }
   
    console.log(content)
      // Toast-UI Editor 에 HTML 표시
  // useEffect(() => {
  //   // 1. DB에서 가져온 HTML이라고 가정
  //   const htmlString = '<h1>h1 제목</h1> <p>p 내용</p>';

  //   // 2. Editor DOM 내용에 HTML 주입
  //   editorRef.current?.getInstance().setHTML(htmlString);
  //   // editorRef.current?.getInstance().setHTML(data[2]?.content);
  // }, []);
  return (
    <Wrap>
    <Editor
        ref={editorRef}
        onChange={onChange}
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="450px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        hideModeSwitch={true}  // 한가지 입력모드만 사용하도록!
        useCommandShortcut={false} // 키보드 입력 컨트롤 방지
        plugins={[colorSyntax]}
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
        ]}
        language="ko-KR" // 도구설명 한글
        // hooks={{
        //     addImageBlobHook : async (blob, callback) => {
        //         console.log(blob)
        //         const formData = new FormData()
        //         formData.append('image',blob)
        //         const imageUrl = await instance.post('/image',formData,{
        //           headers:{
        //             "Content-Type": "multipart/form-data",
        //           }
        //         }).then((res)=>{
        //           console.log(res.data)
        //           return res.data
        //         }
        //         )
        //         callback(imageUrl,'이미지')
        //     }
        // }}
      ></Editor>
        {/* <Test content={content}></Test> */}
      <Button disabled={!title || !thumbnail || content==='<p><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p>'} onClick={()=>{
        createPost.mutate()
      }}>완료</Button>
    </Wrap>
  );
};

const Wrap = styled.div`
    width: 80%;
    /* height: 300px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 50px;
`
const Button = styled.button`
    margin: 30px auto;
    width: 50%;
    height: 30px;
    border: none;
    font-size: 15px;
    cursor: pointer;
`
export default PostEditer;
