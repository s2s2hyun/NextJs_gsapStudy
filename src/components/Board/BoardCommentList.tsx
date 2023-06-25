import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, styled } from "@mui/system";
import Image from "next/image";

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
            {/* 댓글 캐릭터사진 추가 예정 */}
            {/* Next Image 이미지 파일 선택해야하는데 저작권 없는걸로 찾기 어렵네  */}
            {/* <Image alt="comment_img_random" /> */}
            <p>{comment.content}</p>
            <p>{comment.nickname}</p>
          </div>
        ))}
      </div>
    );
  }

  return <div>No comments available</div>; // 모든 경우를 처리하기 위한 기본 반환
}
