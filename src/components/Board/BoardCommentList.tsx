import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, styled } from "@mui/system";
import Image, { StaticImageData } from "next/image";
import CommentPic1 from "@/assets/icon/Avatar 3.png";
import CommentPic2 from "@/assets/icon/Avatar 4.png";
import CommentPic3 from "@/assets/icon/Avatar 6.png";
import CommentPic4 from "@/assets/icon/Avatar 10.png";
import CommentPic5 from "@/assets/icon/Avatar 11.png";
import CommentPic6 from "@/assets/icon/Avatar 12.png";
import CommentPic7 from "@/assets/icon/Avatar 14.png";
import CommentPic8 from "@/assets/icon/Avatar 15.png";
import CommentPic9 from "@/assets/icon/Avatar 16-1.png";
import CommentPic10 from "@/assets/icon/Avatar 16.png";
import CommentPic11 from "@/assets/icon/Avatar 20.png";
import CommentPic12 from "@/assets/icon/Avatar 21.png";
import CommentPic13 from "@/assets/icon/Avatar 22.png";
import CommentPic14 from "@/assets/icon/Avatar 23.png";
import CommentPic15 from "@/assets/icon/Avatar 28.png";
import CommentPic16 from "@/assets/icon/Avatar 29.png";
import CommentPic17 from "@/assets/icon/Avatar 30.png";
import DefaultPic from "@/assets/icon/Avatar 30.png";

interface BoardCommentProps {
  id: string;
}

interface Comment {
  content: string;
  nickname: string;
  pic: string;
}

interface CustomError extends Error {
  message: string;
}

export default function BoardCommentList({ id }: BoardCommentProps) {
  const imageMap: Record<string, StaticImageData> = {
    pic1: CommentPic1,
    pic2: CommentPic2,
    pic3: CommentPic3,

    pic4: CommentPic4,
    pic5: CommentPic5,
    pic6: CommentPic6,
    pic7: CommentPic7,
    pic8: CommentPic8,
    pic9: CommentPic9,
    pic10: CommentPic10,
    pic11: CommentPic11,
    pic12: CommentPic12,
    pic13: CommentPic13,
    pic14: CommentPic14,
    pic15: CommentPic15,
    pic16: CommentPic16,
    pic17: CommentPic17,
  };

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
    // console.log(data, "data 는 배열에 어떻게 나와? ");
    return (
      <div>
        {data.map((comment: Comment, index: number) => {
          const commentPic =
            comment.pic in imageMap ? imageMap[comment.pic] : DefaultPic;

          return (
            <div key={index}>
              <Image src={commentPic} alt="comment_img_random" />
              <p>{comment.content}</p>
              <p>{comment.nickname}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return <div>No comments available</div>; // 모든 경우를 처리하기 위한 기본 반환
}
