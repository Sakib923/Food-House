import {useState, useEffect, useContext} from "react";
import { useNavigate, NavLink } from "react-router";
import { UserData } from "../context/UserData";
import loginpage from "../assets/loginPageImage/loginpage.webp";



export default function SignIn() {


    const userData = useContext(UserData);
    const {user, setUser} = userData;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [worngCredentials, setWorngCredentials] = useState(false);
    const navigate = useNavigate();

    const handleEvent = async () => {

        try {
            const obj = {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })};
            (obj)
            const response = await fetch('http://localhost:5000/signin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
              
            });

            // for debugging
            ("response: "+ response.body);
            // -----><-----

            const data = await response.json();

            // for debugging
            console.log("data: "+ data);
            console.log(data);
            // -----><-----

            if (data.success) {
                setWorngCredentials(false);
                setUser(prevUser => ({ ...prevUser, email: data.email, isAuthenticated: true, id: data.id, name: data.name, password: data.password }));

                navigate("/home", {state: {email}});
                ("Sign In Successful");
            } else {
                setWorngCredentials(true);
                ('User not inserted:', data);
            }
        } catch (error) {
            ('Error:', error);
        }
    }

    return (
        <div>
            <div className="min-h-screen flex">
                <div className="flex-1 flex flex-col bg-[#32231a]">
                    <div className="flex-grow flex justify-center items-center">
                        <p className="text-white mt-6 text-center text-3xl leading-9 font-extrabold">Food House</p>
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
                <div className="flex-1 bg-[#B1A794]">
                    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://www.svgrepo.com/show/301692/login.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                                Sign In
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
                                                onClick={(e) => {e.preventDefault(); handleEvent();}}
                                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                            >
                                                Sign In
                                            </button>
                                        </span>
                                    </div>
                                    <p className="mt-6 text-xs text-gray-600 text-center ">
                                        Don&apos;t have an account?&nbsp;
                                        <NavLink
                                            to="/signup"
                                            className=" font-bold text-blue-500 border-b border-gray-500 border-dotted"
                                            
                                        >
                                            Sign Up
                                        </NavLink>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // return (
    //     <div>
    //         <div className="min-h-screen flex">
    //             <div className="flex-1 flex flex-col bg-[#32231a]">
    //                 <div id="imageTop" className="flex-grow">
    //                     {/* Content here */}
    //                 </div>
    //                 <div className="relative">
    //                     <img src={loginpage} className="absolute bottom-0 w-full object-cover" alt="Login Page" />
    //                 </div>
    //             </div>
    //             <div className="flex-1 bg-slate-500">
    //                 hello
    //             </div>
    //         </div>
    //     </div>
    // );
}
