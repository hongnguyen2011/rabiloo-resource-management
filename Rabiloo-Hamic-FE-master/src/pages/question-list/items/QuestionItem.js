import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useForm, useFormContext } from "react-hook-form";
import { AnswerItemInput } from "./AnswerItemInput";
import { AnswerItemRadio } from "./AnswerItemRadio";
import { AnswerItemCheckbox } from "./AnswerItemCheckbox";

import { createContext } from "react";
export const QuestionItemContext = createContext();

function QuestionItem(props) {
  const { control } = useFormContext();
  const { question } = props;
  //Them style cho cac answer vao trong các object duoi đây
  const inputStyles = {
    padding: "12px 40px ",
    paddingbottom: "20px",
  };
  const radioStyles = {
    padding: "12px 40px",
    paddingbottom: "20px",
  };
  const checkboxStyles = {
    padding: "12px 40px",
    paddingbottom: "20px",
  };
  const contextValues = {
    inputStyles,
    radioStyles,
    checkboxStyles,
  };
  const renderAnswer = () => {
    const answer = question.answerList;
    const questionNumber = question.number;
    if (question.type === "input") {
      return (
        <AnswerItemInput
          answer={answer}
          control={control}
          questionNumber={questionNumber}
        />
      );
    }
    if (question.type === "radio") {
      return (
        <AnswerItemRadio
          answer={answer}
          control={control}
          questionNumber={questionNumber}
        />
      );
    }
    return (
      <AnswerItemCheckbox
        answer={answer}
        control={control}
        questionNumber={questionNumber}
      />
    );
  };
  console.log(contextValues);
  return (
    <QuestionItemContext.Provider value={contextValues}>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "#fff",
          color: "#000",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderStyle: "groove",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={1}
            sx={{
              padding: "40px 10px 10px 0px",
            }}
          >
            {/* cau hoi so may */}
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              gutterBottom
              sx={{ paddingLeft: "20px" }}
            >
              {question.number}
            </Typography>
          </Grid>
          <Grid item xs={11} sx={{ padding: "40px 10px 10px 0px" }}>
            {/* noi dung cau hoi */}
            <Typography variant="h5" color="inherit" paragraph>
              {question.question}
            </Typography>
          </Grid>
          {/* hien thi cac cau tl dua theo type */}
          <Grid sx={{ width: "90%", paddingTop: 0 }}>{renderAnswer()}</Grid>
        </Grid>
      </Paper>
    </QuestionItemContext.Provider>
  );
}

export default QuestionItem;
