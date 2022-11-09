import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/refreshSession", {
      withCredentials: true,
    });
    setAuth({
      email: response.data.email,
      accessToken: response.data.accessToken,
    });
    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
