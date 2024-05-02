import DataTable from "@/components/data-table";

import { getProducts } from "@/lib/apis/products/api";
import { columns } from "./columns";

export default async function Page() {
  const { data } = await getProducts();

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        title="Product"
        description="Manage your products"
        showButton={true}
        buttonLabel="Add Product"
        buttonNav="/dashboard/products/create"
      />
    </div>
  );
}
