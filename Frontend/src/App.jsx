import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/forgot-password" element={<ForgetPassword/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
