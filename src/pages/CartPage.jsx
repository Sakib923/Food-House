import NavbarTest from "../components/NavbarTest";

export default function CartPage() {
    return (
        <div>
            <NavbarTest page={'cart'} />
            <div className="flex items-center justify-center h-screen">
                <h1>Cart</h1>
            </div>
        </div>
    );
}