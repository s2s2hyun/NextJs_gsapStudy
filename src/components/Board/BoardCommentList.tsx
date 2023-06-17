import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, styled } from "@mui/system";

export default function BoardCommentList() {
  // 대기
  // const fetchBoards = async () => {
  //   const response = await axios.post("대기");
  //   return response.data;
  // };

  // const { data, isLoading, error } = useQuery("boards", fetchBoards);
  // //  useQuery 비동기 처리 6/4 리액트쿼리

  // if (isLoading) {
  //   return "Loading";
  // }

  // if (error) {
  //   const errorMessage = (error as CustomError).message;
  //   return "An Error has occurred: " + errorMessage;
  // }
  // if (data) {

  //   console.log(data); // Example: '2 hours ago', '5 minutes ago'
  // }
  return <div>BoardCommentList</div>;
}
