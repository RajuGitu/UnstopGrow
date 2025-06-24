import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Founder from "./pages/Founder/Founder";
import DashBoard from "./pages/Founder/Dashboard";
import PostUpdates from "./pages/Founder/PostUpdates";
import Investor from "./pages/Investor/Investor";
import InvestDashboard from "./pages/Investor/InvestDashboard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/founder" element={<Founder />}>
            <Route index element={<Navigate to="/founder/dashboard" />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="updates" element={<PostUpdates/>}/>
          </Route>
          <Route path="/investor" element={<Investor/>}>
            <Route index element={<Navigate to="/investor/dashboard"/>}/>
            <Route path="dashboard" element={<InvestDashboard/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
