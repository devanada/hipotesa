import { Suspense } from "react";

import DataTable from "@/components/data-table";

import { getCategories } from "@/utils/apis/categories/api";
import { columns } from "./columns";

export default async function Page() {
  // TODO: The data not getting a new one after create or update
  const { data } = await getCategories();

  return (
    <div>
      <Suspense
        fallback={
          <DataTable
            columns={columns}
            data={[]}
            title="Category"
            description="Manage your categories"
            showButton={true}
            buttonLabel="Add Category"
            buttonNav="/dashboard/categories/create"
          />
        }
      >
        <DataTable
          columns={columns}
          data={data}
          title="Category"
          description="Manage your categories"
          showButton={true}
          buttonLabel="Add Category"
          buttonNav="/dashboard/categories/create"
        />
      </Suspense>
    </div>
  );
}
