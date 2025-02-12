export default function Modal({ModalText, ModalTitle, ModalAction, deleteEmployeeModal, setDeleteEmployeeModal}){
    return (
        <div>
        <div
            id="popup-modal"
            tabIndex={10}
            className={`${
                deleteEmployeeModal ? "" : "hidden"
            } fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() =>
                            setDeleteEmployeeModal(false)
                        }
                    >
                        <span className="sr-only">Close modal</span>
                        &times;
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this
                            employee?
                        </h3>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            onClick={() =>
                                setDeleteEmployeeModal(false)
                            }
                            className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            No, cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}