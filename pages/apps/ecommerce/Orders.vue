<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import OrdersTable from '~/components/table/OrdersTable.vue';

//Table

definePageMeta({
  middleware: ['auth'],
})
// theme breadcrumb
const page = ref({ title: 'Orders' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Editable Table',
        disabled: true,
        href: ''
    }
]);

let pageNumber: number = 1
let pageN: number = 0
let categories: any = []
//let {products}: any  = []
async function ordersNavigation(page: number) {
   const orders = await useLazyFetch('https://gama.soluve.cloud/orders', {
        params: { 'per_page': 50, 'page': page}
    })
   
    pageNumber = page
    return {orders, pageN, pageNumber}
}
async function productsPagination(data: any) {
    return navigateTo('/apps/ecommerce/product/'+data)
}

const {orders}: any = await ordersNavigation(pageNumber)
console.log(orders)
</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Table Editable -->
    <!-- ---------------------------------------------------- -->
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Orders">
                <OrdersTable :orders="orders.data"  />
                <div class="d-flex justify-end my-5 mr-5 gap-2">
                    <v-btn color="info" variant="flat" >Previose page</v-btn>
                    <v-btn color="info" variant="flat" disabled >{{pageNumber}}</v-btn>
                    <v-btn color="info" variant="flat" @click="productsPagination((pageNumber+1))">Next page</v-btn>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
