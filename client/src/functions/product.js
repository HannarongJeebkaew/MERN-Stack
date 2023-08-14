import axios from "axios";
export const currentUser = async (token) => {
    await axios.post(
      import.meta.env.VITE_REACT_APP_API+ "/current-user",
      {},
      {
        headers:{
          authtoken:token
        },
      }
    );
  };