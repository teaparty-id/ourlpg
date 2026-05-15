<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp>
      <UContainer>
        <UTable sticky :data="users" :columns="columns" :meta="meta" class="flex-1 max-h-156"> </UTable>
        <div class="mt-6">
          <p class="text-xs">&copy; Para Pengabdi Coding</p>
        </div>
      </UContainer>
    </UApp>
  </div>
</template>

<script setup lang="ts">
import "@dotenvx/dotenvx/config";
import { Database } from "./utils/database";
import { h, resolveComponent } from "vue";
import type { TableMeta, Row } from "@tanstack/vue-table";
import type { TableColumn } from "@nuxt/ui";

const USwitch = resolveComponent("USwitch");

type DataType = {
  id: number;
  name: string;
  stock: number;
  isPriority: boolean;
  lastUpdated: string;
};

const columns: TableColumn<DataType>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "stock", header: "Stock" },
  {
    accessorKey: "isPriority",
    header: "Priority",
    cell: ({ row }) => {
      return h(USwitch, {
        modelValue: row.original.isPriority,
      });
    },
  },
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
    ...data,
    lastUpdated: formatTimeAgo(date),
  } as DataType;
});
</script>
