import axios from "axios";

const apiURl = process.env.REACT_APP_API_URL;

const updateUser = async (email: any, data: any) => {
  try {
    const updateUser = await axios.put(
      `${apiURl}/users/update-user/${email}`,
      data
    );
    return updateUser.data;

  } catch (error) {
    console.error("Error during update profile:", error);
  }
};

const getSingleUser = async (email: any) => {
  try {
    const getSingleUser = await axios.get(
      `${apiURl}/users/get-single-user/${email}`
    );
    return getSingleUser.data;

  } catch (error) {
    console.error("Error during fetching user data:", error);
  }
};

const userService = {
  updateUser,
  getSingleUser
};

export default userService;