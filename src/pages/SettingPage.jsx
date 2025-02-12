import { useEffect, useState } from 'react';
import NavbarTest from "../components/NavbarTest";

export default function SettingPage() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user information from the server
        fetch('/api/user-info')
            .then(response => response.json())
            .then(data => {
                setUserInfo(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send updated user information to the server
        fetch('/api/update-user-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(response => response.json())
            .then(data => {
                console.log('User info updated:', data);
            })
            .catch(error => console.error('Error updating user info:', error));
    };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
        <NavbarTest />
        
        <div className="min-h-screen flex">
            {/* Left side design similar to SignUp page */}
            <div className="flex-1 flex flex-col bg-[#32231a]">
                <div className="flex-grow flex justify-center items-center">
                    <p className="text-white mt-6 text-center text-3xl leading-9 font-extrabold">Food House</p>
                </div>
                <div className="relative">
                    <img
                        src="https://via.placeholder.com/600x400" // Replace with your image path
                        className="absolute bottom-0 w-full object-cover"
                        alt="Settings"
                    />
                </div>
            </div>
            {/* Right side form */}
            <div className="flex-1 bg-[#B1A794]">
                <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://www.svgrepo.com/show/301692/login.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            Settings
                        </h2>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form onSubmit={handleSubmit}>
                                <div className="mt-6">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={userInfo.name}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={userInfo.email}
                                            onChange={handleChange}
                                            disabled
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                                            type="password"
                                            value={userInfo.password}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                    >
                                        Save Changes
                                    </button>
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