// src/app/admin/orders/page.tsx
import { prisma } from "@/lib/prisma"

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } }, // include products
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
              <h2 className="font-semibold">Order ID: {order.id}</h2>
              <p>Customer: {order.customerName}</p>
              <p>Total: PKR {order.totalAmount}</p>

              {/* Products List */}
              <div className="space-y-3 mt-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
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