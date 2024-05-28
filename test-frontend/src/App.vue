<template>
  <a-config-provider
    :theme="{
      algorithm: theme.darkAlgorithm
    }"
  >
    <main>
      <a-flex align="center" justify="space-between">
        <h3 :style="{ color: '#fff', width: '15rem' }">Тестовое задание</h3>
        <a-input-search v-model:value="value" placeholder="Поиск" @search="handleSearch" />
      </a-flex>
      <a-divider />
      <Table :columns="columns" :data="data" :contactColumns="contactColumns"></Table>
    </main>
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const columns = ref([
  { title: 'Название', dataIndex: 'name', key: 'name' },
  { title: 'Бюджет', dataIndex: 'price', key: 'price' },
  { title: 'Статус', dataIndex: 'status', key: 'status' },
  { title: 'Ответственный', dataIndex: 'responsible', key: 'responsible' },
  { title: 'Дата создания', dataIndex: 'createdAt', key: 'createdAt' }
])
const contactColumns = ref([{ title: 'Имя', dataIndex: 'name', key: 'name' }])
const data = ref([])
const value = ref('')

const fetchData = async (query: string = '') => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL, {
      params: {
        query
      }
    })
    data.value = response.data.map((lead: LeadData, index: number) => ({
      key: index,
      name: lead.name,
      price: lead.price,
      status: lead.status,
      responsible: lead.responsible_user_name,
      contacts: lead.contacts,
      createdAt: lead.created_at
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const handleSearch = async (value: string) => {
  if (value.length >= 3) {
    data.value = []
    await fetchData(value)
  }
}

onMounted(fetchData)
</script>

<style scoped>
main {
  padding: 20px;
}
</style>
