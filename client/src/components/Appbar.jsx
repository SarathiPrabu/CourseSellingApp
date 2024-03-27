import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
// import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


function Appbar() {
    // const navigate = useNavigate();
    const [username, setUsername] = useState("");
    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        try {
            const response = await fetch("http://localhost:3000/admin/me", {
                method: "GET", headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (!response.ok) {
                console.error("Error signing in :", response.statusText)
                return
            }
            const data = await response.json()
            setUsername(data.username)

        } catch (error) {
            console.error("Error fetching data ", error.message)
        }
    }

    if (username) {
        return <div style={{
            padding: 5, display: "flex", justifyContent: "space-between"
        }}>
            <div style={{display:"flex"}}>
                <Typography style={{marginRight:20}} variant={"h4"}>Coursera</Typography>
                <Button onClick={()=> {window.location="/courses"}}>Courses</Button>
                <Button onClick={()=> {window.location="/addcourse"}}>Add Course</Button>
            </div>
            <div style={{
                display: "flex"
            }}>
                <div style={{padding: 3}}><Typography>{username}</Typography></div>
                <div><Button
                    style={{marginRight: 5}}
                    variant={"contained"}
                    onClick={() => {
                        localStorage.removeItem("token")
                        window.location = "/signin"
                    }}
                >LOGOUT</Button>
                </div>
            </div>
        </div>
    }
    return <div style={{
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
    </div>
}

export default Appbar