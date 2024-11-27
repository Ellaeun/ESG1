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
  const api = axios.create({
    baseURL: apiUrl + "/api",
    withCredentials: true,
  });

  const [userId, setUserId] = useState();
  const [role, setRole] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function validateAccess() {
      try {
        const res = await api.post(
          "/auth/validate-access",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },<tr className="flex w-full py-5 text-center q-text-sm">
            <td className="w-full">123</td>
            <td className="w-full">123</td>
            <td className="w-full">123</td>
            <td className="w-full">123</td>
            <td className="w-full">123</td>
          </tr>
        );
        if (res.data.accesstoken)
          localStorage.setItem("accessToken", res.data.accessToken);
        setUserId(res.data.userId);

        setIsLoggedIn(true);

        navigate(role === "student" ? "/admission" : "/admin")
      } catch (err) {
        setUserId("");
        setIsLoggedIn(false);
        navigate("/");

        console.error({
          status: err.response.status,
          error: err.response.data.error,
        });
      }
    }

    validateAccess();
  }, []);

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
