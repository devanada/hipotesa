import Link from "next/link";

import { fetchPosts } from "@/db/queries/posts";

export default async function Home() {
  const posts = await fetchPosts();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <div className="mb-4">
              <Link key={post.id} href={`/posts/${post.id}/edit`} className="">
                <h2 className={`mb-3 text-2xl font-semibold`}>{post.title}</h2>
              </Link>
              <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                {post.content}
              </p>
            </div>
            <div className="text-sm opacity-30">
              {"Updated at " +
                post.updatedAt.toLocaleDateString("en-US", dateOptions)}
            </div>
          </div>
        );
      })}
    </>
  );
}
