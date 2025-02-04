/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
// import { Buffer } from "buffer";
import FoodItem from "../components/FoodItem";
import NavbarTest from "../components/NavbarTest";

export default function HomePage() {
    const email = 'demo';
    const [foodItems, setFoodItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/food-items");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFoodItems(data);
            (data);
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);
    // return (
    //     <div>
    //         <NavbarTest page={'home'} />
    //         {foodItems.map((item) => (
    //             <FoodItem
    //                 key={item.itemId}
    //                 itemId={item.itemId}
    //                 itemName={item.Name}
    //                 price={item.Price}
    //             />
    //         ))}

    //     </div>
    // );

    return (
        <div>
            <NavbarTest page={"home"} email={email} />
            <section className="py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-xl:text-center">
      Food items
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
      {foodItems.map((item) => (
        <FoodItem
          key={Math.random()}
          itemId={item.food_id}
          itemName={item.food_name}
          price={item.price}
        />
      ))}
    </div>
  </div>
</section>

        </div>
    );
}
