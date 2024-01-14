<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>
<template>
    <div class="logo">
        <NuxtLink to="/">
            <img src="https://i0.wp.com/gamaoutillage.net/wp-content/uploads/2022/10/1665343934977.png?fit=1000%2C1000&ssl=1"/>
        </NuxtLink>
    </div>
</template>
