import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import axios from "axios";
import Quill, { RangeStatic } from "quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const Editor = React.memo(
  ({ description, setDescription }: EditorProps) => {
    const editorInstance = useRef<Quill | null>(null);
    const [editorValue, setEditorValue] = useState<string>(description);
    const [ignoreChange, setIgnoreChange] = useState<boolean>(false);
    const quillRef = useRef<any>(null);

    const imageHandler = useCallback(async () => {
      try {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "image/*");

        await new Promise((resolve) => {
          fileInput.addEventListener("change", (e) => resolve(e));
          fileInput.click();
        });

        const file = fileInput.files[0];
        console.log(file, "파일");

        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          "http://localhost:8080/boards/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = "http://localhost:8080" + response.data.imageUrl;
        console.log(imageUrl, "imageUrl");
        console.log(editorInstance.current, "editorInstance.current");
        if (editorInstance.current) {
          const range = editorInstance.current.getSelection(true);
          console.log(range, "range get()");
          editorInstance.current.insertEmbed(
            range?.index + 1 || 0,
            "image",
            imageUrl
          );
        }
      } catch (error) {
        console.error(error);
      }
    }, []);

    useEffect(() => {
      if (quillRef.current && quillRef.current.editor) {
        editorInstance.current = quillRef.current.editor;
      }
    }, []);

    const handleChange = (value: string) => {
      setEditorValue(value);
      setDescription(value);
    };

    const modulesWithImageHandler = useMemo(
      () => ({
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: ["small", false, "large", "huge"] }, { color: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
              { align: [] },
            ],
            [
              // "image",
              "video",
            ],
          ],
          handlers: {
            // 위에서 만든 이미지 핸들러 사용하도록 설정
            image: imageHandler,
          },
        },
      }),
      [imageHandler]
    );

    return (
      <Wrapper>
        <ReactQuill
          theme="snow"
          value={editorValue}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          modules={modulesWithImageHandler}
          ref={quillRef}
        />
      </Wrapper>
    );
  }
);

export default Editor;

const Wrapper = styled.div`
  width: 1086px;
  margin: 0 auto;
  .ql-editor {
    min-height: 400px;
  }
  .ql-toolbar.ql-snow:nth-of-type(1) {
    display: none;
  }
`;
