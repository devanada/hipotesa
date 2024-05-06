import DataTable from "@/components/data-table";

import { getOrders } from "@/lib/apis/orders/api";
import { columns } from "./columns";

export default async function Page() {
  const { data } = await getOrders();

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        title="Order"
        description="Manage your orders"
        showButton={false}
      />
    </div>
  );
}
