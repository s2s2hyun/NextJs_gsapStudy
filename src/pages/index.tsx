import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "@/store/feature/modalSlice";
import { RootState } from "@/store/store";
import ConfirmModal from "@/components/Modal/ConfirmModal";
// import styled from "@emotion/styled";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/ilb/auth";
import Head from "next/head";
import { styled } from "@mui/system";

interface Board {
  id: string;
  title: string;
  description: string;
  status: string;
}

// const useStyles = makeStyles((theme: Theme) => ({
//   customText: {
//     color: theme.palette.text.primary,
//     textAlign: "center",
//     cursor: "pointer",
//   },
//   customBackground: {
//     backgroundColor: theme.palette.background.default,
//     minHeight: "100vh", // Optional: to cover the full viewport height
//   },
// }));

const CustomText = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: "center",
  cursor: "pointer",
}));

const CustomBackground = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

export default function Home() {
  // const classes = useStyles();
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
      <CustomBackground>
        <CustomText style={{ paddingBottom: "5rem" }}>게시글 제목</CustomText>
        <CustomText
          style={{ paddingBottom: "3em", cursor: "pointer" }}
          onClick={() => router.push("/boardWrite")}
        >
          글쓰기
        </CustomText>
        <CustomText>
          {boardList.map((board) => {
            return (
              <CustomText
                key={board.id}
                style={{ cursor: "pointer", padding: "1rem" }}
              >
                <div onClick={() => handleBoardClick(board.id)}>
                  {board.title}
                </div>
              </CustomText>
            );
          })}
        </CustomText>
      </CustomBackground>
    </>
  );
}

const LayHeader = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const username = useSelector((state: RootState) => state.user.username);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div>
        <div>
          {isClient && (
            <>
              username:{username}
              {isLoggedIn ? (
                <>
                  <CustomText>logout</CustomText>
                </>
              ) : (
                <>
                  <CustomText onClick={() => router.push("/login")}>
                    login
                  </CustomText>
                  <CustomText onClick={() => router.push("/signup")}>
                    signup
                  </CustomText>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
