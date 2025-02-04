export default function FoodItemSkeleton() {
    return (
        <div
            className="flex flex-col gap-2"
            key={Math.floor(Math.random() * 100) + Math.random() * 10}
        >
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-300f animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}