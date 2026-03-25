"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useCartStore } from "@/store/cartStore"

export default function Navbar() {
  const { data: session } = useSession()
  const items = useCartStore((state) => state.items ?? [])

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-white hover:text-zinc-300 transition"
        >
          FaisalStore
        </Link>

        <nav className="flex items-center gap-4 md:gap-6 text-sm md:text-base text-zinc-200">
          <Link href="/products" className="hover:text-white transition">
            Products
          </Link>

          <Link href="/cart" className="hover:text-white transition">
            Cart
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-black">
                {totalItems}
              </span>
            )}
          </Link>

          {session && (
            <Link href="/orders" className="hover:text-white transition">
              Orders
            </Link>
          )}

          {session?.user?.role === "ADMIN" && (
            <Link href="/admin/dashboard" className="hover:text-white transition">
              Admin
            </Link>
          )}

          {!session ? (
            <Link
              href="/login"
              className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-900 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-900 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}