"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-400 mb-4">
          Order Placed Successfully
        </h1>

        <p className="text-zinc-300 mb-4">
          Aap ka order receive ho gaya hai.
        </p>

        <p className="text-zinc-300 mb-4">
          EasyPaisa payment verification ke baad order process hoga.
        </p>

        {orderId && (
          <p className="mb-6 text-sm text-zinc-400">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-zinc-200 transition"
          >
            Back to Home
          </Link>

          <Link
            href="/orders"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold hover:bg-zinc-900 transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  )
}