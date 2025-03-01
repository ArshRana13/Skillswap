import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./assets/components/Footer";
import Navbar from "./assets/components/Navbar";
import Product from "./assets/pages/Product";
import WelcomePage from "./assets/pages/WelcomePage";
import LoginPage from "./assets/pages/LoginPage";
import SignUpPage from "./assets/pages/SignUpPage";
import Dashboard from './assets/pages/Dashboard';
import DashboardNavbar from './assets/components/DashboardNavbar';
import RequirementCard from './assets/components/RequirementCard';
import Post from './assets/pages/Post';
import ChatPageForDesktop from './assets/pages/ChatPageForDesktop';

function App() {
    return (
        <Router>
            <div className="">
                
                <Routes>
                    <Route path="/" element={<><Navbar/><WelcomePage/><Product/><Footer/></>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/dashboard" element={<><DashboardNavbar/><Dashboard/></>} />
                    <Route path="/requirement" element={<><RequirementCard/><RequirementCard/></>} />
                    <Route path="/post" element={<><DashboardNavbar/><Post/></>} />
                    <Route path='/chat' element={<><DashboardNavbar/> <ChatPageForDesktop/></>}></Route>

                </Routes>
                
            </div>
        </Router>
    );
}

export default App;