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

interface Board {
  id: string;
  title: string;
  description: string;
  status: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  customText: {
    color: theme.palette.text.primary,
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

  console.log(boardList, "boardList 나와라");
  return (
    <>
      <main
        className={classes.customBackground}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <div className={classes.customText}>메인페이지</div>
        <div className={classes.customText}>
          {boardList.map((board) => {
            return (
              <div key={board.id}>
                <div>{board.title}</div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
