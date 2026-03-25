// src/app/checkout/page.tsx
"use client"

import { useState } from "react"
import { useCartStore } from "@/store/cartStore" // tumhara cart store
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const easypaisaNumber = "03XX-XXXXXXX" // apna EasyPaisa number yahan daal do

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // yahan order ko backend / database me save karne ka code daal sakte ho
    console.log("Order Details:", { name, phone, transactionId, items, totalAmount })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Order Submitted!</h1>
        <p>Thank you for your order. Your payment will be verified manually.</p>
        <p className="mt-2">EasyPaisa Number: <strong>{easypaisaNumber}</strong></p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Cart Items */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Your Cart</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name} x {item.quantity}</span>
            <span>PKR {item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span>PKR {totalAmount}</span>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="p-4 border rounded-lg bg-yellow-50 mb-6">
        <h2 className="font-bold text-lg mb-2">Payment Instructions</h2>
        <p>Send the total amount via EasyPaisa to this number:</p>
        <p className="font-semibold text-xl mt-2">{easypaisaNumber}</p>
        <p className="mt-2 text-sm text-gray-700">
          After sending the payment, please fill the form below with your details and transaction ID.
        </p>
      </div>

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium">EasyPaisa Transaction ID</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            placeholder="Enter transaction ID from EasyPaisa"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          Place Order
        </button>
      </form>
    </div>
  )
}