import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useFormState } from "react-hook-form";
import { useAppLanguage } from "../hooks";

function AppPassword({
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
  variant, //filled, outlined, standard
  triggerTags,
  trigger,
  ...props
}) {
  const { errors } = useFormState({ control, name });
  const [show, setShow] = useState(false);
  const { Strings } = useAppLanguage();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isError = errors[name] && errors[name].message ? true : false;

  return (
    <Grid sx={sx} item={item} sm={sm} xs={xs}>
      <Controller
        defaultValue={defaultValue || ""}
        name={name}
        control={control}
        rules={{
          required: { value: true, message: "this_field_is_required" },
          ...rules,
        }}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl sx={{ width: "100%" }} variant={variant}>
              <InputLabel>{label}</InputLabel>
              <OutlinedInput
                inputProps={{ style: { padding: "12px 20px" } }}
                error={isError}
                value={value || ""}
                name={name}
                onChange={(e) => {
                  onChange(e.target.value);
                  trigger && trigger(triggerTags);
                }}
                type={show ? "text" : "password"}
                autoFocus={autoFocus}
                label={label}
                fullWidth={fullWidth}
                variant={variant}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShow((prev) => !prev)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...props}
              />
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

export { AppPassword };
