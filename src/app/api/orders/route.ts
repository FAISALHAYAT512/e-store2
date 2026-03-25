import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    const {
      customerName,
      email,
      phone,
      address,
      city,
      paymentMethod,
      transactionId,
      paymentSenderName,
      notes,
      items,
      totalAmount,
    } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    if (paymentMethod !== "EASYPAISA") {
      return NextResponse.json(
        { error: "Only EasyPaisa manual payment is allowed" },
        { status: 400 }
      )
    }

    if (!transactionId || !paymentSenderName) {
      return NextResponse.json(
        { error: "Transaction ID and Sender Name are required" },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        userId: (session?.user as { id?: string })?.id || null,
        customerName,
        email,
        phone,
        address,
        city,
        totalAmount: Number(totalAmount),
        paymentMethod: "EASYPAISA",
        paymentStatus: "PENDING_VERIFICATION",
        status: "PENDING",
        transactionId,
        paymentSenderName,
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: Number(item.quantity),
            price: Number(item.price),
          })),
        },
      },
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
    })
  } catch (error) {
    console.error("Order create error:", error)
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    )
  }
}