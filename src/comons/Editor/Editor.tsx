import React, { useEffect, useRef, useState } from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface EditorProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const Editor = ({ description, setDescription }: EditorProps) => {
  // const [state, setState] = useState<{ value: string }>({ value: "" });
  const quillRef = useRef<any>(null);

  const imageHandler = () => {
    console.log("The handler starts when the image button is clicked!");

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];

      if (file) {
        const formData = new FormData();
        formData.append("img", file);

        try {
          const result = await axios.post(
            "http://localhost:8080/boards",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Set the Content-Type header
              },
            }
          );
          console.log("Data sent by the backend on success", result.data.url);
          const IMG_URL = result.data.url;

          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", IMG_URL);
        } catch (error) {
          console.log("Error occurred", error);
        }
      }
    });
  };

  const handleChange = (value: string) => {
    setDescription(value);
  };

  return (
    <Wrapper>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={description}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={{
          ...modules,
          toolbar: {
            ...modules.toolbar,
            image: imageHandler,
          },
        }}
        formats={formats}
        ref={quillRef}
      />
    </Wrapper>
  );
};

export default Editor;

const Wrapper = styled.div`
  width: 1086px;
  margin: 0 auto;
  .ql-editor {
    min-height: 400px;
  }
`;
