import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { ThemeProvider } from "./components/theme-provider";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {
  // token =>
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/sso-callback"
            element={
              <AuthenticateWithRedirectCallback
                signUpForceRedirectUrl={"/auth-callback"}
              />
            }
          />
          <Route path="/auth-callback" element={<AuthCallbackPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
export default App;
