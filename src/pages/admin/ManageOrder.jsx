import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-";

export default function ManageOrder() {

    return(
        <div>
            <Navbar page={'manage-order'} state={state} />
            <div className="flex items-center justify-center h-screen">
                <h1>Manage Order</h1>
                </div>
        </div>
    )
}