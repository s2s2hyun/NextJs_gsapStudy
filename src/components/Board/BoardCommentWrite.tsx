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
      <div>
        <CustomTextField label="Board Comments" />
        <button style={{ padding: "0.85rem" }} type="submit">
          작성
        </button>
      </div>
    </div>
  );
}
