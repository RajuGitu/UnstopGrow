import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// First Pages
// First Pages
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
// Founder Pages
import Founder from "./Components/Founder/Founder";
import FounderDashboard from "./pages/Founder/FounderDashboard";
import FounderUpdates from "./pages/Founder/FounderUpdates";
import FounderPitch from "./pages/Founder/FounderPitch";
import FounderMerge from "./pages/Founder/FounderMerge";
import FounderSearch from "./pages/Founder/FounderSearch";
import FounderSettings from "./pages/Founder/FounderSettings";
import FounderInvestor from "./pages/Founder/FounderInvestor";
import FounderFeedback from "./pages/Founder/FounderFeedback";
// Investor Pages
import InvestDashboard from "./pages/Investor/InvestDashboard";
import InvestorLayout from "./Components/Investor/InvestorLayout";
import InvestorDiscover from "./pages/Investor/InvertorDiscover";
import InvestorSaved from "./pages/Investor/InvestorSaved";
import InvestorContacts from "./pages/Investor/InvestorContacts";
import InvestorSettings from "./pages/Investor/InvertorSettings";

import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/founder" element={
              <ProfileProvider>
                <Founder />
              </ProfileProvider>
            }>
              <Route index element={<Navigate to="/founder/dashboard" />} />
              <Route path="dashboard" element={<FounderDashboard />} />
              <Route path="updates" element={<FounderUpdates />} />
              <Route path="pitch" element={<FounderPitch />} />
              <Route path="settings" element={<FounderSettings />} />
              <Route path="merge" element={<FounderMerge />} />
              <Route path="search" element={<FounderSearch />} />
              <Route path="interests" element={<FounderInvestor />} />
              <Route path="feedback" element={<FounderFeedback />} />
            </Route>
            <Route path="/investor" element={<InvestorLayout />}>
              <Route index element={<Navigate to="/investor/dashboard" />} />
              <Route path="dashboard" element={<InvestDashboard />} />
              <Route path="discover" element={<InvestorDiscover />} />
              <Route path="saved" element={<InvestorSaved />} />
              <Route path='contacts' element={<InvestorContacts />} />
              <Route path='settings' element={<InvestorSettings />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App;
