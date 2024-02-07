import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MyPasswordsPage from "./pages/MyPasswordsPage";
import SettingsPage from "./pages/SettingsPage";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <GoogleOAuthProvider clientId="596357550935-jhld1mlmi7hjda08ret8ju85lt7rftnm.apps.googleusercontent.com">
      <BrowserRouter>
        <div className="overflow-hidden">
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/mypasswords" element={<MyPasswordsPage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
          </Routes>
          <Toaster/>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
