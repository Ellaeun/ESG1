import { Routes, Route } from "react-router-dom";

import { useAppContext } from "./context/AppContext.jsx";

import AuthPage from "./pages/AuthPage.jsx";
import ApplicationPage from "./pages/ApplicationPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdvisorPage from "./pages/AdvisorPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const { isLoggedIn, setIsLoggedIn, userId, setUserId } = useAppContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthPage
            userId={userId}
            setUserId={setUserId}
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      />
      <Route
        path="/application"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ApplicationPage userId={userId} />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/student" element={<StudentPage userId={userId} />} />
      <Route path="/admin" element={<AdminPage userId={userId} />} />
      <Route path="/advisor" element={<AdvisorPage userId={userId} />} />
    </Routes>
  );
}
