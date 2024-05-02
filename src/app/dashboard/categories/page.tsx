import DataTable from "@/components/data-table";

import { getCategories } from "@/lib/apis/categories/api";
import { columns } from "./columns";

export default async function Page() {
  const { data } = await getCategories();

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={data}
        title="Category"
        description="Manage your categories"
        showButton={true}
        buttonLabel="Add Category"
        buttonNav="/dashboard/categories/create"
      />
    </div>
  );
}
