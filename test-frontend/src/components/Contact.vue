<template>
  <a-flex gap="middle" align="center" justifty="center">
    <a-avatar style="background-color: #87d068">
      <template #icon>
        <UserOutlined />
      </template>
    </a-avatar>
    <p>{{ name }}</p>
  </a-flex>
</template>

<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  name: string
}>()
</script>
