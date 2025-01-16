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
import UserData from "./adminpages/User_profile_page";
import meterData from "./adminpages/meter-details";
import CheckoutUser from "./userpages/CheckoutPage";
import PaymentSettings from "./adminpages/Payment-Setting";
import AddMeter from "./userpages/AddMeter";
import AdminProfile from "./adminpages/AdminProfile";
import Dashboard from "./superadminpages/Dashboard";
import SuperAdminProfile from "./superadminpages/SuperAdminProfile";
import AdminListPage from "./superadminpages/AdminListPage";
import ActiveAdmin from "./superadminpages/ActiveAdmin";
import InactiveAdmin from "./superadminpages/InactiveAdmin";
import UserLists from "./components/UserList";
import UserDetails from "./superadminpages/UserLists";
import ActiveUsersList from "./superadminpages/ActiveUsersList";
import InactiveUsersList from "./superadminpages/InactiveUserList";
import AdminPackageReports from "./superadminpages/AdminPackageReports";
import EnergySyatem from "./adminpages/EnergySystem";
import AdminView from "./superadminpages/AdminView";
import BuyPackages from "./adminpages/BuyPackages";
function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route exact path = "/" element={<UnProtected_routes Component={SignInPage}/>} />
        <Route exact path = "/dashboard" element={<Protected_routes Component={UserDashboard}/>} />
        <Route exact path = '/forgot-password' element={<UnProtected_routes Component={ForgotPasswordPage} />} />
        <Route exact path = '/reset-password' element={<UnProtected_routes Component={NewPassword} />} />
        <Route exact path = '/view-profile' element={<Protected_routes Component={ViewProfilePage} />} />
        <Route exact path = '/pricing' element={<Protected_routes Component={PricingPage} />} />
        <Route exact path = '/anomalies' element={<Protected_routes Component={Anomalies} />} />
        <Route exact path = '/amp-readings' element={<Protected_routes Component={AmpReading} />} />
        <Route exact path = '/active-power' element={<Protected_routes Component={VoltMReading} />} />
        <Route exact path = '/meter-list' element={<Protected_routes Component={MeterList}/>} />
        <Route exact path = '/admin-dashboard' element={<Protected_routes Component={AdminDashboard }/>} />
        <Route exact path = '/manage-subscription' element={<Protected_routes Component={Subscription }/>} />
        <Route exact path = '/user-list' element={<Protected_routes Component={UserListPage }/>} />
        <Route exact path = '/user-detail' element={<Protected_routes Component={ UserDetails }/>} />
        <Route exact path = '/activeuser-list' element={<Protected_routes Component={ActiveUsers }/>} />
        <Route exact path = '/inactiveuser-list' element={<Protected_routes Component={ InActiveUsers }/>} />
        <Route exact path = '/pending-request' element={<Protected_routes Component={ PendingRequests }/>} />
        <Route exact path = '/payment-history' element={<Protected_routes Component={ PaymentHistory }/>} />
        <Route exact path = '/user-data' element={<Protected_routes Component={ UserData }/>} />
        <Route exact path = '/meter-details' element={<Protected_routes Component={ meterData }/>} />
        <Route exact path = '/Checkout-User' element={<Protected_routes Component={ CheckoutUser }/>} />
        <Route exact path = '/payment-setting' element={<Protected_routes Component={ PaymentSettings }/>} />
        <Route exact path = '/add-meter' element={<Protected_routes Component={ AddMeter }/>} />
        <Route exact path = '/EMS' element={<Protected_routes Component={ EnergySyatem }/>} />
        <Route exact path = '/admin-profile' element={<Protected_routes Component={ AdminProfile }/>} />
        <Route exact path = '/meter-view' element={<Protected_routes Component={ MeterView }/>} />
        <Route exact path = '/superadmin-dashboard' element={<Protected_routes Component={ Dashboard }/>} />
        <Route exact path = '/superadmin-profile' element={<Protected_routes Component={ SuperAdminProfile }/>} />
        <Route exact path = '/admin-list' element={<Protected_routes Component={ AdminListPage }/>} />
        <Route exact path = '/active-admin' element={<Protected_routes Component={ ActiveAdmin }/>} />
        <Route exact path = '/inactive-admin' element={<Protected_routes Component={ InactiveAdmin }/>} />
        <Route exact path = '/admin-package' element={<Protected_routes Component={ AdminPackageReports }/>} />
        <Route exact path = '/activeuser-detail' element={<Protected_routes Component={ ActiveUsersList }/>} />
        <Route exact path = '/inactiveuser-detail' element={<Protected_routes Component={ InactiveUsersList }/>} />
        <Route exact path = '/admin-view' element={<Protected_routes Component={ AdminView }/>} />
        <Route exact path = '/buy-package' element={<Protected_routes Component={ BuyPackages }/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
