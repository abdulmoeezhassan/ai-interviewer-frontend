import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {
  ToastContainer,
} from 'react-toastify';
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";
import { ForgotPassword } from "./components/auth/forgot-password";
import { SendOtp } from "./components/auth/send-otp";
import { VerifyOtp } from "./components/auth/verify-otp";
import { Profile } from "./components/profile/profile";
import { Skills } from "./components/profile/skills";
import { UserProvider } from "./context/context";
import Interview from "./components/interview";
import { Assessment } from "./components/assesment";
import { Home } from "./components/home";
import './App.css';

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/send-otp" element={<SendOtp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/interview/:type" element={<Interview />} />
            <Route path="/assessments" element={<Assessment />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
