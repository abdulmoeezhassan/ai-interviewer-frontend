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
import './App.css';

function App() {
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route path="/send-otp" element={<SendOtp/>} />
    <Route path="/verify-otp" element={<VerifyOtp/>} />
   </Routes>
   </BrowserRouter> 
   <ToastContainer />
    </>
  );
}

export default App;
