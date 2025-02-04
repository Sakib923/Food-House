import Navbar from "../../components/admin/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar page={'home'} />
            <div className="flex items-center justify-center h-screen">
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}