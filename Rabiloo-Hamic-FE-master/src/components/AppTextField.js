import { Grid, TextField, Typography } from "@mui/material";
import { Controller, useFormState } from "react-hook-form";
import { useAppLanguage } from "../hooks";
import { useContext } from "react";
import { QuestionItemContext } from "../pages/question-list/items/QuestionItem";

function AppTextField({
  control,
  name,
  rules,
  defaultValue,
  sx,
  autoFocus,
  label,
  fullWidth,
  item = false,
  xs,
  sm,
  required,
  variant, //filled, outlined, standard
  inputStyles,
  ...props
}) {
  const { errors } = useFormState({ control, name });
  const { Strings } = useAppLanguage();

  const isError = errors[name] && errors[name].message ? true : false;

  // const { inputStyles } = useContext(QuestionItemContext);

  return (
    <Grid sx={sx} item={item} sm={sm} xs={xs}>
      <Controller
        defaultValue={defaultValue || ""}
        name={name}
        control={control}
        rules={{
          required: { value: required, message: "this_field_is_required" },
          ...rules,
        }}
        render={({ field: { value, onChange } }) => {
          return (
            <TextField
              inputProps={{ style: { padding: "12px 20px", ...inputStyles } }}
              error={isError}
              value={value || ""}
              name={name}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              autoFocus={autoFocus}
              label={label}
              fullWidth={fullWidth}
              variant={variant}
              {...props}
            />
          );
        }}
      />

      <Typography component="div" variant="h7" color="error">
        {Strings[errors[name]?.message] || errors[name]?.message}
      </Typography>
    </Grid>
  );
}

export { AppTextField };
