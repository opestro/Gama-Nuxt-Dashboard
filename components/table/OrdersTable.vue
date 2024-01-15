<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';

import contact from '@/_mockApis/apps/contact';
import user1 from '/images/profile/user-1.jpg';
const store = useContactStore();

onMounted(() => {
    store.fetchContacts();
});
const getContacts: any = computed(() => {
    return store.contacts;
});
const stock_status = ['pending', 'processing', 'on-hold', 'completed', 'cancelled', 'refunded', 'failed' , 'trash']
const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const desserts = ref(contact);
const editedIndex = ref(-1);
const editedItem = ref({
});
const defaultItem = ref({
});
const props = defineProps({
    orders: {
        type: Object,
        required: true,
    }
});
console.log(props)
const { orders } = props

//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.userinfo.toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item: any) {
    console.log(item)
    const data = JSON.parse(JSON.stringify(item))
    editedIndex.value = desserts.value.indexOf(data);
    editedItem.value = Object.assign({}, data);
    dialog.value = true;
}
function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
async function update(editedItem) {
    const newUpdate = toRaw(editedItem)
    const productDetails = {
        id: newUpdate.id,
        data: {
            name: newUpdate.name,
            categories: newUpdate.categories,
            stock_status: newUpdate.stock_status,
            regular_price: parseInt(newUpdate.regular_price) || 0,
            stock_quantity: newUpdate.stock_quantity || 0
        }
    }
    await useFetch('http://localhost:3055/products/update/', {
        query: productDetails,
        method: 'PUT'
    }).then((r) => {
    }).catch((err) => { console.log(err) })

}

</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Order" hide-details
                variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" >
                <!-- <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-plus</v-icon>Add Order
                    </v-btn>
                </template> -->
                <v-card style="overflow: hidden;">
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ editedItem.id?'ORDER N: ' + '#' + editedItem.id :'' }}</span>
                    </v-card-title>

                    <v-card-text style="overflow-y: auto;">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card>
                                <v-card-title>
                                  
                                     <v-chip class="ma-2">{{
                                      'FULL NAME : '+  editedItem.billing.first_name + ' ' + editedItem.billing.first_name
                                    }}</v-chip>
                                     <br>
                                     <v-chip class="ma-2">
                                        {{
                                            'TOTAL : ' + editedItem.total + editedItem.currency_symbol 
                                         }}
                                     </v-chip>
                                    
                                </v-card-title>
                                <v-card-item>
                                    <v-card-title class="my-3">PRODUCTS</v-card-title>
                                    <div v-for="item in editedItem.line_items" :key="item">

                                        <v-card-item>
                                            <v-card-title>{{ item.id + ' - ' + item.name }}</v-card-title>
                                            <!-- ADD IMAGE OF PRODUCT HERE DONT FORGET  -->
                                            <v-card-subtitle>{{ 'QTY - ' + item.quantity }}</v-card-subtitle>
                                            <v-card-subtitle>{{ 'PRICE - ' + item.price + ' DA' }}</v-card-subtitle>
                                        </v-card-item>
                                    </div>
                                </v-card-item>
                                <v-card-item>
                                    <v-card-title class="my-3">SHIPPING</v-card-title>
                                    <v-card-item>
                                        ADDRESS :
                                        <v-card-subtitle class="mx-3 mb-3"> {{editedItem.billing.address_1}} </v-card-subtitle>
                                        CITY :
                                        <v-card-subtitle class="mx-3 mb-3"> {{editedItem.billing.city }}</v-card-subtitle>
                                        POSTCODE :
                                        <v-card-subtitle class="mx-3 mb-3"> {{editedItem.billing.postcode}} </v-card-subtitle>
                                        STATE :
                                        <v-card-subtitle class="mx-3 mb-3"> {{editedItem.billing.state }}</v-card-subtitle>
                                        PHONE :
                                        <v-card-subtitle class="mx-3 mb-3"> {{editedItem.billing.phone }}</v-card-subtitle>
                                    </v-card-item>

                                </v-card-item>
                                
                                <v-card-item>
                                <v-card-title>{{ 'Stock Status : ' + editedItem.status }}</v-card-title>
                                    <v-select class="my-2" label="Stock Status" v-model="editedItem.status" :items="stock_status"
                                    chips></v-select>
                                    <div class="d-flex justify-end">

                                        
                                    </div>
                                </v-card-item>
                                
                            </v-card>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" class="ma-2" @click="close">Cancel</v-btn>
                        <v-btn  color="secondary" variant="flat">UPDATE STATUS</v-btn>
                      <!-- <v-btn color="secondary" variant="flat" @click="update(editedItem)">Save</v-btn> --> 
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">ID</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">FULL NAME</th>
                <!-- <th class="text-subtitle-1 font-weight-semibold text-no-wrap">PRODUCTS</th> -->
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">SHIPPING</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">TOTAL</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">STATUS</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Actions</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="order in orders" :key="order.value">
                <td class="text-subtitle-1">{{ order.id }}</td>
                <td>
                    <div class="d-flex align-center py-4">
                        <!--  <div v-if="order.images[0]" v-for="image in order.images.slice(0, 2)" :key="image" size="40"
                            class="ml-n5 avtar-border">
                            <v-imgs
                                :src="image || 'https://gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg'"
                                width="45px" class="rounded-md img-fluid " />
                        </div>
                        <div v-else size="40" class="ml-n4 avtar-border">
                            <v-img src=" https://gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg"
                                width="45px" class="rounded-md img-fluid " /> NO IMG
                        </div>-->
                        <div class="ml-5">
                            <h4 class="text-h7 font-weight-semibold">{{ order.billing.first_name + ' ' +
                                order.billing.last_name }}</h4>
                        </div>
                    </div>
                </td>
                <!-- <td class="text-subtitle-1">
                    <div v-for="items in order.line_items" :key="items">
                        <div class=" text-truncate" style="max-width: 150px;">
                            {{ items.name }}
                        </div>


                    </div>

                </td> -->

                <td class="text-subtitle-1">
                    <div>
                        {{ order.payment_method_title + ' : ' + order.shipping_total + ' ' + order.currency_symbol }}
                    </div>
                </td>
                <td class="text-subtitle-1">
                    <div>
                        {{ order.total + ' ' + order.currency_symbol }}
                    </div>
                </td>
                <td class="text-subtitle-1">
                    <div v-if="order.status == 'completed'">
                        <v-chip color="#53ab27">
                            {{ order.status }}
                        </v-chip>

                    </div>
                    <div
                        v-if="order.status == 'pending' || order.status == 'processing' || order.status == 'on-hold' || order.status == 'any'">
                        <v-chip color="primary">
                            {{ order.status }}
                        </v-chip>

                    </div>
                    <div
                        v-if="order.status == 'failed' || order.status == 'refunded' || order.status == 'cancelled' || order.status == 'trash'">
                        <v-chip color="">
                            {{ order.status }}
                        </v-chip>

                    </div>
                </td>
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Edit">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="editItem(order)" v-bind="props">
                                    <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                        <!-- <v-tooltip text="Delete">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(order)" v-bind="props">
                                    <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                                </v-btn>
                            </template>
                        </v-tooltip> -->
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
