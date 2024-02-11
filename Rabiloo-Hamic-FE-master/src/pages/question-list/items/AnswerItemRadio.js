import React from "react";
import { FormControlLabel, Radio } from "@mui/material";
import { AppRadio } from "../../../components";

import { useContext } from "react";
import { QuestionItemContext } from "./QuestionItem";

export function AnswerItemRadio({ answer, control, questionNumber }) {
  const { radioStyles } = useContext(QuestionItemContext);

  return (
    <AppRadio
      control={control}
      name={`${questionNumber}`}
      required
      children={
        <>
          {answer.map((i) => {
            return (
              <FormControlLabel
                style={radioStyles}
                key={i.content}
                value={i.content}
                control={<Radio />}
                label={i.content}
              />
            );
          })}
        </>
      }
    />
  );
}
