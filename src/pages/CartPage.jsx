import { useState, useEffect, useContext } from "react";
import { UserData } from "../context/UserData";
import NavbarTest from "../components/NavbarTest";

export default function CartPage() {
    const userData = useContext(UserData);
    const { user, setUser } = userData;

    const [cartItems, setCartItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/cart-items", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setCartItems(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const handleCheckout = () => {
        // Add checkout functionality here, for example: navigate("/checkout");
        console.log("Proceeding to checkout");
    }

    const increment = async (itemId) => {
        try {
            const response = await fetch("http://localhost:5000/increment-item", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, food_id: itemId }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
            fetchItems();
        } catch (error) {
            console.error("Error incrementing item:", error);
        }
    };

    const decrement = async (itemId) => {
        try {
            const response = await fetch("http://localhost:5000/decrement-item", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, food_id: itemId }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
            fetchItems();
        } catch (error) {
            console.error("Error decrementing item:", error);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    // const handleCheckout = () => {
    //     // Add checkout functionality here, for example: navigate("/checkout");
    //     console.log("Proceeding to checkout");
    // };

    return (
        <div className="">
            <NavbarTest page={"order"} />
            <section className="bg-white py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                My Cart
                            </h2>
                        </div>
                        {cartItems.map((item) => (
                            <div key={(Math.random()*10) + (Math.random()*10)} className="mt-6 flow-root sm:mt-8">
                                <div className="divide-y divide-gray-200">
                                    <div className="flex flex-wrap items-center gap-y-4 py-6">
                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500">
                                                Food Item Name:
                                            </dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                                <a href="#" className="hover:underline">
                                                    {item.food_name}
                                                </a>
                                            </dd>
                                        </dl>
                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500">
                                                Quantity
                                            </dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                                {item.quantity}
                                            </dd>
                                        </dl>
                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500">
                                                Total Price:
                                            </dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                                ${item.price * item.quantity}
                                            </dd>
                                        </dl>
                                        <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                            <form className="max-w-xs mx-auto">
                                                <label
                                                    htmlFor="quantity-input"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Choose quantity:
                                                </label>
                                                <div className="relative flex items-center max-w-[8rem]">
                                                    <button
                                                        type="button"
                                                        id="decrement-button"
                                                        data-input-counter-decrement="quantity-input"
                                                        onClick={() => decrement(item.food_id)}
                                                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                    >
                                                        <svg
                                                            className="w-3 h-3 text-gray-900 dark:text-white"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 18 2"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M1 1h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        id="quantity-input"
                                                        data-input-counter=""
                                                        aria-describedby="helper-text-explanation"
                                                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={item.quantity}
                                                        required=""
                                                    />
                                                    <button
                                                        type="button"
                                                        id="increment-button"
                                                        data-input-counter-increment="quantity-input"
                                                        onClick={() => increment(item.food_id)}
                                                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                    >
                                                        <svg
                                                            className="w-3 h-3 text-gray-900 dark:text-white"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 18 18"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 1v16M1 9h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {/* Repeat similar changes for other order items */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Floating Checkout Button */}
            <button
                type="button"
                onClick={handleCheckout}
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full shadow-lg focus:outline-none"
            >
                Proceed to Checkout
            </button>
        </div>
    );
}