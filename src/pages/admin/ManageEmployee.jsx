import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/admin/Navbar";
import { UserData } from "../../context/UserData";

export default function ManageEmployee() {
    const navigate = useNavigate();
    // Imported Context
    const userData = useContext(UserData);
    const { user } = userData;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    if(!user.isAuthenticated){
        navigate("/adminSignin");
    }

    // For demo purposes
    useEffect(() => {
        // Adding some demo employees
        const demoEmployees = [
            { id: 1, name: "Alice Johnson", email: "alice@example.com", position: "Staff", salary: 50000, phoneNo: "1234567890" },
            { id: 2, name: "Bob Smith", email: "bob@example.com", position: "Staff", salary: 55000, phoneNo: "0987654321" },
            { id: 3, name: "Charlie Brown", email: "charlie@example.com", position: "Manager", salary: 70000, phoneNo: "1122334455" },
        ];
        setEmployees(demoEmployees);
    }, []);
    // ------><----------------------><----------------------><----------------------><----------------------><------ //

    
    const handleAddEmployee = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/add-employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, position, salary, password, phoneNo, manager_id: user.id }),
            });

            const data = await response.json();

            if (data.success) {
                // Reset form fields
                setName("");
                setEmail("");
                setPosition("");
                setSalary("");
                setPassword("");
                setPhoneNo("");
                fetchEmployees(); // Refresh the employee list
            } else {
                console.error("Failed to add employee");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5000/employees');
            const data = await response.json();
            if (user.role === "Manager") {
                setEmployees(data.filter(employee => employee.position === "Staff"));
            } else if (user.role === "CEO") {
                setEmployees(data);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleEditEmployee = (employee) => {
        if (user.role === "Manager" && employee.position !== "Staff") {
            console.error("Managers can only edit staff information");
            return;
        }
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleUpdateEmployee = async () => {
        try {
            const response = await fetch(`http://localhost:5000/update-employee/${selectedEmployee.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedEmployee),
            });

            const data = await response.json();

            if (data.success) {
                setIsModalOpen(false);
                fetchEmployees(); // Refresh the employee list
            } else {
                console.error("Failed to update employee");
            }
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (user.role === "Staff") {
        return <div>
            <Navbar />
            Access Denied</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar state={email} page={'employeesdata'}/>
            {/* Add Employee */}
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-4xl bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                        <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center">
                            Add New Employee
                        </h2>
                    </div>
                    <form method="POST" action="#" onSubmit={handleAddEmployee}>
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
                                    placeholder="John Doe"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    required=""
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    required=""
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex space-x-4">
                            <div className="flex-1">
                                <label
                                    htmlFor="position"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    Position
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <select
                                        id="position"
                                        name="position"
                                        onChange={(e) => setPosition(e.target.value)}
                                        required=""
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    >
                                        <option value="">Select Position</option>
                                        {user.role === "CEO" && <option value="Manager">Manager</option>}
                                        <option value="Staff">Staff</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="salary"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    Salary
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="salary"
                                        name="salary"
                                        placeholder="50000"
                                        type="number"
                                        onChange={(e) => setSalary(e.target.value)}
                                        required=""
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
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
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required=""
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="phoneNo"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Phone Number
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="phoneNo"
                                    name="phoneNo"
                                    placeholder="1234567890"
                                    type="text"
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    required=""
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                >
                                    Add Employee
                                </button>
                            </span>
                        </div>
                    </form>
                    {/* Employee Info */}
                    <div className="bg-gray-100 rounded-lg p-4 my-8">
                        <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center mb-6">
                            Employee Information
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Salary
                                        </th>
                                        {/* <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Phone Number
                                        </th> */}
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {employee.name}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {employee.email}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {employee.position}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {employee.salary}
                                            </td>
                                            {/* <td className="px-4 py-2 border-b border-gray-200">
                                                {employee.phoneNo}
                                            </td> */}
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                <button
                                                    onClick={() => handleEditEmployee(employee)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                (console.log(selectedEmployee)) ||
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Edit Employee
                                        </h3>
                                        <div className="mt-2">
                                            <label
                                                htmlFor="edit-name"
                                                className="block text-sm font-medium leading-5 text-gray-700"
                                            >
                                                Name
                                            </label>
                                            <input
                                                id="edit-name"
                                                name="edit-name"
                                                type="text"
                                                value={selectedEmployee.name}
                                                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <label
                                                htmlFor="edit-email"
                                                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                                            >
                                                Email
                                            </label>
                                            <input
                                                id="edit-email"
                                                name="edit-email"
                                                type="email"
                                                value={selectedEmployee.email}
                                                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <label
                                                htmlFor="edit-position"
                                                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                                            >
                                                Position
                                            </label>
                                            <input
                                                id="edit-position"
                                                name="edit-position"
                                                type="text"
                                                value={selectedEmployee.position}
                                                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <label
                                                htmlFor="edit-salary"
                                                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                                            >
                                                Salary
                                            </label>
                                            <input
                                                id="edit-salary"
                                                name="edit-salary"
                                                type="number"
                                                value={selectedEmployee.salary}
                                                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, salary: e.target.value })}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {/* <label
                                                htmlFor="edit-phoneNo"
                                                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                id="edit-phoneNo"
                                                name="edit-phoneNo"
                                                type="text"
                                                value={selectedEmployee.phoneNo}
                                                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phoneNo: e.target.value })}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleUpdateEmployee}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}