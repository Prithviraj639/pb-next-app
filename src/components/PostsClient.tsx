"use client";

import { useState, FormEvent } from "react";
// Import the server actions
import { createPostAction, deletePostAction } from "@/app/actions";
import { Post } from "../../generated/prisma";

// Define the props for the Client Component
interface PostsClientProps {
  initialPosts: Post[];
}

export default function PostsClient({ initialPosts }: PostsClientProps) {
  // Use the initial data from props for the state
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [form, setForm] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submit button loading

  // --- Client-side actions calling Server Actions ---

  const handleCreatePost = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Indicate submission is in progress

    try {
      // Call the server action with form data
      // Server action will handle the database logic and revalidation
      await createPostAction(form.title, form.content);

      // Clear the form on success
      setForm({ title: "", content: "" });

      // Note: We don't need to manually refetch posts here.
      // The server action calls revalidatePath, which tells Next.js
      // to refetch the data on the next page render (e.g., after navigation
      // or if the cache expires, or implicitly after a Server Action mutation
      // that affects the current page's data).
      // For immediate UI update, you might consider optimistic updates
      // or re-fetching a smaller subset if revalidatePath isn't fast enough
      // for your specific use case, but revalidatePath is the recommended approach.

    } catch (error) {
      console.error("Failed to create post:", error);
      // Handle error display to the user if needed
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  const handleDeletePost = async (id: number) => {
    // Optional: Add a confirmation dialog
    if (!confirm("Are you sure you want to delete this post?")) {
        return;
    }

    try {
      // Call the server action with the post ID
      // Server action will handle the database logic and revalidation
      await deletePostAction(id);

      // Optimistically update the UI by filtering the deleted post
      // This provides immediate feedback to the user
      setPosts(posts.filter(post => post.id !== id));

      // Note: The server action will still revalidate the path,
      // ensuring data consistency on subsequent requests.

    } catch (error) {
      console.error("Failed to delete post:", error);
      // Handle error display to the user if needed
      // If optimistic update was used, you might need to revert it on error
      // Or simply refetch data if optimistic update is too complex for error handling
      // fetchPosts(); // Fallback to client-side refetch on error if needed
    }
  };

  // We can use the useFormStatus hook if we wrap the form in a <form action={...}>
  // but since we're using onSubmit for validation/state management,
  // we'll stick to the local isSubmitting state for the button.
  // const { pending } = useFormStatus();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {/* Form to create a new post */}
      <form onSubmit={handleCreatePost} className="mb-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            required // Add HTML validation
          />
        </div>
        <div>
           <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
           <textarea
            id="content"
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            rows={4} // Give it some height
            required // Add HTML validation
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !form.title || !form.content} // Disable while submitting or if form is empty
        >
           {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </form>

      {/* List of posts */}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded-md shadow-sm bg-white flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
              <p className="mt-1 text-gray-600">{post.content}</p>
            </div>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="ml-4 text-red-600 hover:text-red-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label={`Delete post "${post.title}"`} // Accessibility
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
