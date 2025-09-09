<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <Card class="w-full max-w-md mx-auto">
      <CardHeader class="text-center">
        <CardTitle class="text-4xl font-bold text-gray-900 mb-2">
          Welcome to Nuxt + Go
        </CardTitle>
        <CardDescription>
          Click the button to fetch a message from the Go backend.
        </CardDescription>
      </CardHeader>
      <CardContent class="text-center space-y-4">
        <Button @click="fetchData">
          Fetch from Server
        </Button>

        <div v-if="pending" class="mt-4 p-4 bg-gray-50 rounded-md">
          <p class="text-gray-700">Loading...</p>
        </div>

        <div v-else-if="error" class="mt-4 p-4 bg-red-50 rounded-md">
          <p class="text-red-700">Error:</p>
          <p class="text-red-900 font-medium">{{ error.message }}</p>
        </div>

        <div v-else-if="message" class="mt-4 p-4 bg-green-50 rounded-md">
          <p class="text-green-700">Server Response:</p>
          <p class="text-green-900 font-medium">{{ message }}</p>
        </div>
      </CardContent>
      <CardFooter class="text-center text-gray-500 text-sm">
        Built with Nuxt, Go, and Tailwind CSS
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const message = ref<string | null>(null)
const pending = ref(false)
const error = ref<{ message: string } | null>(null)

const fetchData = async () => {
  pending.value = true
  error.value = null
  message.value = null
  const config = useRuntimeConfig()
  try {
    const response = await fetch(`${config.public.backendUrl}/`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    message.value = data.message
  } catch (e: any) {
    error.value = { message: e.message || 'An unknown error occurred' }
  } finally {
    pending.value = false
  }
}
</script>