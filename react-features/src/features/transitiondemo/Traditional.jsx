import { useState } from "react";

const Traditional = () => {
    const [quantity, setQuantity] = useState(1);
    const [isPending, setIsPending] = useState(false);

    const onUpdateQuantity = async newQuantity => {
        setIsPending(true);
        const savedQuantity = await updateQuantity(newQuantity);
        setIsPending(false);
        setQuantity(savedQuantity);
    };

    function updateQuantity(newQuantity) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(newQuantity);
            }, 2000);
        });
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                        Quantity:
                    </label>
                    <input
                        type="number"
                        min="1"
                        onChange={(e) => onUpdateQuantity(Number(e.target.value))}
                        className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter quantity"
                    />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-600 mb-1">Total amount:</div>
                    <div className="text-2xl font-bold text-gray-800">
                        {isPending ? (
                            <span className="text-gray-400">Calculating...</span>
                        ) : (
                            `$${(quantity * 20.00).toFixed(2)}`
                        )}
                    </div>
                </div>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                <p>
                    This example shows a traditional approach using state management.
                    When user changes quantity multiple times, the total amount may lag behind and
                    show outdated values until the last update completes.
                </p>
                <br></br>
                <p>
                    The input doesnt have value attribute bound to state, so it remains responsive
                    during the async update. However, the total amount section shows a loading
                    state while waiting for the async operation to complete. Fix would be to disable
                    the input during the update to prevent further changes. But that would hurt UX.
                </p>
            </div>
        </div>
    );
}

export default Traditional;