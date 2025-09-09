<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <Card class="w-full max-w-2xl mx-auto">
      <CardHeader class="text-center">
        <CardTitle class="text-4xl font-bold text-gray-900 mb-2">
          Backend Health Status
        </CardTitle>
        <CardDescription>
          Live status of the Go backend service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="pending" class="text-center">
          <p>Loading health status...</p>
        </div>
        <div v-else-if="error" class="p-4 bg-red-50 rounded-md">
          <p class="text-red-700">Error fetching health data:</p>
          <pre class="text-red-900 font-mono text-sm">{{ error }}</pre>
        </div>
        <div v-else-if="data" class="p-4 bg-gray-50 rounded-md">
          <pre class="font-mono text-sm">{{ JSON.stringify(data, null, 2) }}</pre>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const config = useRuntimeConfig()
const { data, pending, error } = useFetch(`${config.public.backendUrl}/health`, {
  lazy: true, // Don't block navigation
  server: false // Fetch on client side
})
</script>
