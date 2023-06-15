import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import arrowImg from "@/assets/icon/arrow_back.png";
import Image from "next/image";
import BoardComment from "@/components/Board/BoardCommentWrite";
import BoardCommentList from "@/components/Board/BoardCommentList";
import { Typography } from "@mui/material";
import { TypographyProps } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
SwiperCore.use([Navigation, Pagination]);
type SwiperRef = typeof Swiper | null;
const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  paddingTop: "6rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",
}));

const InnerContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const TitleTypo = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  lineHeight: "0",
}));

const PrevButton = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  zIndex: "2",
  // width: "30px",
  // height: "30px",
  // backgroundImage: `url('/assets/arr-left-circle.4d4550b.svg')`,
  // backgroundSize: "cover",
}));

const NextButton = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  zIndex: "2",
  // width: "30px",
  // height: "30px",
  // backgroundImage: `url('/assets/arr-right-circle.e115a60.svg')`,
  // backgroundSize: "cover",
}));

export default function BoardDetailPage() {
  const router = useRouter();
  const swiperRef = useRef<SwiperRef>(null);
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [board, setBoard] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const [allImageSrcs, setAllImageSrcs] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/boards/${id}`)
        .then((res) => {
          setBoard(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  /// 수정하기

  const [isEditing, setIsEditing] = useState(false);

  const editBoard = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (board) {
      setTitle(board.title);

      const imgSrcRegex = /<img[^>]+src="?([^"\n]+)"?[^>]*>/g;

      const matches = Array.from(
        board.description.matchAll(imgSrcRegex),
        (m) => m[1]
      );

      setAllImageSrcs(matches);

      const noImageDescription = board.description.replace(imgSrcRegex, "");

      setDescription(noImageDescription);
    }
  }, [board]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id) {
      try {
        await axios.put(`http://localhost:8080/boards/${id}`, {
          title,
          description,
        });

        // Update the board state variable
        setBoard({ title, description });

        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  console.log(allImageSrcs, "allImageSrcs ");

  return (
    <Wrapper>
      <Container maxWidth="xl">
        <InnerContainer>
          {/* <TitleTypo variant="h1">게시글</TitleTypo> */}
          {isEditing ? (
            <>
              <form
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                onSubmit={handleUpdate}>
                <h4>Title</h4>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <h4>Description</h4>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button style={{ marginTop: "3rem" }}>Update</button>
              </form>
            </>
          ) : (
            <>
              {board ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <div
                    style={{
                      position: "relative",
                      maxWidth: "30%",
                      minWidth: "480px",
                      margin: "0 auto",
                      flex: "1",
                    }}>
                    <h2>
                      Title:{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: board.title,
                        }}></span>
                    </h2>
                    {allImageSrcs.length > 0 ? (
                      <>
                        <Swiper
                          spaceBetween={25}
                          slidesPerView={1}
                          loop={true}
                          pagination={true}
                          navigation={false}
                          modules={[Pagination, Navigation]}
                          onSwiper={(swiper: any) =>
                            (swiperRef.current = swiper)
                          }>
                          {allImageSrcs.map((src, index) => (
                            <SwiperSlide key={index}>
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  overflow: "hidden",
                                }}>
                                <img
                                  src={src}
                                  alt={`Slide ${index}`}
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <PrevButton onClick={handlePrevSlide}>
                          <img
                            src="/assets/arr-left-circle.4d4550b.svg"
                            alt="bt_next"
                            style={{ cursor: "pointer" }}
                          />
                        </PrevButton>
                        <NextButton onClick={handleNextSlide}>
                          <img
                            src="/assets/arr-right-circle.e115a60.svg"
                            alt="bt_next"
                            style={{ cursor: "pointer" }}
                          />
                        </NextButton>
                      </>
                    ) : null}
                    <p>
                      Contents:{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: description,
                        }}></span>
                    </p>
                  </div>
                </div>
              ) : (
                // 동적렌더링 데이터 패칭을 하는동안 load 으로 표기
                <div>Loading...</div>
              )}
              <h2 onClick={editBoard} style={{ cursor: "pointer" }}>
                수정하기
              </h2>
            </>
          )}
          <BoardComment />
          {/* <BoardCommentList /> */}
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}
