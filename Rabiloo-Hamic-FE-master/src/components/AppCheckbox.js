import { FormControlLabel, Checkbox, Grid } from "@mui/material";
import { Controller } from "react-hook-form";

function AppCheckbox({
  control,
  name,
  rules,
  defaultValue,
  sx,
  label,
  sm,
  xs,
  item = false,
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
                <Checkbox
                  checked={value || false}
                  color="primary"
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
              label={label || ""}
              {...props}
            />
          );
        }}
      />
    </Grid>
  );
}

export { AppCheckbox };
