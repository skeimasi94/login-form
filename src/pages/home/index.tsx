import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const Home = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    return (
        <div>
            {!cookies.token &&
                <Navigate to="/" />
            }

            <div style={{
                width: "100%", height: "100%", display: "flex",
                justifyContent: "center", alignItems: "center"
            }}>
                <h1>Home Page</h1>
            </div>

            <Button fullWidth variant="outlined" onClick={() => {
                removeCookie("token");
            }}>
                Logout
            </Button>

        </div>
    )
}

export default Home;