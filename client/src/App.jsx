import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Appbar from "./components/Appbar.jsx";
import Signup from "./components/SignUp.jsx";
import Signin from "./components/Signin.jsx";
function App() {
  return (
      <div style={{
          width: "100vw",
          height: "100vh",
          background: "#eeeeee"
      }}>
          <Appbar />
          <Router>
              <Routes>
                 <Route path={"/signin"} element={<Signin />} />
                 <Route path={"/signup"} element={<Signup />} />
              </Routes>
          </Router>
      </div>
  )
}
export default App
