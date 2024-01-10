<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

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
let pageNumber: number = 1
let pageN: number = 0
let categories: any = []
async function productsNavigation(page: number) {
  
    pageN = pageN+ page 
    const products = await useFetch('https://gama.soluve.cloud/products', {
        params: { 'per_page': 24, 'page': pageN}
    })

    const getCategories = await useFetch('https://gama.soluve.cloud/categories', {
        params: { 'per_page': 100, 'page': pageNumber}
    })
    categories = getCategories.data
    pageNumber = pageN + pageNumber
   return {products, pageN, pageNumber,categories}
 

   
    
}

const {products} = await productsNavigation(pageNumber)
console.log(pageNumber)
</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Table Editable -->
    <!-- ---------------------------------------------------- -->
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Editable Table" class=" my-2">
                <EditableTable :products="products.data" :categories="toRaw(categories)" />
                <div class="d-flex justify-end my-5 mr-5 gap-2">
                    <v-btn color="info" variant="flat" >Previose page</v-btn>
                    <v-btn color="info" variant="flat" disabled >{{pageN}}</v-btn>
                    <v-btn color="info" variant="flat" @click="productsNavigation(3)">Next page</v-btn>
                </div>

            </UiParentCard>
        </v-col>
    </v-row>
</template>
