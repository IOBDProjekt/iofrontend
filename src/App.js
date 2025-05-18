import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import Navbar from "./assets/Navbar";
import { UserProvider } from "./context/UserContext";
import LandingNavbar from "./assets/LandingNavbar";
import useHomeLogic from './pages/HomePageFunctionalities/useHomeLogic';

function AppContent() {
    const location = useLocation();
    const homeLogicProps = useHomeLogic();

    const landingRoutes = ['/', '/login', '/register'];
    const isLandingNavbarRoute = landingRoutes.includes(location.pathname);

    return (
        <>
            {isLandingNavbarRoute ? (
                <LandingNavbar />
            ) : (
                <Navbar
                    favorites={homeLogicProps.favorites}
                    allPosts={homeLogicProps.allPosts}
                    toggleFavorite={homeLogicProps.toggleFavorite}
                />
            )}
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