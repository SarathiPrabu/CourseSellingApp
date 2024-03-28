import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {Card, Typography} from "@mui/material";
import * as React from "react";
import defaultCourseImage from "../assets/defaultCourse.webp";

function Courses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/admin/courses", {
            method: "GET", headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            setCourses(data.courses)
        })
    }, []);
    return <div>
        <div style={{display: "flex", flexWrap:"wrap", justifyContent:"center"}}>
            {courses.map(course => {
                return <Course key={course._id} course={course}/>
            })}
        </div>
        <div>
            <center>
                <Button onClick={()=>{window.location = "addcourse"}}>Add Course</Button>
            </center>
        </div>
    </div>
}

function Course(props) {
    return <Card
        style={{
            margin: 10, width: 300, height: 300, borderRadius:16, overflow: "hidden"
        }}>
        {(props.course.imageLink || defaultCourseImage) && (
            <img src={(props.course.imageLink || defaultCourseImage)} style={{margin:5, width: 290, height: 200, borderRadius: "inherit"}} alt={"course image"}/>
        )}
        <Typography textAlign={"center"}> {props.course.title}</Typography>
        <Typography textAlign={"center"}>{props.course.description}</Typography>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="small" onClick={() => {
                window.location = "/course/" + props.course._id;
            }}>Edit</Button>
        </div>
    </Card>
}
export default Courses