import {Card, InputAdornment} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Button from "@mui/material/Button";
import {useState} from "react";


function AddCourse() {
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDesc, setCourseDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [imageSrc, setImageSrc] = useState("");

    return <div>
        <div style={{
            paddingTop: 150, marginBottom: 10, display: "flex", justifyContent: "center"
        }}>
            <Card
                variant="outlined"
                sx={{boxShadow: 3}}
                style={{
                    width: 400, padding: 20
                }}>
                <TextField
                    fullWidth={true}
                    label="Course Title"
                    variant="outlined"
                    style={{
                        padding: 5

                    }}
                    onChange={(e) => {
                        setCourseTitle(e.target.value)
                    }}
                />
                <TextField
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                    style={{
                        padding: 5,
                        marginTop: 3
                    }}
                    onChange={(e) => {
                        setCourseDesc(e.target.value)
                    }}
                />
                <TextField
                    fullWidth={true}
                    placeholder={"Price"}
                    variant="outlined"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        inputProps: {
                            min:0
                        }
                    }}
                    type={"number"}
                    style={{
                        padding: 5,
                        marginTop: 3
                    }}
                    onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val > 0) {
                            setPrice(val);
                        } else if (e.target.value === '') {
                            setPrice(0);
                        }
                    }}
                />
                <TextField
                    fullWidth={true}
                    label="Image Link"
                    variant="outlined"
                    style={{
                        padding: 5,
                        marginTop: 3
                    }}
                    onChange={(e) => {
                        setImageSrc(e.target.value)
                    }}
                />
                <Button variant="contained"
                        style={{
                            margin: 2
                        }}
                        onClick={() => {
                            fetch("http://localhost:3000/admin/courses", {
                                method: "POST",
                                body: JSON.stringify({
                                        title: courseTitle,
                                        description: courseDesc,
                                        price ,
                                        imageLink:imageSrc ,
                                        published: true
                                    }
                                ),
                                headers: {
                                    "Content-type": "application/json",
                                    "authorization": "Bearer "+ localStorage.getItem("token")
                                }
                            }).then(res => {
                                return res.json()
                            }). then(data => {
                                console.log(data)
                            })
                        }}
                >Submit</Button>
            </Card>
        </div>
    </div>
}

export default AddCourse