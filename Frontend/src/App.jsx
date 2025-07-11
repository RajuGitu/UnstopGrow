import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import FounderAllPost from "./pages/Founder/FounderAllPost";
import FounderAllPitch from "./pages/Founder/FounderAllPitch";
// Investor Pages
import InvestDashboard from "./pages/Investor/InvestDashboard";
import InvestorLayout from "./Components/Investor/InvestorLayout";
import InvestorDiscover from "./pages/Investor/InvertorDiscover";
import InvestorSaved from "./pages/Investor/InvestorSaved";
import InvestorContacts from "./pages/Investor/InvestorContacts";
import InvestorSettings from "./pages/Investor/InvertorSettings";

import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import { PitchPostProvider } from "./context/PitchPostContext";
import { InterestProvider } from "./context/InterestContext";
import { InvestorSavedStartupsProvider } from "./context/getinvestorSavedStartupsContext";
import SuppoterLayout from "./Components/Suppoter/SupporterLayout";
import SupporterDashboard from "./pages/Supporter/SupporterDashboard";
import SupporterAllPitch from "./pages/Supporter/SupporterAllPitch";
import { InvestorInterestedStartupsProvider } from "./context/getinvertorInterestedContexr";
import { InvestorDiscoverStartupsProvider } from "./context/getinvestorDiscoverStartups";
import { SupporterProvider } from "./context/SupporterpitchContext";
import SupporterAllPost from "./pages/Supporter/SupporterAllPost";
import { AllPostSupporterProvider } from "./context/getAllPostSupporterContext";
import SupporterLikedContent from "./pages/Supporter/SupporterLikedContent";
import SupporterFollowings from "./pages/Supporter/SupporterFollowings";
import SupporterProfile from "./pages/Supporter/SupporterProfile";

function App() {
  return (
    <>
      <PitchPostProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgetPassword />} />
              <Route
                path="/founder"
                element={
                  <InterestProvider>
                    <ProfileProvider>
                      <Founder />
                    </ProfileProvider>
                  </InterestProvider>
                }
              >
                <Route index element={<Navigate to="/founder/dashboard" />} />
                <Route path="dashboard" element={<FounderDashboard />} />
                <Route path="updates" element={<FounderUpdates />} />
                <Route path="pitch" element={<FounderPitch />} />
                <Route path="settings" element={<FounderSettings />} />
                <Route path="merge" element={<FounderMerge />} />
                <Route path="search" element={<FounderSearch />} />
                <Route path="interests" element={<FounderInvestor />} />
                <Route path="all-post" element={<FounderAllPost />} />
                <Route path="all-pitch" element={<FounderAllPitch />} />
              </Route>

              <Route
                path="/investor"
                element={
                  <InvestorDiscoverStartupsProvider>
                    <InvestorInterestedStartupsProvider>
                      <InvestorSavedStartupsProvider>
                        <InvestorLayout />
                      </InvestorSavedStartupsProvider>
                    </InvestorInterestedStartupsProvider>
                  </InvestorDiscoverStartupsProvider>
                }
              >
                <Route index element={<Navigate to="/investor/dashboard" />} />
                <Route path="dashboard" element={<InvestDashboard />} />
                <Route path="discover" element={<InvestorDiscover />} />
                <Route path="saved" element={<InvestorSaved />} />
                <Route path="contacts" element={<InvestorContacts />} />
                <Route path="settings" element={<InvestorSettings />} />
              </Route>
              <Route path="/supporter" element={
                <SupporterProvider>
                  <AllPostSupporterProvider>
                    <SuppoterLayout />
                  </AllPostSupporterProvider>
                </SupporterProvider>

              }>
                <Route index element={<Navigate to="/supporter/dashboard" />} />
                <Route path="dashboard" element={<SupporterDashboard />} />
                <Route path="explore-pitch" element={<SupporterAllPitch />} />
                <Route path="explore-post" element={<SupporterAllPost />} />
                <Route path="followings" element={<SupporterFollowings />} />
                <Route
                  path="liked-content"
                  element={<SupporterLikedContent />}
                />
                <Route path="profile" element={<SupporterProfile />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </PitchPostProvider>
    </>
  );
}

export default App;
