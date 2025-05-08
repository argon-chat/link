<script setup lang="ts">
import { Toaster } from '@/components/ui/toast/'
import { useColorMode } from '@vueuse/core';

let mode = useColorMode();

mode.value = 'dark';
</script>

<template>
  <RouterView />
  <Toaster />
</template>