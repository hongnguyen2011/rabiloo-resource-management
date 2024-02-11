import { FormControlLabel, Grid, Switch } from "@mui/material";
import { Controller } from "react-hook-form";

function AppSwitch({
  control,
  name,
  rules,
  defaultValue,
  sx,
  item = false,
  sm,
  xs,
  label,
  ...props
}) {
  return (
    <Grid sx={sx} item={item} sm={sm} xs={xs}>
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControlLabel
              control={
                <Switch
                  checked={value || false}
                  onChange={(e) => onChange(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={label}
              {...props}
            />
          );
        }}
      />
    </Grid>
  );
}

export { AppSwitch };
