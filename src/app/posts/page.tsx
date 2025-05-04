import { prisma } from "@/server/db"; // Assuming your prisma instance is here
import { Post } from "../../../generated/prisma"; // Assuming your Prisma types are here
import PostsClient from "@/components/PostsClient";

// This is an async Server Component, perfect for fetching data on the server
export default async function PostsPageServer() {
  // Fetch posts directly on the server using Prisma
  // This data will be passed down to the Client Component
  let initialPosts: Post[] = [];
  try {
    initialPosts = await prisma.post.findMany({
      orderBy: {
        id: 'desc', // Optional: order by ID
      },
    });
  } catch (error) {
    console.error("Failed to fetch initial posts on server:", error);
    // Handle error appropriately, maybe pass an empty array or an error flag
  }


  // Render the Client Component, passing the fetched data as a prop
  return <PostsClient initialPosts={initialPosts} />;
}
