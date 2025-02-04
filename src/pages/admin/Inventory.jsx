import { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar";

export default function Inventory() {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
    const [supplier, setSupplier] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/inventory-items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    items.sort((a, b) => a.id - b.id);

    const handleAddItem = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/add-inventory-item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_name: itemName, quantity, purchase_price: purchasePrice, purchase_date: purchaseDate, supplier }),
            });
            ("body: ",JSON.stringify({ item_name: itemName, quantity, purchase_price: purchasePrice, purchase_date: purchaseDate, supplier }));

      

            ("response: ",response);

            if (response.status === 201) {
                ("Item added successfully");
                // Reset form fields
                setItemName("");
                setQuantity("");
                setPurchasePrice("");
                // setPurchaseDate(new Date().toISOString().split('T')[0]);
                setSupplier("");
                // fetchItems(); // Refresh the inventory list
            } else {
                console.error("Failed to add item");
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar page={'inventory'}/>
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-4xl bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                        <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center">
                            Add New Inventory Item
                        </h2>
                    </div>
                    <form method="POST" action="#" onSubmit={handleAddItem}>
                        <div className="mt-6">
                            <label
                                htmlFor="itemName"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Item Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="itemName"
                                    name="itemName"
                                    placeholder="Item Name"
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    required=""
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Quantity
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="quantity"
                                    name="quantity"
                                    placeholder="Quantity"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required=""
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="purchasePrice"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Purchase Price
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="purchasePrice"
                                    name="purchasePrice"
                                    placeholder="Purchase Price"
                                    type="number"
                                    value={purchasePrice}
                                    onChange={(e) => setPurchasePrice(e.target.value)}
                                    required=""
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="purchaseDate"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Purchase Date
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="purchaseDate"
                                    name="purchaseDate"
                                    type="date"
                                    value={purchaseDate}
                                    onChange={(e) => setPurchaseDate(e.target.value)}
                                    required=""
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="supplier"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Supplier
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="supplier"
                                    name="supplier"
                                    placeholder="Supplier"
                                    type="text"
                                    value={supplier}
                                    onChange={(e) => setSupplier(e.target.value)}
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
                                    Add Inventory Item
                                </button>
                            </span>
                        </div>
                    </form>
                    {/* Inventory Items */}
                    <div className="bg-gray-100 rounded-lg p-4 my-8">
                        <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center mb-6">
                            Inventory Items
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Item Name
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Purchase Price
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Purchase Date
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Supplier
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {item.item_name}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {item.purchase_price}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {item.purchase_date}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {item.supplier}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}