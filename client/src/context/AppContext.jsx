import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const AppContext = createContext();

AppProvider.propTypes = {
  children: PropTypes.node,
};

export function AppProvider({ children }) {
  const [apiUrl, setApiUrl] = useState(
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:8080",
  );
  const axiosApi = axios.create({
    baseURL: apiUrl + "/api",
    withCredentials: true,
  });
  const [userId, setUserId] = useState();
  const [role, setRole] = useState("student");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const api = {
    get: async (endpoint, { params }) => {
      const accessToken = localStorage.getItem("accessToken");
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};

      const res = await axiosApi.get(endpoint, {
        params,
        headers,
      });

      if (res.data.accessToken && accessToken !== res.data.accessToken)
        localStorage.setItem("accessToken", res.data.accessToken);

      if (res.data.userId && res.data.role) {
        setUserId(res.data.userId);
        setRole(res.data.role);
      }

      return res;
    },
    post: async (endpoint, body) => {
      const accessToken = localStorage.getItem("accessToken");
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};

      const res = await axiosApi.post(endpoint, body, {
        headers,
      });

      if (res.data.accessToken && accessToken !== res.data.accessToken)
        localStorage.setItem("accessToken", res.data.accessToken);
      if (res.data.userId && res.data.role) {
        setUserId(res.data.userId);
        setRole(res.data.role);
      }

      return res;
    },
  };

  // useEffect(() => {
  //   async function validateAccess() {
  //     try {
  //       await api.post("/auth/validate-access");

  //       setIsLoggedIn(true);
  //     } catch (err) {
  //       setUserId("");
  //       setIsLoggedIn(false);
  //       navigate("/");

  //       console.error({
  //         status: err.response.status,
  //         error: err.response.data.error,
  //       });
  //     }
  //   }

  //   validateAccess();
  // }, []);

  // useEffect(() => {
  //   navigate(
  //     role === "New"
  //       ? "/application"
  //       : role === "Admin"
  //         ? "/admin"
  //         : role === "Student"
  //           ? "/student"
  //           : "/",
  //   );
  // }, [role]);

  return (
    <AppContext.Provider
      value={{
        navigate,
        apiUrl,
        setApiUrl,
        api,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
