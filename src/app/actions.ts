"use server"; // This directive marks all functions in this file as Server Actions

import { prisma } from "@/server/db"; // Assuming your prisma instance is here
import { revalidatePath } from "next/cache"; // Function to revalidate the cache

// Server Action to create a new post
export async function createPostAction(title: string, content: string) {
  try {
    // Create the post in the database using Prisma
    const newPost = await prisma.post.create({
      data: { title, content },
    });

    // Revalidate the cache for the '/posts' path
    // This tells Next.js to refetch the data for this page on the next request
    revalidatePath("/posts");

    // You can optionally return the new post data
    return newPost;
  } catch (error) {
    console.error("Error creating post in server action:", error);
    // Throw the error so the client component can catch it
    throw new Error("Failed to create post");
  }
}

// Server Action to delete a post
export async function deletePostAction(id: number) {
  try {
    // Delete the post from the database using Prisma
    await prisma.post.delete({
      where: { id: Number(id) }, // Ensure ID is a number
    });

    // Revalidate the cache for the '/posts' path
    // This tells Next.js to refetch the data for this page on the next request
    revalidatePath("/posts");

    // No return value needed for a successful deletion
  } catch (error) {
    console.error(`Error deleting post with ID ${id} in server action:`, error);
    // Throw the error so the client component can catch it
    throw new Error("Failed to delete post");
  }
}
