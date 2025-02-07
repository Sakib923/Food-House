import { NavLink } from "react-router";

// eslint-disable-next-line react/prop-types
export default function NavbarTest({page}) {
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/prop-types


    const baseClasses = "block py-2 px-3 rounded md:p-0 dark:text-white";
    const activeClasses = "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500";
    const inactiveClasses = "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500";

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink
                                to='/dashboard'
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    {/* <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    /> */}
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Food House
                    </span>
                </NavLink>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {/* Dashboard */}
                        <li>
                            <NavLink
                                to='/dashboard'
                                className={`${baseClasses} ${page === 'home' ? activeClasses : inactiveClasses}`}                            
                                aria-current="page"
                            >
                                Home
                            </NavLink>
                        </li>

                        {/* Food */}
                        <li>
                            <NavLink
                                to='/adminManageFood'
                                className={`${baseClasses} ${page === 'manage-food' ? activeClasses : inactiveClasses}`}                            
                                aria-current="page"
                            >
                                Foods
                            </NavLink>
                        </li>

                        {/* Employee */}
                        <li>
                            <NavLink
                                to='/employeesdata'
                                className={`${baseClasses} ${page === 'employeesdata' ? activeClasses : inactiveClasses}`}                            
                                aria-current="page"
                            >
                                Employees
                            </NavLink>
                        </li>

                        {/* Orders */}
                        <li>
                            <NavLink
                                to='/adminSettings'
                                className={`${baseClasses} ${page === 'settings' ? activeClasses : inactiveClasses}`}                            
                            >
                                Settings
                            </NavLink>
                        </li>
                        
                        {/* Inventory */}
                        <li>
                            <NavLink
                                to='/inventory'
                                className={`${baseClasses} ${page === 'inventory' ? activeClasses : inactiveClasses}`}                            
                            >
                                Inventory
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
