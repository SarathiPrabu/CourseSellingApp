import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Appbar from "./components/Appbar.jsx";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import AddCourse from "./components/AddCourse.jsx";
import Courses from "./components/Courses.jsx";
import Course from "./components/Course.jsx";

function App() {
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            background: "#eeeeee"
        }}>
            <Appbar/>
            <Router>
                <Routes>
                    <Route path={"/addcourse"} element={<AddCourse/>}/>
                    <Route path={"/courses"} element={<Courses/>}/>
                    <Route path={"/course/:courseId"} element={<Course/>}/>
                    <Route path={"/signin"} element={<Signin/>}/>
                    <Route path={"/signup"} element={<Signup/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
