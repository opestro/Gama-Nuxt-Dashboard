// ===============================|| Blank Layout ||=============================== //
<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer';
const customizer = useCustomizerStore();
</script>
<template>
  <!-----RTL LAYOUT------->
  <v-locale-provider v-if="customizer.setRTLLayout" rtl>
    <v-app :theme="customizer.actTheme">
      <NuxtPage />
    </v-app>
  </v-locale-provider>

  <!-----LTR LAYOUT------->
  <v-locale-provider v-else>
    <v-app :theme="customizer.actTheme">
      <NuxtPage />
    </v-app>
  </v-locale-provider>
</template>


