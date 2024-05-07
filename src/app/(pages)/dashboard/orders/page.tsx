import { Suspense } from "react";

import DataTable from "@/components/data-table";

import { getOrders } from "@/lib/apis/orders/api";
import { columns } from "./columns";

export default async function Page() {
  const { data } = await getOrders();

  return (
    <div>
      <Suspense
        fallback={
          <DataTable
            columns={columns}
            data={[]}
            title="Order"
            description="Manage your orders"
            showButton={false}
          />
        }
      >
        <DataTable
          columns={columns}
          data={data}
          title="Order"
          description="Manage your orders"
          showButton={false}
        />
      </Suspense>
    </div>
  );
}
