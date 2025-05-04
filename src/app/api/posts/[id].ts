import { prisma } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

// Define the handler for dynamic routes, e.g., app/api/posts/[id]/route.ts
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { title, content } = await req.json(); // Read the request body

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Failed to update post:", error); // Log the error for debugging
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// Define the handler for DELETE requests
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    await prisma.post.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(null, { status: 204 }); // Use NextResponse for a 204 No Content response
  } catch (error) {
    console.error("Failed to delete post:", error); // Log the error for debugging
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

