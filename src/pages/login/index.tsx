import { useState } from "react";
import Recaptcha from "react-recaptcha";
import CardView from "../../components/CardView";
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { Constants, Dict } from "../../Constants";
import { useCookies } from 'react-cookie';
import { RandomToken } from "../../utils/Utils";
import AlertView from "../../components/AlertView";
import { Navigate } from "react-router-dom";

import axios from "axios";

import favicon from '../../favicon.ico';
import '../../styles/Login.scss';
import { cacheRtl, CustomTheme } from "../../configs/Theme";

interface UserParams {
  username: {
    text: string,
    error: boolean
  },
  password: {
    text: string,
    error: boolean
  },
  remember: boolean
}

const LoginPage = () => {
  const [userParams, setUserParams] = useState<UserParams>({
    username: { text: "", error: true },
    password: { text: "", error: true },
    remember: false
  });
  const [passVisibility, setPassVisibility] = useState(false);
  const [captchaOK, setCaptchaOK] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, showLoaing] = useState(false);
  const [cookies, setCookie] = useCookies(['token']);

  function handleCookie(newToken: string) {
    setCookie('token', newToken, { path: "/" });
    showLoaing(false);
    setShowDialog(true);
  }


  function onSubmit(userParams: UserParams, handleCookie: Function) {
    showLoaing(true);
    const { username, password, remember } = userParams;
    const payload = {
      userNameOrEmailAddress: username.text,
      password: password.text,
      rememberClient: remember
    };

    axios.post('/login', payload)
      .then(result => {
        handleCookie(RandomToken());
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline />
        <div dir="rtl">
          {
            cookies.token && !showDialog &&
            <Navigate to="/home" />
          }

          <CardView className="card-root">
            <Typography className="title">
              <img src={favicon} width={32} height={32} />
              {Dict.welcome}
            </Typography>

            <TextField
              fullWidth
              label={Dict.username_or_email}
              placeholder={Dict.username}
              type="email"
              error={userParams.username.error}
              onChange={(e) => {
                setUserParams(prevData => ({
                  ...prevData, username: {
                    text: e.target.value,
                    error: e.target.value.length === 0
                  }
                }));
              }}
              value={userParams.username.text}
              helperText={Dict.star_field}
              InputProps={{
                endAdornment: <IconButton>
                  <Person />
                </IconButton>
              }}
            />

            <TextField
              fullWidth
              label={Dict.password}
              type={passVisibility ? "text" : "password"}
              error={userParams.password.error}
              onChange={(e) => {
                setUserParams(prevData => ({
                  ...prevData, password: {
                    text: e.target.value,
                    error: e.target.value.length === 0
                  }
                }));
              }}
              value={userParams.password.text}
              helperText={Dict.star_field}
              InputProps={{
                endAdornment: <IconButton onClick={() => {
                  setPassVisibility(!passVisibility);
                }}>
                  {
                    passVisibility ? <VisibilityOff /> : <Visibility />
                  }
                </IconButton>
              }} />

            <div className="captcha-root">
              <Recaptcha
                sitekey={Constants.site_key}
                onloadCallback={() => { }}
                verifyCallback={(e) => {
                  setCaptchaOK(e.length > 0)
                }}
                expiredCallback={() => {
                  setCaptchaOK(false)
                }}
              />
            </div>
            {
              !captchaOK &&
              <Typography variant="body2" color="#ff4081">
                {Dict.security_error}
              </Typography>
            }

            <FormControlLabel
              control={
                <Checkbox
                  checked={userParams.remember}
                  onChange={(e) => {
                    setUserParams(prevData => ({
                      ...prevData, remember: e.target.checked
                    }));
                  }} />
              }
              label={Dict.remember_me}
            />
            <Link display="block" href="/forget" style={{ marginRight: "20px" }}>
              {Dict.forget_pass}
            </Link>

            <Divider sx={{ marginTop: "20px" }} />

            {
              loading ?
                <LoadingButton
                  variant="contained"
                  loading>
                  {Dict.login}
                </LoadingButton> :
                <Button variant="contained"
                  onClick={() => {
                    if (
                      captchaOK &&
                      !userParams.username.error &&
                      !userParams.password.error
                    ) {
                      onSubmit(userParams, handleCookie)
                    }
                  }}
                  style={{
                    backgroundColor: "#ff4081"
                  }}>
                  {Dict.login}
                </Button>
            }
          </CardView>

          {
            showDialog &&
            <AlertView
              dest="/home"
              title={Dict.login_success}
              message={Dict.redirect_to_home}
              success={true}
            />
          }

        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default LoginPage;
