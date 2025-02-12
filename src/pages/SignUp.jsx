import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { UserData } from "../context/UserData.jsx";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [c_password, setC_Password] = useState("");
    const [userExist, setUserExist] = useState(false);
    const navigate = useNavigate();

    const userData = useContext(UserData);
        const { user, setUser } = userData;

    const handleRegistration = async (e) => {
        const name = firstName + " " + lastName;
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
            console.log("Registration Successful");
            try {
                const response = await fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password }),
                });
                console.log("response: " + response.body);
                const data = await response.json();
                console.log("data: " + data);
                if (data.success) {
                    setUserExist(false);
                    setUser(prevUser => ({ ...prevUser, email: data.email, isAuthenticated: true, id: data.id, name: data.name, password: data.password }));
                    console.log(user);
                    navigate("/home");
                    console.log("Registration Successful");
                } else {
                    setUserExist(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex flex-col bg-[#32231a]">
                <div className="flex-grow flex justify-center items-center">
                    <p className="text-white mt-6 text-center text-3xl leading-9 font-extrabold">Food House</p>
                </div>
                <div className="relative">
                    <img
                        src="https://via.placeholder.com/600x400" // Replace with your image path
                        className="absolute bottom-0 w-full object-cover"
                        alt="Sign Up"
                    />
                </div>
            </div>
            <div className="flex-1 bg-[#B1A794]">
                <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://www.svgrepo.com/show/301692/login.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            Sign Up
                        </h2>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form method="POST" action="#">
                                <div className="mt-6">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        First Name
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="First Name"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required=""
                                            className={`appearance-none block w-full px-3 py-2 border ${firstName !== null ? 'border-gray-300' : 'border-red-600'} rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Last Name
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Last Name"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required=""
                                            className={`appearance-none block w-full px-3 py-2 border ${lastName !== null ? 'border-gray-300' : 'border-red-600'} rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="email"
                                            name="email"
                                            placeholder="user@example.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required=""
                                            className={`appearance-none block w-full px-3 py-2 border ${email !== null ? 'border-gray-300' : 'border-red-600'} rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required=""
                                            className={`appearance-none block w-full px-3 py-2 border ${password !== null ? 'border-gray-300' : 'border-red-600'} rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="c_password"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="c_password"
                                            name="c_password"
                                            placeholder="Confirm Password"
                                            type="password"
                                            value={c_password}
                                            onChange={(e) => setC_Password(e.target.value)}
                                            required=""
                                            className={`appearance-none block w-full px-3 py-2 border ${c_password !== null ? 'border-gray-300' : 'border-red-600'} rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button
                                            type="submit"
                                            onClick={(e) => handleRegistration(e)}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                        >
                                            Register Account
                                        </button>
                                    </span>
                                </div>
                                {userExist && (
                                    <p className="mt-6 text-xs text-red-500 text-center">
                                        User already exists
                                    </p>
                                )}
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    Already have an account?&nbsp;
                                    <NavLink
                                        to="/signin"
                                        className="font-bold text-blue-500 border-b border-gray-500 border-dotted"
                                    >
                                        Sign In
                                    </NavLink>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}