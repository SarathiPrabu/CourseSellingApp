import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from "@mui/material";

function Signin() {
    return (<div>
        <div style={{
            paddingTop: 150, marginBottom: 10, display: "flex", justifyContent: "center"
        }}>
            <Typography variant={"h6"}>
                Welcome back to Coursera. Signin Below
            </Typography>
        </div>
        <div style={{
            display:"flex",
            justifyContent:"center"
        }}>
            <Card
                variant="outlined"
                style={{
                    width: 400, padding: 20
                }}>
                <TextField
                    fullWidth={true}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    style={{
                        padding: 5
                    }}
                />
                <TextField
                    fullWidth={true}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    style={{
                        padding: 5
                    }}
                />
                <div style={{}}>
                    {/*<Button variant="contained" style={{*/}
                    {/*    margin: 2*/}
                    {/*}}>Login</Button>*/}
                    <Button variant="contained" style={{
                        margin: 2
                    }}>Sign in</Button>
                </div>
            </Card>
        </div>
    </div>)
}

export default Signin