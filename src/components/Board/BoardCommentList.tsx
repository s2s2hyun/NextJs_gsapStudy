import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, styled } from "@mui/system";

interface BoardCommentProps {
  id: string;
}

interface CustomError extends Error {
  message: string;
}

export default function BoardCommentList({ id }: BoardCommentProps) {
  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:8080/boards/${id}/comments`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery("commentList", fetchComments);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage = (error as CustomError).message;
    return <div>An Error has occurred: {errorMessage}</div>;
  }

  if (data) {
    return (
      <div>
        {data.map((comment, index) => (
          <div key={index}>
            <p>{comment.content}</p>
            <p>{comment.nickname}</p>
          </div>
        ))}
      </div>
    );
  }

  return <div>No comments available</div>; // 모든 경우를 처리하기 위한 기본 반환
}
