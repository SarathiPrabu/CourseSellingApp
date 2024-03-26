import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Course(){
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3000/admin/course/${courseId}`, {
            method: "GET", headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            setCourse(data.course)
            console.log(course)
        })
    }, []);
    return <div>

    </div>
}
export default Course;