import { prisma } from "@/server/db";


export default async function  Home() {
 const posts= await prisma.post.findMany({})

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Posts</h1>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </main>
    
  );
}
