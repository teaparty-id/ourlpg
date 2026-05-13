<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp>
      <UContainer>
        <UTable :data="users" :columns="columns" :meta="meta" class="flex-1"> </UTable>
      </UContainer>
    </UApp>
  </div>
</template>

<script setup lang="ts">
import "@dotenvx/dotenvx/config";
import { Database } from "./utils/database";
import type { TableMeta, Row } from "@tanstack/vue-table";

type DataType = {
  id: number;
  name: string;
  stock: number;
  lastUpdated: string;
};

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "stock", header: "Stock" },
  { accessorKey: "lastUpdated", header: "Last Updated" },
];

const meta: TableMeta<DataType> = {
  class: {
    tr: (row: Row<DataType>) => {
      if (row.original.stock >= 100) {
        return "bg-error/10";
      }
      if (row.original.stock >= 50) {
        return "bg-warning/10";
      }
      if (row.original.stock > 0) {
        return "bg-info/10";
      }
      return "";
    },
  },
};

const db = new Database();
const users = (await db.selectUsers()).map((data) => {
  const date = new Date(data.lastUpdated?.getTime()! * 1000);

  return {
    id: data.id,
    name: data.name,
    stock: data.stock,
    lastUpdated: formatTimeAgo(date),
  } as DataType;
});
</script>
