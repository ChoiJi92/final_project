import React from "react";
import {Editor} from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css"
 
const HostEditor = () => {
    return(
        <Editor initialValue="내용을 적어주세요!"
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={false}>
        </Editor>
    );
};

export default HostEditor;