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

function Add({ data, setData }) {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const { Strings } = useAppLanguage();
  const { enqueueSnackbar } = useSnackbar();

  const FIELD = [
    {
      name: "firstName",
      label: Strings.first_name,
    },
    {
      name: "lastName",
      label: Strings.last_name,
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
    },
    {
      name: "phone",
      label: Strings.phone,
    },
  ];

  const onAdd = (e) => {
    try {
      const item = {
        ...e,
        name: { title: e.title, first: e.firstName, last: e.lastName },
        picture: {
          large:
            "https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-avatar-trang-cho-nam-va-con-than-lan.jpg",
        },
        dob: { age: moment().diff(e.dob, "years"), date: e.dob },
      };
      setData.mutate({
        ...data,
        results: [item, ...data.results],
      });
      AppModalService.close();
      enqueueSnackbar(Strings.add_success_common, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return (
    <Grid container minWidth={300} maxWidth="md" sx={{ justifyContent: "center" }}>
      {FIELD.map((item) => {
        return (
          <AppTextField
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
        <Button variant="contained" color="secondary" onClick={handleSubmit(onAdd)}>
          {Strings.confirm}
        </Button>
      </Grid>
    </Grid>
  );
}

export default Add;
