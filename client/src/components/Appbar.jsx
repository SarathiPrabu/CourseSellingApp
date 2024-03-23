import {Typography} from "@mui/material";
import Button from "@mui/material/Button";

function Appbar() {
    return (<div style={{
            padding: 5, display: "flex", justifyContent: "space-between"
        }}>
            <div><Typography>Coursera</Typography></div>
            <div style={{
                display: "flex"
            }}>
                <div><Button
                    style={{marginRight: 5}}
                    variant={"contained"}
                    onClick={() => {
                        window.location = "/signin"
                    }}
                >SIGN IN</Button>
                </div>
                <div><Button
                    style={{marginRight: 5}}
                    variant={"contained"}
                    onClick={() => {
                        window.location = "/signup"
                    }}
                >SIGN UP</Button>
                </div>
            </div>
        </div>)
}

export default Appbar