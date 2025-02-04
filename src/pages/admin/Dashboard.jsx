import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/admin/Navbar";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { UserData } from "../../context/UserData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {

    const [salesData, setSalesData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Sales',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });
    const [orders, setOrders] = useState([]);
    // Import navigate from react-router
    const navigate = useNavigate();
    
    // Imported Context
    const userData = useContext(UserData);
    const { user, setUser } = userData;

    // Check if user is authenticated else redirect to admin sign-in page
    if (!user.isAuthenticated) {
        // Redirect to admin sign-in page
        navigate("/adminSignin");

    }

    // Fetch sales data and orders on component mount
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch('http://localhost:5000/sales/last7days');
                const data = await response.json();
                ("Sales data:", data);

                const today = new Date();
                const labels = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    labels.push(date.toISOString().split('T')[0]);
                }

                const sales = new Array(7).fill(data.sales_count);

                setSalesData({
                    labels,
                    datasets: [
                        {
                            label: 'Sales',
                            data: sales,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchSalesData();
        fetchOrders();
    }, []);

    // Update order status
    const handleUpdateOrderStatus = async (orderId, status) => {
        try {
            const response = await fetch(`http://localhost:5000/update-order/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            const data = await response.json();

            if (data.success) {
                ("Order status updated successfully");
                setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
            } else {
                console.error("Failed to update order status");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales for the Last 7 Days',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Sales: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Navbar page={'home'} />
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-4xl font-bold my-8">Dashboard</h1>
                <div className="w-full max-w-4xl mb-8">
                    <Bar data={salesData} options={options} />
                </div>
                <div className="w-full max-w-4xl bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                        <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center">
                            Manage Orders
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        User ID
                                    </th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {order.id}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {order.user_id}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {order.date}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            ${order.price}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {order.status}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            >
                                                <option value="pre-order">Pre-order</option>
                                                <option value="transit">In transit</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}