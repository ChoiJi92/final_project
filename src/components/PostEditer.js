import React, { useEffect, useRef } from "react";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";
// toast-ui Viewer import
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
// toast-ui color import
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// toast-ui kor import
import '@toast-ui/editor/dist/i18n/ko-kr'

const PostEditer = ({setContent,setPreImages,content,setEditorImage}) => {
    const editorRef = useRef();
    const onChange = ()=>{
        setContent(editorRef.current?.getInstance().getHTML())
    }
      // Toast-UI Editor 에 HTML 표시
  useEffect(() => {
    const htmlString = content;
    editorRef.current?.getInstance().setHTML(htmlString);
  }, []);
  return (
    <Wrap>
    <Editor
        ref={editorRef}
        onChange={onChange}
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="500px" // 에디터 창 높이
        initialEditType="wysiwyg"// 초기 입력모드 설정(디폴트 markdown)
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
                const imageUrl = URL.createObjectURL(blob)
                setPreImages((prevState)=>[...prevState,imageUrl])
                setEditorImage((prevState)=>[...prevState,blob])
                callback(imageUrl,"이미지")
            }
        }}
      ></Editor>
    </Wrap>
  );
};

const Wrap = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 48px;
    .toastui-editor-contents p {
  font-size: 16px;
}
`
export default PostEditer;
