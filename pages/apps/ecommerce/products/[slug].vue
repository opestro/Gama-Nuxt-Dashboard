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
import EditableTable from '@/components/table/ProductsTable.vue';

// theme breadcrumb
const page = ref({ title: 'Products' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Products',
        disabled: true,
        href: '/apps/ecommerce/products/' + Number(route.params.slug)
    }
]);
const getCategories = useFetch('https://gama.soluve.cloud/categories', {
    params: { 'per_page': 100, 'page': 1 }
})
const categories = getCategories.data
let pageNumber: number = Number(route.params.slug) ?? 1

const products = useFetch('https://gama.soluve.cloud/products', {
    params: { 'per_page': 50, 'page': pageNumber }
})

</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Table Editable -->
    <!-- ---------------------------------------------------- -->
    <BaseBreadcrumb title="Products List" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <v-row>
        <v-col cols="12">
            <UiParentCard title="Products Table" class=" my-2">
                <EditableTable :products="products.data" :categories="toRaw(categories)" />
                <div class="d-flex justify-end my-5 mr-5 gap-2">
                    <v-btn :disabled="pageNumber<2" color="info" variant="flat" :to="'/apps/ecommerce/products/' + (pageNumber - 1)" >Previose page</v-btn>
                    <v-btn color="info" variant="flat" disabled>{{ pageNumber }}</v-btn>
                    <v-btn :disabled="products.data.length < 50" color="info" variant="flat" :to="'/apps/ecommerce/products/' + (pageNumber + 1)">Next page</v-btn>
                </div>

            </UiParentCard>
        </v-col>
    </v-row>
</template>
