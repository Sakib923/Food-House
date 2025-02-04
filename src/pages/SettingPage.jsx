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
                // Handle success
                ('User info updated:', data);
            })
            .catch(error => console.error('Error updating user info:', error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <NavbarTest page={'settings'} />
            <div className="container mx-auto py-8">
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Settings</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                disabled
                                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
