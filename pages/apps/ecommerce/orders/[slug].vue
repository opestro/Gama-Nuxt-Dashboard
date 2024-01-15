<script setup lang="ts">
import { ref } from 'vue';
const route = useRoute()
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import OrdersTable from '@/components/table/OrdersTable.vue';

//Table

definePageMeta({
  middleware: ['auth'],
})
// theme breadcrumb
const page = ref({ title: 'Orders List' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Orders',
        disabled: true,
        href: '/apps/ecommerce/orders/' + Number(route.params.slug)
    }
]);

let pageNumber: number = Number(route.params.slug) ?? 1 
const orders = await useLazyFetch('https://gama.soluve.cloud/orders', {
        params: { 'per_page': 50, 'page': pageNumber}
})
   

</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Table Editable -->
    <!-- ---------------------------------------------------- -->
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Orders Table">
                <OrdersTable :orders="orders.data"  />
                <div class="d-flex justify-end my-5 mr-5 gap-2">
                    <v-btn :disabled="pageNumber<2" color="info" variant="flat" :to="'/apps/ecommerce/orders/' + (pageNumber - 1)" >Previose page</v-btn>
                    <v-btn color="info" variant="flat" disabled >{{pageNumber}}</v-btn>
                    <v-btn :disabled="orders.data.length < 50" color="info" variant="flat" :to="'/apps/ecommerce/orders/' + (pageNumber + 1)">Next page</v-btn>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
