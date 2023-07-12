import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import { Box, styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip"; // Add this line
import { useQuery } from "react-query";
import axios from "axios";
import { formatDistanceToNow, format, parse } from "date-fns";
import { enUS, ko } from "date-fns/locale";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
interface CustomError extends Error {
  message: string;
}

interface DataItem {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  description: string;
  commentCount: number;
  writer: string;
}

const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  //   height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",
  paddingTop: "30px",
}));

const InnerContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const CardArticle = styled("article")(({ theme }) => ({
  padding: "10px",

  transition: "transform 0.5s ease",
  "&:hover": {
    transform: "translateY(-10px)",
  },
}));

const ItemCard = styled(Card)(({ theme }) => ({
  background: "#fff",
}));

const ItemCardContents = styled(CardContent)(({ theme }) => ({
  padding: "24px , 26px",
}));

const ImgGalleryCtr = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: "1rem",
  paddingBlock: "6vh",
}));

const ImgGalleryContent = styled("div")(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  borderRadius: "0.5rem",
  marginBottom: "1em",
  maxWidth: "800px",
  width: "100%",
  marginInline: "auto",
  overflow: "hidden",
  flex: 1,
  transition: "flex 0.5s ease-in-out",
  "&:hover": {
    flex: 5,
  },
}));

const Image = styled("img")({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    // other styles...
    cursor: "pointer",
    paddingLeft: "1.5rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// gsap.registerPlugin(Flip);
// 사진 첫번째 description 에 이미지 태그만 골라내기
const extractFirstImageURL = (description: string): string | null => {
  const regex = /<img[^>]+src="([^">]+)"/;
  const match = description.match(regex);
  return match ? match[1] : null;
};

// description 에 이미지, 각종 태그들 전부 걸러내고 오직 텍스트만 보이는 방법
// &nbsp;는 HTML에서 공백 문자를 나타내는 엔티티 코드입니다. 따라서 이 코드를 제거하여 해당 공백 문자를 숨길 수 있습니다.
const stripHtmlTags = (html: string): string => {
  const regex = /(<([^>]+)>)/gi;
  const strippedHtml = html.replace(regex, "");
  const strippedText = strippedHtml.replace(/&nbsp;/g, " ");
  return strippedText;
};

const BoardItem = ({
  id,
  title,
  category,
  description,
  createdAt,
  commentCount,
  writer,
}: DataItem) => {
  const firstImageURL = extractFirstImageURL(description);

  return (
    <CardArticle>
      <ItemCard>
        {firstImageURL && (
          <div style={{ padding: "20px" }}>
            <a>
              <img
                src={firstImageURL}
                alt="First Image"
                style={{ width: "320px", height: "250px" }}
                // sizes="(max-width: 479px) 479px, 100vw"
                // width="400"
                // height="250"
              />
            </a>
          </div>
        )}
        <ItemCardContents>
          <h2>
            <a style={{ fontSize: "20px" }}>{title}</a>
          </h2>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
              gap: "4px",
              color: "#718096!important",
              lineHeight: "140%",
            }}>
            <p>작성자 {writer.toUpperCase()}</p> <span> | </span>
            <p>{createdAt}</p>
            <span> | </span>
            <p>{category}</p>
          </Box>
          <p
            style={{
              fontSize: "12px",
              color: "#718096",
              lineHeight: "140%",
            }}>
            {commentCount}댓글
          </p>
          <p
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              fontSize: "14px",
              color: "#718096",
              // @ts-ignore
              "-webkit-line-clamp": "3",
              "-webkit-box-orient": "vertical",
            }}>
            {stripHtmlTags(description)}
          </p>
        </ItemCardContents>
      </ItemCard>
    </CardArticle>
  );
};

export default function Board() {
  const locale = "ko";
  const router = useRouter();
  const imageContainerRef = useRef<HTMLImageElement | null>(null);
  // const [images, setImages] = useState([
  //   "https://i.pinimg.com/564x/d7/1f/de/d71fdefc2807e04725c36c1be25c8de4.jpg",
  //   "https://images.unsplash.com/photo-1619087940820-d3fcb8a26b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  //   "https://images.unsplash.com/photo-1599669846660-945c5c775181?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=8",
  //   "https://images.unsplash.com/photo-1682687220015-186f63b8850a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80",
  //   "https://media.cnn.com/api/v1/images/stellar/prod/201221102826-airpods-max.jpg?q=x_2,y_0,h_1130,w_2008,c_crop/h_540,w_960/f_webp",
  //   "https://images.pexels.com/photos/3721098/pexels-photo-3721098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   "https://i.pinimg.com/564x/74/16/9d/74169d2c69f5ec4a1be705b928940165.jpg",
  //   "https://i.pinimg.com/564x/f7/0c/a0/f70ca0ff3073bbe93cd4584fbbc35ecd.jpg",
  // ]);
  // const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  // get reference to the image container and its children
  // const shuffleImages = () => {
  //   // get reference to the image container and its children
  //   const grid = imageContainerRef.current;
  //   const items = grid ? Array.from(grid.children) : [];

  //   // get the current state
  //   const state = Flip.getState(items);

  //   // shuffle
  //   for (let i = items.length - 1; i >= 0; i--) {
  //     if (grid) {
  //       grid.appendChild(items[Math.floor(Math.random() * (i + 1))]);
  //     }
  //   }

  //   // animate the changes
  //   Flip.from(state, {
  //     absolute: true,
  //     duration: 1,
  //     ease: "power1.inOut",
  //   });
  // };

  const fetchBoards = async () => {
    const response = await axios.get("http://localhost:8080/boards");
    return response.data;
  };

  const { data, isLoading, error } = useQuery("boards", fetchBoards);
  //  useQuery 비동기 처리 6/4 리액트쿼리

  console.log(data, " data : 는 ? ");

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    const errorMessage = (error as CustomError).message;
    return "An Error has occurred: " + errorMessage;
  }
  if (data && data.length > 0) {
    const createdAt = new Date(data[0].createdAt);
    const formattedTime = formatDistanceToNow(createdAt, { addSuffix: true });
    console.log(formattedTime); // Example: '2 hours ago', '5 minutes ago'
  }

  return (
    <Wrapper>
      <Container maxWidth="xl">
        <InnerContainer>
          {/* <ImgGalleryCtr ref={imageContainerRef}>
            {images.map((src, index) => (
              <ImgGalleryContent key={src}>
                <Image
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={src}
                  alt="cover"
                />
              </ImgGalleryContent>
            ))}
          </ImgGalleryCtr>
          <button onClick={shuffleImages} style={{ marginBottom: "5vh" }}>
            Shuffle
          </button> */}
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {data.map((item: DataItem) => {
              const createdAt = new Date(item.createdAt);
              const formattedTime = createdAt.toLocaleString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3.2}>
                  <BoardItem
                    id={item.id}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    createdAt={formattedTime}
                    commentCount={item.commentCount}
                    writer={item.writer}
                  />
                </Grid>
              );
            })}
          </Grid>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}
