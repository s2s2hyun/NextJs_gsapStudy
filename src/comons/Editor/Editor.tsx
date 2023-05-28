// @ts-nocheck
import React, {
  ChangeEvent,
  MutableRefObject,
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
import Quill from "quill";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  {
    ssr: false,
  }
);

interface EditorProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const Editor = React.memo(
  ({ description, setDescription }: EditorProps) => {
    const quillRef = useRef<MutableRefObject<null>>(null);
    // const [editorValue, setEditorValue] = useState<string>(description);

    const imageHandler = useCallback(async () => {
      const fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute("accept", "image/*");
      fileInput.click();

      fileInput.addEventListener("change", async (e) => {
        const file = fileInput.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await axios.post(
            "http://localhost:8080/boards/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log(response.data);
          const imageUrl = "http://localhost:8080" + response.data.imageUrl;
          console.log(imageUrl);
          const range = quillRef.current?.getEditor().getSelection()?.index;

          if (range !== null && range !== undefined) {
            const quill = quillRef.current?.getEditor();
            quill?.setSelection(range, 1);
            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src="${imageUrl}"/>` // assuming response.data.url is the URL of the uploaded image
            );
          }
        } catch (error: any) {
          alert(error.message);
        }
      });
    }, []);

    const handleChange = (value: string) => {
      setDescription(value);
    };

    const modulesWithImageHandler = {
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
          ["image", "video", "link"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };

    return (
      <Wrapper>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          modules={modulesWithImageHandler}
          forwardedRef={quillRef}
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
`;
