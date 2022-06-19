import { useState } from "react";
import CardView from "../../components/CardView";

import {
    Button,
    CssBaseline,
    IconButton,
    TextField,
    Typography
} from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { Person, West } from "@mui/icons-material";
import { Dict } from "../../Constants";
import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";

import '../../styles/Login.scss';
import AlertView from "../../components/AlertView";
import { cacheRtl, CustomTheme } from "../../configs/Theme";

interface UsernameModel {
    text: string, error: boolean
}

const ForgetPage = () => {
    const [cookies] = useCookies(['token']);
    const [openDialog, setOpenDialog] = useState(false);
    const [path, setPath] = useState("");
    const [username, setUsername] = useState<UsernameModel>({
        text: "", error: true
    })

    function onSubmit() {
        if (!username.error) {
            setOpenDialog(true);
        }
    }

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={CustomTheme}>
                <CssBaseline />
                <div dir="rtl">

                    {
                        cookies.token &&
                        <Navigate to="/home" />
                    }

                    {
                        path.startsWith("/") && <Navigate to={path} />
                    }

                    <CardView className="card-root">

                        <Button variant="outlined"
                            onClick={() => setPath("/")}
                            startIcon={<West />}>
                            {Dict.login_other_user}
                        </Button>

                        <Typography style={{
                            display: "flex", alignItems: "center"
                        }}>
                            <Person color="secondary" />
                            {Dict.forget_title}
                        </Typography>

                        <TextField
                            fullWidth
                            label={Dict.username_or_email}
                            placeholder={Dict.username}
                            type="email"
                            error={username.error}
                            onChange={(e) => {
                                setUsername(prevUsername => ({
                                    ...prevUsername,
                                    text: e.target.value,
                                    error: e.target.value.length === 0
                                }))
                            }}
                            value={username.text}
                            helperText={Dict.star_field}
                            InputProps={{
                                endAdornment: <IconButton>
                                    <Person />
                                </IconButton>
                            }}
                        />

                        <Button variant="contained"
                            onClick={onSubmit}
                            style={{
                                backgroundColor: "#ff4081"
                            }}>
                            {Dict.send_validation_code}
                        </Button>
                    </CardView>
                    {
                        openDialog &&
                        <AlertView
                            callback={() => setOpenDialog(false)}
                            dest="/"
                            message={Dict.user_not_found}
                            success={false}
                        />
                    }
                </div>
            </ThemeProvider>
        </CacheProvider >
    )
}

export default ForgetPage;
