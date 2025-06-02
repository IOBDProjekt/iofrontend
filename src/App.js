import "./App.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import Navbar from "./assets/Navbar";
import { UserProvider } from "./context/UserContext";
import useHomeLogic from "./pages/HomePageFunctionalities/useHomeLogic";

function AppContent() {
    const location = useLocation();
    const homeLogicProps = useHomeLogic();

    return (
        <>
            <Navbar
                favorites={homeLogicProps.favorites}
                allPosts={homeLogicProps.allPosts}
                toggleFavorite={homeLogicProps.toggleFavorite}
            />

            <AppRoutes homeLogicProps={homeLogicProps} />
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
