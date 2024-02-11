import { Select, Typography, Grid, FormControl, InputLabel } from "@mui/material";
import { Controller, useFormState } from "react-hook-form";
import { useAppLanguage } from "../hooks";

function AppSelect({
  control,
  name,
  rules,
  defaultValue,
  sx,
  label,
  menuItems,
  placeholder,
  required,
  sm,
  xs,
  item = false,
  ...props
}) {
  const { errors } = useFormState({ control, name });
  const { Strings } = useAppLanguage();

  const isError = errors[name] && errors[name].message ? true : false;

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
            <FormControl fullWidth>
              <InputLabel>{label}</InputLabel>
              <Select
                error={isError}
                placeholder={placeholder}
                value={value}
                label={label}
                onChange={(e) => onChange(e.target.value)}>
                {props.children}
              </Select>
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

export { AppSelect };
