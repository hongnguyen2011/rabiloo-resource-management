import { Button, Grid, MenuItem } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  AppModalService,
  AppTextField,
  AppDatePicker,
  AppSelect,
} from "../../../components";
import { useAppLanguage } from "../../../hooks";
import { REGREX } from "../../../utils";

function Edit({ data, setData, itemData }) {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const { Strings } = useAppLanguage();
  const { enqueueSnackbar } = useSnackbar();

  const FIELD = [
    {
      name: "firstName",
      label: Strings.first_name,
      defaultValue: itemData.name?.first,
    },
    {
      name: "lastName",
      label: Strings.last_name,
      defaultValue: itemData.name?.last,
    },
    {
      name: "email",
      label: Strings.email,
      rules: {
        pattern: {
          value: REGREX.email,
          message: "email_is_not_valid",
        },
      },
      defaultValue: itemData.email,
    },
    {
      name: "phone",
      label: Strings.phone,
      defaultValue: itemData.phone,
    },
  ];

  const onEdit = (e) => {
    try {
      const item = {
        ...itemData,
        ...e,
        name: { title: e.title, first: e.firstName, last: e.lastName },
        dob: { age: moment().diff(e.dob, "years"), date: e.dob },
      };

      const clone = [...(data?.results || [])];
      const index = clone.findIndex(
        (e) => e.phone === itemData.phone && e.email === itemData.email
      );
      if (index > -1) {
        clone[index] = item;
      }
      setData.mutate({
        ...data,
        results: clone,
      });
      AppModalService.close();
      enqueueSnackbar(Strings.edit_success_common, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return (
    <Grid container minWidth={300} maxWidth="md" sx={{ justifyContent: "center" }}>
      {FIELD.map((item) => {
        return (
          <AppTextField
            defaultValue={item.defaultValue}
            sx={{ my: 1, px: 1 }}
            item
            key={item.label}
            sm={6}
            xs={12}
            control={control}
            name={item.name}
            label={item.label}
            required
            rules={item.rules}
            fullWidth
          />
        );
      })}
      <AppSelect
        defaultValue={itemData.name?.title}
        item
        sm={6}
        xs={12}
        sx={{ my: 1, px: 1 }}
        control={control}
        label={Strings.honorific}
        name="title">
        <MenuItem value={"Mr"}>Mr</MenuItem>
        <MenuItem value={"Ms"}>Ms</MenuItem>
        <MenuItem value={"Mrs"}>Mrs</MenuItem>
        <MenuItem value={"Miss"}>Miss</MenuItem>
        <MenuItem value={"Monsieur"}>Monsieur</MenuItem>
        <MenuItem value={"Mademoiselle"}>Mademoiselle</MenuItem>
      </AppSelect>
      <AppDatePicker
        item
        sx={{ my: 1, px: 1 }}
        sm={6}
        xs={12}
        control={control}
        name="dob"
        label={Strings.dob}
        required={true}
        defaultValue={itemData.dob?.date}
      />
      <Grid sx={{ mt: 3, textAlign: "center" }}>
        <Button
          sx={{ mr: 2 }}
          variant="contained"
          color="disabled"
          onClick={() => {
            AppModalService.close();
          }}>
          {Strings.cancel}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit(onEdit)}>
          {Strings.confirm}
        </Button>
      </Grid>
    </Grid>
  );
}

export default Edit;
