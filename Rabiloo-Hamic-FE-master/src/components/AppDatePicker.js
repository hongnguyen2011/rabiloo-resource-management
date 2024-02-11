import { DatePicker } from "@mui/lab";
import { Typography, Grid, TextField } from "@mui/material";
import { Controller, useFormState } from "react-hook-form";
import { useAppLanguage } from "../hooks";

function AppDatePicker({
  control,
  name,
  rules,
  defaultValue,
  sx,
  label,
  menuItems,
  placeholder,
  required,
  item = false,
  sm,
  xs,
  ...props
}) {
  const { errors } = useFormState({ control, name });
  const { Strings } = useAppLanguage();

  return (
    <Grid sx={sx} item={item} sm={sm} xs={xs}>
      <Controller
        defaultValue={defaultValue || null}
        name={name}
        control={control}
        rules={{
          required: { value: required, message: "this_field_is_required" },
          validate: (e) => {
            return new Date(e) == "Invalid Date" ? "date_is_invalid" : true;
          },
        }}
        render={({ field: { value, onChange } }) => {
          return (
            <DatePicker
              inputFormat="YYYY/MM/DD"
              label={label}
              value={value}
              onChange={onChange}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          );
        }}
      />
      <Typography component="div" variant="h7" color="error">
        {Strings[errors[name]?.message]}
      </Typography>
    </Grid>
  );
}

export { AppDatePicker };
