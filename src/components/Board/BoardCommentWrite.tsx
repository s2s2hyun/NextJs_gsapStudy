import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Box, styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useMutation, useQueryClient } from "react-query";
import Container from "@mui/material/Container";
interface CustomError extends Error {
  message: string;
}

interface BoardCommentProps {
  id: string;
}

interface CommentWriteData {
  content: string;
  email: string;
  nickname: string;
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
  },
  width: "100%",
  minWidth: "300px",
  paddingBottom: "1rem",
}));

const CustomEmailTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
  },
  width: "50%",
  minWidth: "200px",
  paddingBottom: "1rem",
}));

const CustomNickNameTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
  },
  width: "50%",
  minWidth: "200px",
  paddingBottom: "1rem",
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function BoardComment({ id }: BoardCommentProps) {
  const [commentData, setCommentData] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentNickName, setCommentNickName] = useState("");

  // refetch-query
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, CommentWriteData>(
    (newComment) =>
      axios.post(`http://localhost:8080/boards/${id}/comments`, newComment),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("commentList");
        setCommentData("");
        setCommentEmail("");
        setCommentNickName("");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지합니다.

    const commentWriteData = {
      content: commentData,
      email: commentEmail,
      nickname: commentNickName,
    };

    mutation.mutate(commentWriteData);
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px 0 ",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" component="h5" sx={{ margin: "20px 0" }}>
          댓글 제출
        </Typography>
        <Typography sx={{ fontWeight: "normal", paddingBottom: "20px" }}>
          이메일 주소는 공개되지 않습니다. 필수 필드는 *로 표시됩니다.
        </Typography>
      </Box>
      <div>
        <form onSubmit={submitComment}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <CustomTextField
              label="*댓글*"
              value={commentData}
              onChange={(e) => setCommentData(e.target.value)}
              multiline
            />
            <CustomEmailTextField
              label="*이메일*"
              value={commentEmail}
              onChange={(e) => setCommentEmail(e.target.value)}
            />
            <CustomNickNameTextField
              label="*닉네임*"
              value={commentNickName}
              onChange={(e) => setCommentNickName(e.target.value)}
            />
          </Box>
          <label>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox {...label} />
              <Typography>
                다음 번 댓글 작성을 위해 이 브라우저에 이름, 이메일, 그리고
                웹사이트를 저장합니다.
              </Typography>
            </Box>
          </label>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "20px",
                color: "#4a5568",
                padding: "20px 30px",
                border: "0",
                borderRadius: "5px",
                background: "#dfe5ed",
                transition: "color 0.2s, background 0.2s",
                "&:hover": {
                  color: "#fff",
                  background: "#8d99ff",
                  transition: "color 0.2s, background 0.2s",
                },
              }}
              type="submit"
            >
              코멘트 제출
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  );
}
