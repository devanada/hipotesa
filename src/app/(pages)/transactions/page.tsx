import DataTable from "@/components/data-table";

import { getOrders } from "@/utils/apis/orders/api";
import { columns } from "./columns";

export default async function Page() {
  const { data } = await getOrders();

  return (
    <div className="w-full mx-auto py-12 px-4 md:px-6">
      <DataTable
        columns={columns}
        data={data}
        title="Order"
        description="List of your order"
        showButton={false}
      />
    </div>
  );
}
