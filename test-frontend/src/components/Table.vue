<template>
  <a-table :pagination="false" :columns="columns" :data-source="data" :loading="!data.length">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <span>
          <a-tag :key="column.key" :color="record.status.color" :style="{ color: '#000' }">
            {{ record.status.name }}
          </a-tag>
        </span>
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <a-space direction="vertical">
        <div v-for="(contact, index) in record.contacts" :key="index">
          <Contact :name="contact.name" />
        </div>
      </a-space>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: DataItem[]
  columns: { title: string; dataIndex?: string; key: string }[]
  contactColumns: { title: string; dataIndex?: string; key: string }[]
}>()
</script>
