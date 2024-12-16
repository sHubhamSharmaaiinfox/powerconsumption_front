import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import SignInPage from "./auth/SignInPage";
import Protected_routes from './common/protected_routes';
import UnProtected_routes from './common/unprotected_routes';
import UserDashboard from "./userpages/Dashboard";
import ForgotPasswordPage from "./auth/ForgotPasswordPage";
import NewPassword from "./auth/NewPassword";
import ViewProfilePage from "./userpages/ViewProfilePage";
import PricingPage from "./userpages/PricingPage";
import Anomalies from "./userpages/Anomalies";
import AmpReading from "./userpages/AmpReading";
import VoltMReading from "./userpages/VoltMReading";
import MeterList from "./userpages/MeterList";
import MeterView from "./userpages/MeterView";
import AdminDashboard from "./adminpages/AdminDashboard";
import UserListPage from "./adminpages/user-list";
import Subscription from "./adminpages/subscription";
import ActiveUsers from "./adminpages/activeuser-list";
import InActiveUsers from "./adminpages/inactiveuser-list";
import PendingRequests from "./adminpages/PendingRequests";
import PaymentHistory from "./adminpages/PaymentHistory";



function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route exact path="/" element={<UnProtected_routes Component={SignInPage}/>} />
        <Route exact path="/dashboard" element={<Protected_routes Component={UserDashboard}/>} />
        <Route exact path='/forgot-password' element={<UnProtected_routes Component={ForgotPasswordPage} />} />
        <Route exact path = '/reset-password' element={<UnProtected_routes Component={NewPassword} />} />
        <Route exact path = '/view-profile' element={<Protected_routes Component={ViewProfilePage} />} />
        <Route exact path = '/pricing' element={<Protected_routes Component={PricingPage} />} />
        <Route exact path = '/anomalies' element={<Protected_routes Component={Anomalies} />} />
        <Route exact path = '/amp-readings' element={<Protected_routes Component={AmpReading} />} />
        <Route exact path = '/volt-readings' element={<Protected_routes Component={VoltMReading} />} />
        <Route exact path = '/meter-list' element={<Protected_routes Component={MeterList}/>} />
        <Route exact path = '/admin-dashboard' element={<Protected_routes Component={AdminDashboard }/>} />
        <Route exact path = '/manage-subscription' element={<Protected_routes Component={Subscription }/>} />
        <Route exact path = '/user-list' element={<Protected_routes Component={UserListPage }/>} />
        <Route exact path = '/activeuser-list' element={<Protected_routes Component={ActiveUsers }/>} />
        <Route exact path = '/inactiveuser-list' element={<Protected_routes Component={ InActiveUsers }/>} />
        <Route exact path = '/pending-request' element={<Protected_routes Component={ PendingRequests }/>} />`
        <Route exact path = '/payment-history' element={<Protected_routes Component={ PaymentHistory }/>} />`
      </Routes>
    </BrowserRouter>
  );
}

export default App;



