import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Founder from "./pages/Founder/Founder";
import DashBoard from "./pages/Founder/Dashboard";
import PostUpdates from "./pages/Founder/PostUpdates";

import InvestDashboard from "./pages/Investor/InvestDashboard";
import InvestorLayout from "./Components/Investor/InvestorLayout";
import InvestorDiscover from "./pages/Investor/InvertorDiscover";
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
          <Route path="/investor" element={<InvestorLayout/>}>
            <Route index element={<Navigate to="/investor/dashboard"/>}/>
            <Route path="dashboard" element={<InvestDashboard/>}/>
            <Route path="discover" element={<InvestorDiscover/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
