import { auth } from "@/auth";

import SettingsForm from "./form";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <SettingsForm data={session?.user} />
    </div>
  );
}
