// src/components/CheckoutInfo.tsx
export default function CheckoutInfo() {
  const easypaisaNumber = "0315-2634512" // yahan apna number daalo

  return (
    <div className="p-4 border rounded-lg bg-yellow-50 mt-4">
      <h2 className="font-bold text-lg mb-2">Payment Instructions</h2>
      <p>
        To complete your purchase, send the total amount via EasyPaisa to this number:
      </p>
      <p className="font-semibold text-xl mt-2">{easypaisaNumber}</p>
      <p className="mt-2 text-sm text-gray-700">
        After sending the payment, please share your transaction ID in the order form.
      </p>
    </div>
  )
}