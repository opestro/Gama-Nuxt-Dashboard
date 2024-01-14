<script setup lang="ts">
import { ref } from 'vue';
const route = useRoute()
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
definePageMeta({
    middleware: ['auth'],
})
//Tables
import EditableTable from '@/components/table/EditableTable.vue';

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
const getCategories = await useLazyFetch('https://gama.soluve.cloud/categories', {
    params: { 'per_page': 100, 'page': 1 }
})
const categories = getCategories.data
let pageNumber: number = Number(route.params.slug)
let products= {}
if(pageNumber>=1){
    products = await useFetch('https://gama.soluve.cloud/products', {
    params: { 'per_page': 50, 'page': pageNumber }
})

} else {
    products = await useFetch('https://gama.soluve.cloud/products', {
    params: { 'per_page': 50, 'page': 1 }
})
}

console.log(products)
async function productsPagination(data: any) {
    if(data<=0){
        return navigateTo('/apps/ecommerce/productlist')
    }
    return navigateTo('/apps/ecommerce/product/' + data)
}
</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Table Editable -->
    <!-- ---------------------------------------------------- -->
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    {{ pageN }}
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Editable Table" class=" my-2">
                <EditableTable :products="products.data" :categories="toRaw(categories)" />
                <div class="d-flex justify-end my-5 mr-5 gap-2">
                    <v-btn color="info" variant="flat" @click="productsPagination((pageNumber - 1))" >Previose page</v-btn>
                    <v-btn color="info" variant="flat" disabled>{{ pageNumber }}</v-btn>
                    <v-btn color="info" variant="flat" @click="productsPagination((pageNumber + 1))">Next page</v-btn>
                </div>

            </UiParentCard>
        </v-col>
    </v-row>
</template>
