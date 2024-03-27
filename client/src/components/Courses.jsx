import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {Card, Typography} from "@mui/material";

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
        <div style={{display: "flex", flexWrap:"wrap"}}>
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
    let element = <Card
        style={{
            margin: 10, width: 300, minHeight: 200
        }}>
        <Typography textAlign={"center"}> {props.course.title}</Typography>
        <Typography textAlign={"center"}>{props.course.description}</Typography>
        {
            props.course.imageLink &&
            <img src={props.course.imageLink} style={{width: 300, height: 200}} alt={"course image"}/>
        }
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                window.location = "/course/" + props.course._id;
            }}>Edit</Button>
        </div>
    </Card>;
    return element
}
export default Courses