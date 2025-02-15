/* eslint-disable no-unused-vars */
import {useState, useEffect, useContext} from "react";
import { useNavigate, NavLink } from "react-router";
import loginpage from "../../assets/employeeSideImages/loginImage/signin.webp";
import { UserData } from "../../context/UserData.jsx";



export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [worngCredentials, setWorngCredentials] = useState(false);
    const navigate = useNavigate();

    const userData = useContext(UserData);
    const { user, setUser } = userData;

    useEffect(() => {
        console.log(`In the SignIn component, user: ${JSON.stringify(user)}`);
        console.log(user);
    }, [user]);


    // Sign In handler
    const handleSignIn = async () => {

        try {
            const obj = {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })};
            // (obj)
            const response = await fetch('http://localhost:5000/adminsignin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }), 
            });

            const data = await response.json();

            if (data.success) {
                console.log(data);
                setWorngCredentials(false);
                setUser(prevUser => ({ ...prevUser, email: data.email, isAuthenticated: true, id: data.id, name: data.name, role: data.role, password: data.password }));
                navigate("/dashboard");
            } 
            else {
                setWorngCredentials(true);
                setUser(prevUser => ({ ...prevUser, email: "" }));
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div>
            <div className="min-h-screen flex">
                <div className="flex-1 flex flex-col bg-[#ff8851]">
                    <div className="flex-grow flex justify-center items-center">
                        <p className="text-white mt-6 text-center text-3xl leading-9 font-extrabold ">Food House</p>
                    </div>
                    <div className="relative">
                        <img
                            src={loginpage}
                            className="absoulte bottom-0 w-full object-cover"
                        />
                    </div>
                </div>
                {/* {B1A794} */}
                {/* {#E2DED9} */}
                <div className="flex-1 bg-[#EFE3DD]">
                    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://www.svgrepo.com/show/301692/login.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                                Employee Sign In
                            </h2>
                            
                        </div>
                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <form method="POST" action="#">
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
                                                onChange={(e) => setEmail(e.target.value)}
                                                required=""
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            />
                                            <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg
                                                    className="h-5 w-5 text-red-500"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-5 text-gray-700"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required=""
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <span className="block w-full rounded-md shadow-sm">
                                            <button
                                                type="submit"
                                                onClick={(e) => {e.preventDefault(); handleSignIn();}}
                                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                            >
                                                Sign In
                                            </button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
