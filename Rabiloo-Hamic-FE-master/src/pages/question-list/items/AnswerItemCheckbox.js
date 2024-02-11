import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { AppCheckbox } from "../../../components";

import { useContext } from "react";
import { QuestionItemContext } from "./QuestionItem";

export function AnswerItemCheckbox({ answer, control, questionNumber }) {
  const { checkboxStyles } = useContext(QuestionItemContext);

  return (
    <FormGroup>
      <Controller
        name={`${questionNumber}`}
        control={control}
        rules={{
          required: {
            value: true,
            message: "required",
          },
        }}
        render={({ field: { value, onChange } }) => {
          return (
            <>
              {answer.map((item) => {
                return (
                  <FormControlLabel
                    key={`${item.content}`}
                    control={
                      <Checkbox
                        style={checkboxStyles}
                        color="primary"
                        onChange={(e) => {
                          onChange({
                            ...value,
                            [`${item.content}`]: e.target.checked,
                          });
                        }}
                        checkboxStyles={{ padding: "40px 10px 10px 0px" }}
                      />
                    }
                    label={item.content}
                  />
                );
              })}
            </>
          );
        }}
      />
    </FormGroup>
  );
}
