import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Card, InputAdornment, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as React from "react";

function Course() {
    const {courseId} = useParams();
    const [course, setCourse] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/admin/course/${courseId}`, {
            method: "GET", headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            setCourse(data)
        })
    }, []);
    return <div>
        <CourseCard course={course}/>
        <UpdateCard course={course} setCourse = {setCourse}/>

    </div>
}

function UpdateCard(props) {
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDesc, setCourseDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [imageSrc, setImageSrc] = useState("");
    const course = props.course;

    return <div style={{display: "flex", justifyContent:"center"}}>
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
                        min: 0
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
                        fetch("http://localhost:3000/admin/courses/" + course._id, {
                            method: "PUT",
                            body: JSON.stringify({
                                    title: courseTitle,
                                    description: courseDesc,
                                    price,
                                    imageLink: imageSrc,
                                    published: true
                                }
                            ),
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        }).then(res => {
                            return res.json()
                        }).then(data => {
                            props.setCourse(data)
                        })
                    }}
            >Update</Button>
        </Card></div>
}

function CourseCard(props) {
    return <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
        <Card
            style={{
                margin: 10, width: 300, minHeight: 200
            }}>
            <Typography textAlign={"center"}> {props.course.title}</Typography>
            <Typography textAlign={"center"}>{props.course.description}</Typography>
            {props.course.imageLink && ( // Conditionally render image if available
                <img src={props.course.imageLink} style={{width: 300, height: 200}} alt={"course image"}/>
            )}
        </Card>
    </div>
}

export default Course;