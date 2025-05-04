import { prisma } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

// Handler for GET requests to /api/posts
export async function GET(req: NextRequest) {
  try {
    // Fetch all posts from the database
    const posts = await prisma.post.findMany();

    // Return the posts as a JSON response with a 200 status code
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch posts:", error); // Log the error for debugging

    // Return an error response with a 500 status code
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// Handler for POST requests to /api/posts
export async function POST(req: NextRequest) {
  try {
    // Read the request body as JSON
    const { title, content } = await req.json();

    // Create a new post in the database
    const newPost = await prisma.post.create({
      data: { title, content },
    });

    // Return the newly created post as a JSON response with a 201 status code
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error); // Log the error for debugging

    // Return an error response with a 500 status code
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

// If you want to explicitly disallow other methods, you can export them and return a 405
// export function PUT() {
//   return new NextResponse(null, { status: 405 });
// }

// export function DELETE() {
//     return new NextResponse(null, { status: 405 });
//   }
