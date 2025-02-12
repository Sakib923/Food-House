import { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar";

export default function ManageFood() {
    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");
    const [available, setAvailable] = useState(true);
    const [image, setImage] = useState(null);
    const [foods, setFoods] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    
    const handleAddFood = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('food_name', foodName);
        // formData.append('category', category);
        formData.append('price', price);
        formData.append('available', available);
        formData.append('food_image', image);

        try {
            const response = await fetch('http://localhost:5000/add-food-item', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                ("Food item added successfully");
                // Reset form fields
                setFoodName("");
                setPrice("");
                setAvailable(true);
                setImage("");
                fetchFoods(); // Refresh the food list
            } else {
                console.error("Failed to add food item");
            }
        } catch (error) {
            console.error("Error adding food item:", error);
        }
    };

    const fetchFoods = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/food-items');
            const data = await response.json();
            setFoods(data);
        } catch (error) {
            console.error("Error fetching foods:", error);
        }
    };

    // Edit food item onClick of edit button with the handleEditFood and handleUpdate function
    // Working Properly
    const handleEditFood = (food) => {
        const {food_id, food_name, price} = food;
        let {available} = food;

        if (available === 1) {
            available = true;
        } else {
            available = false;
        }
        setSelectedFood({ food_id, food_name, price, available });
        setIsModalOpen(true);
    };
    const handleUpdateFood = async () => {
        try {
            const response = await fetch(`http://localhost:5000/update-food`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedFood),
            });

            const data = await response.json();

            if (data.success) {
                ("Food item updated successfully");
                setIsModalOpen(false);
                fetchFoods(); // Refresh the food list
            } else {
                console.error("Failed to update food item");
            }
        } catch (error) {
            console.error("Error updating food item:", error);
        }
    };
    // ----------------------------------------------

    // Remove food item onClick of remove button
    // Working Properly
    const handleRemoveFood = async (food_id) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-food`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ food_id: food_id }),
            });

            console.log('logging the response');
            // console.log(response);
            
            const data = await response.json();

            if (data.success) {
                ("Food item removed successfully");
                fetchFoods(); // Refresh the food list
            } else {
                console.error("Failed to remove food item");
            }
        } catch (error) {
            console.error("Error removing food item:", error);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar page={'manage-food'} />
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-4xl bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                        <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center">
                            Add New Food Item
                        </h2>
                    </div>
                    <form method="POST" action="#" onSubmit={handleAddFood} encType="multipart/form-data">
                        <div className="mt-6">
                            <label
                                htmlFor="foodName"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Food Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="foodName"
                                    name="foodName"
                                    placeholder="Food Name"
                                    type="text"
                                    value={foodName}
                                    onChange={(e) => setFoodName(e.target.value)}
                                    required=""
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-6 flex space-x-4">
                            <div className="flex-1">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    Price
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="price"
                                        name="price"
                                        placeholder="Price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required=""
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="available"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    Available
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <select
                                        id="available"
                                        name="available"
                                        value={available}
                                        onChange={(e) => setAvailable(e.target.value === 'true')}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    >
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Image
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="image"
                                    name="image"
                                    type="string"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
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
                                    Add Food Item
                                </button>
                            </span>
                        </div>
                    </form>
                    {/* Food Items */}
                    <div className="bg-gray-100 rounded-lg p-4 my-8">
                        <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center mb-6">
                            Food Items
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Food Name
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Available
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foods.map((food) => (
                                        <tr key={(Math.random()*(10)) + (Math.random() * (10))}>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {food.food_name}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {food.price}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {food.available ? 'Available' : 'Not Available'}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                <button
                                                    onClick={() => handleEditFood(food)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveFood(food.food_id)}
                                                    className="text-red-600 hover:text-red-900 ml-4"
                                                >
                                                    Remove
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
                                            Edit Food Item
                                        </h3>
                                        <div className="mt-2">
                                            <label
                                                htmlFor="edit-foodName"
                                                className="block text-sm font-medium leading-5 text-gray-700"
                                            >
                                                Food Name
                                            </label>
                                            <input
                                                id="edit-foodName"
                                                name="edit-foodName"
                                                type="text"
                                                value={selectedFood.food_name}
                                                onChange={(e) => setSelectedFood({ ...selectedFood, food_name: e.target.value })}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            
                                            <label
                                                htmlFor="edit-price"
                                                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                                            >
                                                Price
                                            </label>
                                            <input
                                                id="edit-price"
                                                name="edit-price"
                                                type="number"
                                                value={selectedFood.price}
                                                onChange={(e) => setSelectedFood({ ...selectedFood, price: e.target.value })}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <label
                                                htmlFor="edit-available"
                                                className="block text-sm font-medium leading-5 text-gray-700 mt-4"
                                            >
                                                Available
                                            </label>
                                            <select
                                                id="edit-available"
                                                name="edit-available"
                                                value={selectedFood.available}
                                                onChange={(e) =>{console.log(e.target.value); setSelectedFood({ ...selectedFood, available: e.target.value  })}}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="true">Available</option>
                                                <option value="false">Not Available</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleUpdateFood}
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