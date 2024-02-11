import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  AppCheckbox,
  AppDatePicker,
  AppPassword,
  AppRadio,
  AppSelect,
  AppSwitch,
  AppTextField,
} from "../../components";
import { REGREX } from "../../utils";
import { useAppLanguage } from "../../hooks";
import { ButtonGroup, FormControlLabel, MenuItem, Radio } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function SignUp() {
  const { Strings, setLanguage, language } = useAppLanguage();
  const { control, handleSubmit, trigger, getValues } = useForm({
    mode: "all",
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const timeout = useRef();

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  const onSignUp = (e) => {
    setLoading(true);
    timeout.current = setTimeout(() => {
      setLoading(false);
      enqueueSnackbar(Strings.sign_up_successful, { variant: "success" });
      navigate("/");
    }, 1000);
  };

  const FIELDS = [
    {
      name: "firstName",
      label: Strings.first_name,
      required: true,
      autoFocus: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "lastName",
      label: Strings.last_name,
      required: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "email",
      label: Strings.email,
      required: true,
      rules: {
        pattern: {
          value: REGREX.email,
          message: "email_is_not_valid",
        },
      },
      xs: 12,
    },
  ];

  const FIELD_PASSWORD = [
    {
      name: "password",
      label: Strings.password,
      rules: {
        pattern: {
          value: REGREX.password,
          message: "password_invalid",
        },
      },
      xs: 12,
      triggerTags: "passwordConfirm",
    },
    {
      name: "passwordConfirm",
      label: Strings.password_confirm,
      rules: {
        validate: (value) => {
          return getValues("password") && getValues("password") == value
            ? true
            : "is_not_same_password";
        },
      },
      xs: 12,
    },
  ];

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {Strings.sign_up}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {FIELDS.map((field) => (
              <AppTextField
                key={field.name}
                item
                xs={field.xs}
                sm={field.sm}
                control={control}
                name={field.name}
                rules={field.rules}
                fullWidth
                label={field.label}
                autoFocus={field.autoFocus}
                required
              />
            ))}
            {FIELD_PASSWORD.map((field) => (
              <AppPassword
                key={field.name}
                item
                xs={field.xs}
                sm={field.sm}
                control={control}
                name={field.name}
                rules={field.rules}
                fullWidth
                label={field.label}
                autoFocus={field.autoFocus}
                required
                trigger={trigger}
                triggerTags={field.triggerTags}
              />
            ))}
            <AppSwitch
              item
              name="isReceiveEmail"
              control={control}
              label={Strings.accept_receive_email}
            />
            <Grid item>
              <Grid container sx={{ alignItems: "center" }}>
                <AppCheckbox item name="isAccept" control={control} />
                <Link sx={{ ml: -2 }} href="#">
                  {Strings.accept_term}
                </Link>
              </Grid>
            </Grid>

            <AppSelect
              item
              xs={12}
              sm={6}
              label={Strings.city}
              control={control}
              name="city"
              required
            >
              <MenuItem value={"newyork"}>New York</MenuItem>
              <MenuItem value={"london"}>London</MenuItem>
              <MenuItem value={"hanoi"}>Ha Noi</MenuItem>
            </AppSelect>
            <AppDatePicker
              item
              sm={6}
              xs={12}
              required
              control={control}
              name="dob"
              label={Strings.dob}
            />
            <AppRadio
              item
              row
              label={Strings.gender}
              control={control}
              defaultValue="other"
              name="gender"
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={Strings.male}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={Strings.female}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label={Strings.other}
              />
            </AppRadio>
          </Grid>

          <Button
            disabled={loading}
            onClick={handleSubmit(onSignUp)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {Strings.sign_up}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                onClick={() => navigate("/")}
                variant="body2"
                sx={{ cursor: "pointer" }}
              >
                {Strings.already_have_account}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid
        container
        sx={{ my: 4, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography>
          {"Copyright © "} <Link>Rabiloo</Link> {new Date().getFullYear()}
        </Typography>
        <ButtonGroup variant="contained" size="small">
          <Button
            color={language === "EN" ? "secondary" : "disabled"}
            onClick={() => setLanguage("EN")}
          >
            {Strings.english}
          </Button>
          <Button
            color={language === "VI" ? "secondary" : "disabled"}
            onClick={() => setLanguage("VI")}
          >
            {Strings.vietnamese}
          </Button>
        </ButtonGroup>
      </Grid>
    </Container>
  );
}
