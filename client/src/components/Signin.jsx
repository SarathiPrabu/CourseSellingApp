import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from "@mui/material";
import {useState} from "react";

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                    id={"username"}
                    label="Username"
                    variant="outlined"
                    style={{
                        padding: 5
                    }}
                    onChange={e=>{
                        setUsername(e.target.value)
                    }}
                />
                <TextField
                    fullWidth={true}
                    id={"password"}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    style={{
                        padding: 5
                    }}
                    onChange={e=>{
                        setPassword(e.target.value)
                    }}
                />
                <div>
                    <Button variant="contained"
                            style={{
                                margin: 2
                    }}
                            onClick={() =>{
                                fetch("http://localhost:3000/admin/login",{
                                    method:"POST",
                                    headers:{
                                        username,
                                        password
                                    }
                                }).then((res) => {
                                    return res.json()
                                }).then(data => {
                                    localStorage.setItem("token",data.token)
                                    window.location = "courses"
                                })
                            }}
                    >Sign in</Button>
                </div>
            </Card>
        </div>
    </div>)
}

export default Signin