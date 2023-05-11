import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "@/store/feature/modalSlice";
import { RootState } from "@/store/store";
import ConfirmModal from "@/components/Modal/LoginModal";
// import styled from "@emotion/styled";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/ilb/auth";
import Head from "next/head";
import { styled } from "@mui/system";
import { login, logout } from "@/store/feature/userSlice";
import LoginModalPage from "@/components/Modal/LoginModal";

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

const CustomBackground = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const LayHeaderCustomBackground = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
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
          onClick={() => router.push("/boardWrite")}>
          글쓰기
        </CustomText>
        <CustomText>
          {boardList.map((board) => {
            return (
              <CustomText
                key={board.id}
                style={{ cursor: "pointer", padding: "1rem" }}>
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
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const username = useSelector((state: RootState) => state.user.username);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [isLoginModalOpen, setIsLogginModalOpen] = useState<boolean>(false);

  const handleLoginClick = () => {
    setIsLogginModalOpen(!isLoginModalOpen);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 로그아웃시 useEffect
  // useEffect(() => {
  //   // This will be executed whenever isLoggedIn state changes
  //   console.log("isLoggedIn changed:", isLoggedIn);
  // }, [isLoggedIn]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/auth/userInfo",
          {
            withCredentials: true,
          }
        );
        console.log(response.data.username);
        dispatch(login({ username: response.data.username }));
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // 401 Unauthorized 에러 발생시 로그아웃 처리
          dispatch(logout());
        } else {
          console.error(error);
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:8080/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(logout());
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <LayHeaderCustomBackground>
        <CustomText>
          {isClient && (
            <>
              {isLoggedIn ? (
                <>
                  username:{username}
                  <CustomText onClick={handleLogout}>logout</CustomText>
                </>
              ) : (
                <>
                  <CustomText onClick={handleLoginClick}>login</CustomText>
                  <CustomText onClick={() => router.push("/signup")}>
                    signup
                  </CustomText>
                </>
              )}
            </>
          )}
        </CustomText>
      </LayHeaderCustomBackground>
      {isLoginModalOpen ? (
        <LoginModalPage
          setIsLogginModalOpen={setIsLogginModalOpen}
          isLoginModalOpen={isLoginModalOpen}
        />
      ) : null}
    </>
  );
};
