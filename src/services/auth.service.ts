import axios from "axios";

const apiURl = process.env.REACT_APP_API_URL;

const SignUp = async (data: any) => {
  try {
   const register = await axios.post(
    `${apiURl}/auth/register`,
    data
   );
   return register.data;

  } catch (error) {
    console.error("Error during signup:", error);
  }
}

const Login = async (data: any) => {
  try {
   const login = await axios.post(
    `${apiURl}/auth/login`,
    data
   );
   console.log(login)
   return login.data;

  } catch (error) {
    console.error("Error during signin:", error);
  }
}

const ForgotPassword = async (data: any) => {
  try {
   const login = await axios.put(
    `${apiURl}/auth/forgot-passsword`,
    data
   );
   console.log(login)
   return login.data;

  } catch (error) {
    console.error("Error during changing password:", error);
  }
}

const SendOtp = async (data: any) => {
  try {
   const login = await axios.put(
    `${apiURl}/auth/send-otp`,
    data
   );
   console.log(login)
   return login.data;

  } catch (error) {
    console.error("Error during sending otp:", error);
  }
}

const VerifyOtp = async (data: any) => {
  try {
   const login = await axios.post(
    `${apiURl}/auth/verify-otp`,
    data
   );
   console.log(login)
   return login.data;

  } catch (error) {
    console.error("Error during verifying otp:", error);
  }
}

const authService = { 
  SignUp, 
  Login, 
  ForgotPassword, 
  SendOtp, 
  VerifyOtp
};

export default authService;