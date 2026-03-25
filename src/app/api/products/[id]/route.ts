import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

// GET product by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // <-- must be Promise
) {
  try {
    const { id } = await params // <-- await the promise

    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("GET_PRODUCT_ERROR", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

// DELETE product by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // <-- must be Promise
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params // <-- await the promise

    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId)
    }

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE_PRODUCT_ERROR", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}