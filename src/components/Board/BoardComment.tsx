import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
  },
}));

export default function BoardComment() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}>
      BoardComment
      <CustomTextField label="Board Comments" />
    </div>
  );
}
