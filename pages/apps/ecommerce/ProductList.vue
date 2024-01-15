<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
definePageMeta({
  middleware: ['auth'],
})
//Tables
import ProductsTable from '@/components/table/ProductsTable.vue';

// theme breadcrumb
const page = ref({ title: 'Editable Table' });
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
async function productsNavigation(page: number) {
   const products = await useLazyFetch('https://gama.soluve.cloud/products', {
        params: { 'per_page': 50, 'page': page}
    })
    const getCategories = await useLazyFetch('https://gama.soluve.cloud/categories', {
        params: { 'per_page': 100, 'page': 1}
    })
    categories = getCategories.data
    pageNumber = page
    return {products, pageN, pageNumber,categories}
}
async function productsPagination(data: any) {
    return navigateTo('/apps/ecommerce/product/'+data)
}

const {products}: any = await productsNavigation(pageNumber)
</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Table Editable -->
    <!-- ---------------------------------------------------- -->
    <BaseBreadcrumb title="Products List" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Editable Table" class=" my-2">
                <ProductsTable :products="products.data" :categories="toRaw(categories)" />
                <div class="d-flex justify-end my-5 mr-5 gap-2">
                    <v-btn color="info" variant="flat" >Previose page</v-btn>
                    <v-btn color="info" variant="flat" disabled >{{pageNumber}}</v-btn>
                    <v-btn color="info" variant="flat" @click="productsPagination((pageNumber+1))">Next page</v-btn>
                </div>

            </UiParentCard>
        </v-col>
    </v-row>
</template>
