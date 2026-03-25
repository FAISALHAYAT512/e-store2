// src/app/admin/orders/page.tsx
import { prisma } from "@/lib/prisma"

export default async function OrdersPage() {
  // Server-side fetch
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: true } },
      user: true, // include user to avoid null errors
    },
  })

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg">
              <div>
                <p className="font-bold">Order: {order.id}</p>
                <p className="text-sm text-zinc-500">
                  Customer: {order.user?.email || order.customerName || "Guest"}
                </p>
              </div>

              <p>Total: PKR {order.totalAmount}</p>

              <div className="space-y-3 mt-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {item.product ? (
                      <>
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p>{item.product.name}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: PKR {item.price}</p>
                        </div>
                      </>
                    ) : (
                      <div>
                        <p>Product not found</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: PKR {item.price}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}