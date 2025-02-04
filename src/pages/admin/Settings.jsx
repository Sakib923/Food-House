import Navbar from "../../components/admin/Navbar";

export default function Settings() {

    return (
        <div>
            <Navbar page={"settings"}/>
            <div className="flex items-center justify-center h-screen">
                <h1>Settings</h1>
            </div>
        </div>
    );
}
