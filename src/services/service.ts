import axios from "axios";

const apiURl = process.env.REACT_APP_API_URL;

const CreateToken = async (user_id: any) => {
  try {
   const createToken = await axios.post(
    `${apiURl}/stream/token/${user_id}`,
   );
   return createToken.data;

  } catch (error) {
    console.error("Error during creating token:", error);
  }
}

const JoinMeeting = async () => {
  try {
   const joinMeeting = await axios.post(
    `${apiURl}/stream/agent-join-meeting`,
   );
   return joinMeeting.data;

  } catch (error) {
    console.error("Error during joining meeting:", error);
  }
}

export const Service = {
    CreateToken,
    JoinMeeting
};