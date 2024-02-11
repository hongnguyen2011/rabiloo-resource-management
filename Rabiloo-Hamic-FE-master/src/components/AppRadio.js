import { Typography, Grid, FormControl, FormLabel, RadioGroup } from "@mui/material";
import { Controller, useFormState } from "react-hook-form";
import { useAppLanguage } from "../hooks";

function AppRadio({
  control,
  item,
  name,
  rules,
  defaultValue,
  sx,
  label,
  menuItems,
  placeholder,
  row,
  required,
  sm,
  xs,
  ...props
}) {
  const { errors } = useFormState({ control, name });
  const { Strings } = useAppLanguage();

  const isError = errors[name] && errors[name].message;

  return (
    <Grid sx={sx} item={item} sm={sm} xs={xs}>
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={{
          required: { value: required, message: "this_field_is_required" },
          ...rules,
        }}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl>
              <FormLabel>{label}</FormLabel>
              <RadioGroup row={row} defaultValue={value}>
                {props.children}
              </RadioGroup>
            </FormControl>
          );
        }}
      />
      <Typography component="div" variant="h7" color="error">
        {Strings[errors[name]?.message]}
      </Typography>
    </Grid>
  );
}

export { AppRadio };
