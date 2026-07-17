import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import {
  About,
  Contacts,
  Faq,
  ForgetPass,
  Home,
  Login,
  Privacy,
  Register,
  Terms,
  VerifyEmail,
} from "./pages";
import { Routes, Route, useLocation } from "react-router-dom";
import { useGlobalContext } from "./context/context";

import PrivateRoutes from "./utils/PrivateRoutes";
import ResetPass from "./pages/ResetPass/ForgetPass";
// import { Telegram } from "./components/telegram";
import {
  Dashboard,
  Deposit,
  Loans,
  Profile,
  Transactions,
  Transfer,
  Cards,
  IRS,
} from "./pages/UserDashboard/pages";
import BottomNav from "./pages/UserDashboard/components/BottomNav";
import MobileMenu from "./pages/UserDashboard/components/MobileMenu";
import DashboardHeader from "./pages/UserDashboard/components/DashboardHeader";
import { ToastContainer } from "react-toastify";
import Sidebar from "./pages/UserDashboard/components/Sidbar";
import DesktopHeader from "./pages/UserDashboard/components/DesktopHeader";

function App() {
  const { loading, setLoading, setIsMenuOpen, isMenuOpen } = useGlobalContext();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    } else if (pathname && loading === false) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [pathname]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/reset/:id" element={<ResetPass />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/transfer" element={<Transfer />} />
          <Route path="/dashboard/loans" element={<Loans />} />
          <Route path="/dashboard/account-settings" element={<Profile />} />
          <Route path="/dashboard/accountHistory" element={<Transactions />} />
          <Route path="/dashboard/deposit" element={<Deposit />} />
          <Route path="/dashboard/cards" element={<Cards />} />
          <Route path="/dashboard/irs-refund" element={<IRS />} />
        </Route>
      </Routes>
      {/* <Telegram /> */}
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      {pathname === "/dashboard" ||
      pathname === "/dashboard/accountHistory" ||
      pathname === "/dashboard/cards" ||
      pathname === "/dashboard/loans" ||
      pathname === "/dashboard/deposit" ||
      pathname === "/dashboard/loan" ||
      pathname === "/dashboard/irs-refund" ||
      pathname === "/dashboard/transfer" ||
      pathname === "/dashboard/account-settings" ? (
        <>
          <DashboardHeader />
          <BottomNav />
        </>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default App;
