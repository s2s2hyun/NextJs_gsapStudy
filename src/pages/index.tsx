import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "@/store/feature/modalSlice";
import { RootState } from "@/store/store";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import styled from "@emotion/styled";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/ilb/auth";

interface Board {
  id: string;
  title: string;
  description: string;
  status: string;
}

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

export default function Home() {
  const classes = useStyles();
  const [boardList, setBoardList] = useState<Board[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8080/boards")
      .then((res) => {
        setBoardList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const router = useRouter();

  const handleBoardClick = (id: string) => {
    router.push(`/board/${id}`);
  };

  return (
    <>
      <LayHeader />
      <main
        className={classes.customBackground}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={classes.customText} style={{ paddingBottom: "5rem" }}>
          게시글 제목
        </div>
        <div
          className={classes.customText}
          style={{ paddingBottom: "3em", cursor: "pointer" }}
          onClick={() => router.push("/boardWrite")}
        >
          글쓰기
        </div>
        <div className={classes.customText}>
          {boardList.map((board) => {
            return (
              <div
                key={board.id}
                style={{ cursor: "pointer", padding: "1rem" }}
              >
                <div onClick={() => handleBoardClick(board.id)}>
                  {board.title}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

const LayHeader = () => {
  const username = useSelector((state: RootState) => state.user.username);
  return <div>username:{username}</div>;
};
