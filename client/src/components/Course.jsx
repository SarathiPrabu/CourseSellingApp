import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Card, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as React from "react";
import defaultCourseImage from "../assets/defaultCourse.webp"

function Course() {
    const {courseId} = useParams();
    const [course, setCourse] = useState({
        title: "",
        description:"",
        price:0,
        imageLink: "",
        published: true
    });
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
        <UpdateCard course={course} setCourse={setCourse}/>
    </div>
}

const UpdateCard = React.memo((props) => {
    const [courseData, setCourseData] = useState({
        title: props.course.title,
        description: props.course.description,
        price: props.course.price,
        imageLink: "",
        published: true
    });

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
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
                style={{padding: 5}}
                defaultValue={()=>{
                    console.log("Course Title ",courseData.title)
                    return courseData.title
                }}
                onChange={(e) => setCourseData({...courseData, title: e.target.value})}
            />
            <TextField
                fullWidth={true}
                label="Description"
                variant="outlined"
                style={{padding: 5, marginTop: 3}}
                value={courseData.description}
                onChange={(e) => setCourseData({...courseData, description: e.target.value})}
            />
            <TextField
                fullWidth={true}
                placeholder={"Price"}
                variant="outlined"
                type={"number"}
                value={courseData.price}
                onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                style={{padding: 5, marginTop: 3}}
            />
            <TextField
                fullWidth={true}
                label="Image Link"
                variant="outlined"
                value={courseData.imageLink}
                onChange={(e) => setCourseData({...courseData, imageLink: e.target.value})}
                style={{padding: 5, marginTop: 3}}
            />
            <Button
                variant="contained"
                style={{margin: 2}}
                onClick={() => {
                    fetch(`http://localhost:3000/admin/course/${props.course._id}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            title: courseData.title,
                            description: courseData.description,
                            price: courseData.price,
                            imageLink: courseData.imageLink,
                            published: true
                        }),
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                        .then(res => {
                            if (res.ok) {
                                return res.json();
                            } else {
                                throw new Error("Failed to update course");
                            }
                        })
                        .then(() => {
                            props.setCourse(courseData);
                        })
                        .catch(error => {
                            console.error("Update failed:", error);
                        });
                }}
            >UPDATE</Button>
        </Card>
    </div>
});

function CourseCard(props) {
    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        <Card
            style={{
                margin: 10, width: 300, minHeight: 200, borderRadius:16, overflow: "hidden"
            }}>
            {(props.course.imageLink || defaultCourseImage) && (
                <img src={(props.course.imageLink || defaultCourseImage)} style={{margin:5, width: 290, height: 200, borderRadius: "inherit"}} alt={"course image"}/>
            )}
            <Typography textAlign={"center"}> {props.course.title}</Typography>
            <Typography textAlign={"center"}>{props.course.description}</Typography>

        </Card>
    </div>
}

export default Course;