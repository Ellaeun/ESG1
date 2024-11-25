import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import AuthPage from "./pages/AuthPage.jsx";
import FormPage from "./pages/FormPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const [email, setEmail] = useState("");
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // isLoggedIn ? navigate("/admission") : navigate("/");
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthPage
            email={email}
            setEmail={setEmail}
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      />
      <Route
        path="/student"
        element={
          <StudentPage
            email={email}
          />
        }
      />
      <Route
        path="/admin"
        element={
          <AdminPage
            email={email}
          />
        }
      />
      <Route
        path="/admission"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <FormPage email={email} />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}
