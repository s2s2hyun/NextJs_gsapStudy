import React from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";

const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
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
export default function Board() {
  return (
    <Wrapper>
      <Container maxWidth="xl">
        <InnerContainer>
          <p>board</p>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}
