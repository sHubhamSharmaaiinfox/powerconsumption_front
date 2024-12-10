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
        <Route exact path = '/meter-view' element={<Protected_routes Component={MeterView}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



