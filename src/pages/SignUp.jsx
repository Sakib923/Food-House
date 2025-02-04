import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
// import signUpImage from '..assets/signUpPageImage/signUp.jpg';
// import signUpImage from '../assets/signUpPageImage/signUp.jpg';

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [c_password, setC_Password] = useState("");
    const [userExist, setUserExist] = useState(false);
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === "" ||
            c_password === ""
        ) {
            if (firstName === "") {
                setFirstName(null);
            }
            if (lastName === "") {
                setLastName(null);
            }
            if (email === "") {
                setEmail(null);
            }
            if (password === "") {
                setPassword(null);
            }
            if (c_password === "") {
                setC_Password(null);
            }
            return;
        }

        if (password !== c_password) {
            setC_Password(null);
            setPassword(null);
        } else if (password === c_password) {
            ("Registration Successful");
            try {
                const obj = {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firstName, lastName, email, password })};
                (obj)
                const response = await fetch('http://localhost:5000/users', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ firstName, lastName, email, password }),
                  
                });
                ("response: "+ response.body);
                const data = await response.json();
                ("data: "+ data);
                if (data.success) {
                    setUserExist(false);
                    navigate("/home");
                    ("Registration Successful");
                } else {
                    setUserExist(true);
                }
            } catch (error) {
                ('Error:', error);
            }    
        }
    };

   

    return (
        <>
            {/* source: https://gist.github.com/nraloux/bce10c4148380061781b928cdab9b193 */}
            {/* I have added support for dark mode and improved UI */}
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="flex-1  text-center hidden lg:flex rounded-l-lg">
                        <div className="w-full bg-contain bg-center bg-no-repeat m-auto">
                            <img
                                className="mx-auto max-h-[550px] object-contain rounded-t-lg "
                                
                                alt="Sign up Illustration"
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 py-auto">
                        <div className="flex justify-between m-auto mt-5 pb-10">
                            {/* <img
                                src="https://img.icons8.com/cotton/64/note--v2.png"
                                className="w-16 ml-auto mr-2"
                            /> */}
                            <h1 className="mr-auto my-auto text-3xl font-extrabold">
                                <span className="text-[#b5a809]"> Food</span>{" "}
                                House
                            </h1>
                        </div>
                        <div className="m-auto mb-4 text-center">
                            <h2 className="text-indigo-500 mx-auto text-2xl xl:text-3xl font-extrabold pb-2">
                                Sign Up
                            </h2>
                        </div>
                        <form>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    {/*User First Name*/}
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border  placeholder-gray-500 text-sm focus:outline-none ${
                                            firstName !== null
                                                ? "border-gray-200 focus:border-indigo-600 focus:shadow-xl focus:shadow-indigo-500/10"
                                                : "border-red-600 focus:shadow-xl shadow-red-500/10"
                                        } focus:bg-white`}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                        value={firstName}
                                    />
                                </div>
                                <div className="md:ml-2">
                                    {/*User Last Name*/}
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border  placeholder-gray-500 text-sm focus:outline-none 
                                            ${ lastName !== null
                                                ? "border-gray-200 focus:border-indigo-600 focus:shadow-xl focus:shadow-indigo-500/10"
                                                : "border-red-600 focus:shadow-xl shadow-red-500/10"
                                            } focus:bg-white`
                                        }
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                        value={lastName}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                {/*User Email*/}
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border  placeholder-gray-500 text-sm focus:outline-none ${
                                        email !== null
                                            ? "border-gray-200 focus:border-indigo-600 focus:shadow-xl focus:shadow-indigo-500/10"
                                            : "border-red-600 focus:shadow-xl shadow-red-500/10"
                                    } focus:bg-white`}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                />
                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    {/*User Password*/}
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border  placeholder-gray-500 text-sm focus:outline-none ${
                                            password !== null
                                                ? "border-gray-200 focus:border-indigo-600 focus:shadow-xl focus:shadow-indigo-500/10"
                                                : "border-red-600 focus:shadow-xl shadow-red-500/10"
                                        } focus:bg-white`}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        value={password}
                                    />
                                </div>

                                <div className="md:ml-2">
                                    {/*Confirm Password*/}
                                    <input
                                        id="c_password"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border  placeholder-gray-500 text-sm focus:outline-none ${
                                            c_password !== null
                                                ? "border-gray-200 focus:border-indigo-600 focus:shadow-xl focus:shadow-indigo-500/10"
                                                : "border-red-600 focus:shadow-xl shadow-red-500/10"
                                        } focus:bg-white`}
                                        onChange={(e) => {
                                            setC_Password(e.target.value);
                                        }}
                                        value={c_password}
                                    />
                                </div>
                            </div>
                            <div className="mb-6 text-center">
                                {/*Register Button*/}
                                {userExist && (
                                    <p className="text-red-500 text-xs italic">
                                        User already exists
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={(e) => handleRegistration(e)}
                                >
                                    Register Account
                                </button>
                            </div>
                            <hr className="mb-2 border-t" />

                            <div className="text-center">
                                <p className="mt-6 text-xs text-gray-600 text-center ">
                                    Already have an account?&nbsp;
                                    <NavLink
                                        to="/signin"
                                        className=" font-bold text-blue-500 border-b border-gray-500 border-dotted"
                                    >
                                        Sign In
                                    </NavLink>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
