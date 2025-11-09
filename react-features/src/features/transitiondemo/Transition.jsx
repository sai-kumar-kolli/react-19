import { useState, useTransition } from "react";

const Transition = () => {
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition(false);

    const onUpdateQuantity = async newQuantity => {
        startTransition(async () => {
            const savedQuantity = await updateQuantity(newQuantity);
            setQuantity(savedQuantity);
        });
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
                        onChange={(e) => onUpdateQuantity(e.target.valueAsNumber)}
                        className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
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
            <div className="text-sm text-gray-600 bg-green-50 p-4 rounded-lg">
                <p>
                    This example demonstrates the use of React's Transition feature to manage UI updates during asynchronous operations.
                    When the user changes the quantity multiple times, the UI remains responsive and updates smoothly without showing outdated values.
                </p>
                <br></br>
                <p>
                    By leveraging Transition, we can prioritize urgent updates (like input responsiveness) while deferring less critical updates (like total amount calculation).
                    This results in a better user experience, as the input field remains interactive and the total amount updates seamlessly once the async operation completes.
                </p>
            </div>
        </div>
    )
}

export default Transition;