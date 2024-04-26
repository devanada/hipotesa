import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
    </div>
  );
}
