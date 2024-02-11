import React from "react";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { AppRadio, AppTextField } from "../../../components";
import { REGREX } from "../../../utils";

export function AnswerItemInput({ questionNumber, control }) {
  return (
    <AppTextField
      sx={{ m: 2, width: "100%" }}
      name={`${questionNumber}`}
      control={control}
      fullWidth={true}
      required
      label={"Answer Here"}
      inputStyles={{ border: "1px solid black" }}
    />
  );
}
