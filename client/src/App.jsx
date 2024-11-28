import { Routes, Route } from "react-router-dom";

import { useAppContext } from "./context/AppContext.jsx";

import AuthPage from "./pages/AuthPage.jsx";
import FormPage from "./pages/FormPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
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
      <Route path="/student" element={<StudentPage userId={userId} />} />
      <Route path="/admin" element={<AdminPage userId={userId} />} />
      <Route
        path="/admission"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <FormPage userId={userId} />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}
