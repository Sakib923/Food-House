import React from 'react';

const SettingsSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="flex-1 text-center hidden lg:flex rounded-l-lg">
                    <div className="w-full bg-contain bg-center bg-no-repeat m-auto">
                        <div className="mx-auto max-h-[550px] object-contain rounded-t-lg bg-gray-300 animate-pulse" style={{ height: '100%', width: '100%' }}></div>
                    </div>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 py-auto">
                    <div className="flex justify-between m-auto mt-5 pb-10">
                        <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="flex-1 ml-4">
                            <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="m-auto mb-4 text-center">
                        <div className="h-8 bg-gray-300 rounded animate-pulse mx-auto"></div>
                    </div>
                    <form>
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <div className="w-full h-12 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="md:ml-2">
                                <div className="w-full h-12 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="w-full h-12 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <div className="w-full h-12 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="md:ml-2">
                                <div className="w-full h-12 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                        <div className="mb-6 text-center">
                            <div className="w-full h-12 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                        <hr className="mb-2 border-t" />
                        <div className="text-center">
                            <div className="h-4 bg-gray-300 rounded animate-pulse mx-auto"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsSkeleton;