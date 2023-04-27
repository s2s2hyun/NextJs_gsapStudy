import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  customText: {
    color: theme.palette.text.primary,
    textAlign: "center",
  },
  customBackground: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh", // Optional: to cover the full viewport height
  },
}));

export default function BoardWrite() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/boards", {
        title,
        description,
      });

      console.log(response.data);

      // 게시글 작성후 본인이 작성한 게시글 Detail 로 바로 이동
      const postId = response.data.id;
      router.push(`/board/${postId}`);
      // Redirect to the main page or any other page after successful creation
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section
      className={classes.customBackground}
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <div>BoardWrite</div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <h4>title</h4>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}></input>
        <h4>description</h4>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}></input>
        <button style={{ marginTop: "3rem" }} type="submit">
          전송
        </button>
      </form>
    </section>
  );
}
