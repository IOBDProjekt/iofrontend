import "./App.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import Navbar from "./assets/Navbar";
import { UserProvider } from "./context/UserContext";

function AppContent() {

    return (
        <>
            <Navbar/>
            <AppRoutes/>
        </>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <UserProvider>
                    <AppContent />
                </UserProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
