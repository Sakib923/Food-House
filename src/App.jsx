import { Navigate, Routes, Route } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import CartPage from "./pages/CartPage";
import ManageFood from "./pages/admin/ManageFood";
import { OrderPage } from "./pages/OrderPage";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import ManageEmployee from "./pages/admin/ManageEmployee";
import Inventory from "./pages/admin/Inventory";
import AdminSignIn from "./pages/admin/AdminSignIn";

function App() {
    // const [count, setCount] = useState(0);

    return (
        <Routes>
            {/* <Route path="/">
                <Navbar />
            </Route> */}
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route
                path="/hello"
                element={
                    <>
                        <h1 className="text-red-500 text-center">
                            {" "}
                            Hello. Welcome to
                            <br />{" "}
                            <code className="bg-slate-400 rounded text-black">
                                Java Junction
                                <br /> Byte & Bean <br /> Logic Latte <br />
                                Algorithm Aroma <br /> Bit & Brew
                            </code>
                        </h1>
                        <p>
                            Chose a name for our project amoung these. I got
                            these name from{" "}
                            <a
                                className="text-white bg-gray-400 rounded"
                                href="https://www.cuboh.com/blog/cafe-names"
                            >
                                https://www.cuboh.com/blog/cafe-names
                            </a>
                        </p>
                    </>
                }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* <Route path="/adminSignin" element={<SignIn />} /> */}
            <Route path="/orders" element={<OrderPage />} />

            {/* Admin sites */}
            <Route path="/adminSignin" element={<AdminSignIn />} />
            <Route path="/adminManageFood" element={<ManageFood />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adminSettings" element={<Settings />} />
            <Route path='/adminManageFood' element={<ManageFood />} />
            <Route path="/employeesdata" element={<ManageEmployee />} />
            <Route path="/inventory" element={<Inventory />} />
        </Routes>
    );
}

export default App;
