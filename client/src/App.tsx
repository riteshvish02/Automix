import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "./Pages/AuthPage";
import { DashboardPage } from "./Pages/DashboardPage";
import { ChatPage } from "./Pages/ChatPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
