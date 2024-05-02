import DataTable from "@/components/data-table";

import { columns } from "./columns";

export default async function Page() {
  return (
    <div>
      <DataTable
        columns={columns}
        data={[]}
        title="User"
        description="Manage your users"
        showButton={false}
      />
    </div>
  );
}
