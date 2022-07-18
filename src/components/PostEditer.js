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
import instance from "../shared/axios";

const PostEditer = ({setContent,setImageKey,content}) => {
  // const [,setContent] = useRecoilState(contentState)
    const editorRef = useRef();
    const onChange = ()=>{
        // setContent(editorRef.current?.getInstance().getHTML())
        setContent(editorRef.current?.getInstance().getMarkdown())
        // console.log(editorRef.current?.getInstance().getHTML())
    }
      // Toast-UI Editor 에 HTML 표시
  useEffect(() => {
    // 1. DB에서 가져온 HTML이라고 가정
    const htmlString = content;

    // 2. Editor DOM 내용에 HTML 주입
    // editorRef.current?.getInstance().setHTML(htmlString);
    editorRef.current?.getInstance().setMarkdown(htmlString);
    // editorRef.current?.getInstance().setHTML(data[2]?.content);
  }, []);
  return (
    <Wrap>
    <Editor
        ref={editorRef}
        onChange={onChange}
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="500px" // 에디터 창 높이
        // initialEditType="wysiwyg"// 초기 입력모드 설정(디폴트 markdown)
        hideModeSwitch={true}  // 한가지 입력모드만 사용하도록!
        useCommandShortcut={false} // 키보드 입력 컨트롤 방지
        plugins={[colorSyntax]}
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['image'],
        ]}
        language="ko-KR" // 도구설명 한글
        hooks={{
            addImageBlobHook : async (blob, callback) => {
                console.log(blob)
                // const fileUrl = URL.createObjectURL(blob)
                let alt;
                const formData = new FormData()
                formData.append('images',blob)
                const imageUrl = await instance.post('post/images',formData,{
                  headers:{
                    "Content-Type": "multipart/form-data",
                  }
                }).then((res)=>{
                  console.log(res.data)
                  alt = res.data.postImageKEY[0]
                  return res.data.postImageURL[0]
                }
                )
                setImageKey((prevState)=>[...prevState,alt])
                callback(imageUrl,alt)
            }
        }}
      ></Editor>
    </Wrap>
  );
};

const Wrap = styled.div`
    width: 50%;
    /* width: 753px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 48px;
    .toastui-editor-contents p {
  font-size: 16px;
}
`
// const Button = styled.button`
//     margin: 30px auto;
//     width: 50%;
//     height: 30px;
//     border: none;
//     font-size: 15px;
//     cursor: pointer;
// `
export default PostEditer;
