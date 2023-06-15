import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import KakaoMapPageBoard from "@/components/Map/KakaoMap";
import DaumPostcode from "react-daum-postcode";
import { styled } from "@mui/system";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const Editor = dynamic(() => import("@/comons/Editor/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
// import Editor from "@/comons/Editor/Editor";

export default function BoardWrite() {
  // 다음 우편번호 스크립트가 Nextjs 서버사이드 렌더링과 충돌하는 경우 , 이 문제를 해결하기 위해
  // DaumPostCode 컴포넌트를 클라이언트 사이드에서만 렌더링 되도록 조건부 렌더링을 해야한다.
  const [isClient, setIsClient] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [isAddressOpen, setIsAddressOpen] = useState(false);
  // const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/boards", {
        title,
        description,
      });

      console.log(response.data);

      // 게시글 작성후 본인이 작성한 게시글 Detail 로 바로 이동
      const postId = response.data.id;
      router.push(`/board/${postId}`);
      // Redirect to the main page or any other page after successful creation
    } catch (error) {
      console.error(error);
    }
  };

  // 다음 카카오 지도는 패키지 설치로 스크립트를 추가할수없다.
  // 그래서 카카오 지도 관련된 필요한 컴포넌트에서만 useEffect 로 script 를 불러와주는게 가장좋다.

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (event: any) => {
    setCategory(event.target.value);
  };

  // const showModal = useCallback(() => {
  //   setIsAddressOpen(true);
  // }, []);

  // const closeModal = useCallback(() => {
  //   setIsAddressOpen(false);
  // }, []);

  // const handleComplete = useCallback((data: any) => {
  //   setAddress(data.address);
  //   // setAddressDetail(data.addressDetail); // Optional: if you want to get address detail
  //   closeModal();
  // }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Wrapper>
      <Container maxWidth="xl">
        <InnerContainer>
          {/* {isAddressOpen ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 999,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div id="daumLayer" style={{ zIndex: 1000 }}>
                <img
                  src="//t1.daumcdn.net/postcode/resource/images/close.png"
                  alt="닫기"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    zIndex: 1001,
                    cursor: "pointer",
                  }}
                  onClick={closeModal}
                />
                {isClient && <DaumPostcode onComplete={handleComplete} />}
              </div>
            </div>
          ) : null} */}
          <Box sx={{ margin: "1rem 0" }}>
            <Typography variant="h1" component="h2">
              게시글 작성
            </Typography>
          </Box>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <CustomSelect
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={category}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>
                  Placeholder
                </MenuItem>
                <MenuItem value={"javascript"}>javascript</MenuItem>
                <MenuItem value={"react"}>react</MenuItem>
                <MenuItem value={"r3f"}>r3f</MenuItem>
              </CustomSelect>
            </Box>
            <h4>title</h4>
            <TextField
              sx={{ width: "50%", minWidth: "250px" }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <h4>description</h4>
            <Editor description={description} setDescription={setDescription} />

            {/* <h4>address</h4>
            <input
              value={address}
              readOnly // 주소는 검색을 통해서만 변경 가능하도록 설정
            /> */}
            <Button
              sx={{
                fontFamily: "notokr",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "100%",
                color: "#4a5568",
                padding: "1.5rem 4rem",
                border: "0",
                borderRadius: "5px",
                background: "#dfe5ed",
                transition: "color 0.2s, background 0.2s",
                marginTop: "3rem",
                "&:hover": {
                  color: "#fff",
                  background: "#8d99ff",
                  transition: "color 0.2s, background 0.2s",
                },
              }}
              type="submit"
            >
              작성
            </Button>

            {/* <button style={{  }} type="submit">
              전송
            </button> */}
          </form>
          {/* <KakaoMapPageBoard address={address} width={600} height={400} />
          <button onClick={showModal}>우편번호 검색</button> */}
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled("section")(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  // height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "100px 0 ",
}));

const InnerContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  width: "200px", // 너비를 고정하려는 값
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  textAlign: "center",
}));
