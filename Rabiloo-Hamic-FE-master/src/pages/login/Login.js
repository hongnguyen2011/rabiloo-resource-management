import {useEffect, useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {LockOutlined} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useForm} from 'react-hook-form';
import {AppCheckbox, AppPassword, AppTextField} from '../../components';
import {useAppAccount, useAppLanguage, useOnKeyPress} from '../../hooks';
import {useNavigate} from 'react-router-dom';
import {FetchApi, REGREX} from '../../utils';
import {ButtonGroup} from '@mui/material';
import {useSnackbar} from 'notistack';

export default function Login() {
  const {control, handleSubmit} = useForm({mode: 'all'});
  const {setAccount} = useAppAccount();
  const {Strings, setLanguage, language} = useAppLanguage();
  const [loading, setLoading] = useState(false);
  const timeout = useRef();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  const onLogin = async e => {
    setLoading(true);
    const resultLogin = await FetchApi.login({
      userName: e.email,
      password: e.password,
    });
    setLoading(false);
    if (resultLogin?.accessToken) {
      setAccount({
        ...resultLogin,
        email: e.email,
        password: e.password,
      });
      enqueueSnackbar(Strings.sign_in_successful, {variant: 'success'});
      navigate('/');
      return;
    }
    enqueueSnackbar(Strings.sign_in_failed, {variant: 'error'});
  };

  useOnKeyPress('Enter', handleSubmit(onLogin));

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {Strings.sign_in}
        </Typography>

        <AppTextField
          sx={{m: 2, width: '100%'}}
          name="email"
          control={control}
          fullWidth={true}
          required
          rules={{
            pattern: {
              value: REGREX.email,
              message: 'email_is_not_valid',
            },
          }}
          label={Strings.email}
        />
        <AppPassword
          sx={{m: 2, width: '100%'}}
          name="password"
          control={control}
          fullWidth={true}
          required
          label={Strings.password}
        />

        <AppCheckbox
          sx={{alignSelf: 'flex-start'}}
          control={control}
          name="remember"
          label={Strings.remember_me}
        />

        <Button
          disabled={loading}
          onClick={handleSubmit(onLogin)}
          fullWidth
          variant="contained"
          sx={{mt: 2, mb: 2}}>
          {Strings.sign_in}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              {Strings.forgot_password}
            </Link>
          </Grid>
          <Grid item>
            <Link
              onClick={() => navigate('/sign-up')}
              sx={{cursor: 'pointer'}}
              variant="body2">
              {Strings.dont_have_account}
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        sx={{my: 4, justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography>
          {'Copyright © '} <Link>Rabiloo</Link> {new Date().getFullYear()}
        </Typography>

        <ButtonGroup variant="contained" size="small">
          <Button
            color={language === 'EN' ? 'secondary' : 'disabled'}
            onClick={() => setLanguage('EN')}>
            {Strings.english}
          </Button>
          <Button
            color={language === 'VI' ? 'secondary' : 'disabled'}
            onClick={() => setLanguage('VI')}>
            {Strings.vietnamese}
          </Button>
        </ButtonGroup>
      </Grid>
    </Container>
  );
}
