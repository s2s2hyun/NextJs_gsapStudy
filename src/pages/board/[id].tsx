import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import arrowImg from "@/assets/icon/arrow_back.png";
import Image from "next/image";

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

export default function BoardDetailPage() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [board, setBoard] = useState<{
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/boards/${id}`)
        .then((res) => {
          setBoard(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  /// 수정하기

  const [isEditing, setIsEditing] = useState(false);

  const editBoard = () => {
    setIsEditing(!isEditing);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setDescription(board.description);
    }
  }, [board]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id) {
      try {
        await axios.put(`http://localhost:8080/boards/${id}`, {
          title,
          description,
        });

        // Update the board state variable
        setBoard({ title, description });

        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
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
      <Image
        src={arrowImg}
        alt="back"
        style={{
          position: "absolute",
          top: "3rem",
          left: "2rem",
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      />
      <h1 className={classes.customText}>게시글 </h1>
      {isEditing ? (
        <>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            onSubmit={handleUpdate}>
            <h4>Title</h4>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <h4>Description</h4>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button style={{ marginTop: "3rem" }}>Update</button>
          </form>
        </>
      ) : (
        <>
          {board ? (
            <div>
              <h2 className={classes.customText}>{board.title}</h2>
              <p className={classes.customText}>{board.description}</p>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <h2 onClick={editBoard} style={{ cursor: "pointer" }}>
            수정하기
          </h2>
        </>
      )}
    </section>
  );
}
