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

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const desserts = ref(contact);
const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    avatar: user1,
    userinfo: '',
    usermail: '',
    phone: '',
    jdate: '',
    role: '',
    rolestatus: ''
});
const defaultItem = ref({
    id: '',
    avatar: user1,
    userinfo: '',
    usermail: '',
    phone: '',
    jdate: '',
    role: '',
    rolestatus: ''
});
const props = defineProps({
    products: {
        type: Object,
        required: true,
    },
});
const { products } = props

console.log(products)
//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.userinfo.toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
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
function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
    } else {
        desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Contact' : 'Edit Contact';
});
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Contacts" hide-details
                variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Contact
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.id"
                                        label="Id"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.userinfo"
                                        label="User info"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.usermail"
                                        label="User email" type="email"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.phone" label="Phone"
                                        type="phone"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.jdate"
                                        label="Joining Date"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.role"
                                        label="Role"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-select variant="outlined" hide-details :items="rolesbg"
                                        v-model="editedItem.rolestatus" label="Role Background"></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <v-btn color="secondary" :disabled="editedItem.userinfo == '' || editedItem.usermail == ''"
                            variant="flat" @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">ID</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">PRODUCT</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">CATEGORY</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">SKU</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">QTY</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">PRICE</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">STATUS</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.value">
                <td class="text-subtitle-1">{{ product.id }}</td>
                <td>
                    <div class="d-flex align-center py-4">
                        <div v-if="product.images[0]" v-for="image in product.images.slice(0, 2)" :key="image" size="40"
                            class="ml-n5 avtar-border">
                            <v-img
                                :src="image || 'https://gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg'"
                                width="45px" class="rounded-md img-fluid " />
                        </div>
                        <div v-else size="40" class="ml-n4 avtar-border">
                            <v-img src=" https://gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg"
                                width="45px" class="rounded-md img-fluid " /> NO IMG
                        </div>
                        <div class="ml-5">
                            <h4 class="text-h7 font-weight-semibold">{{ product.name }}</h4>
                        </div>
                    </div>
                </td>
                <td class="text-subtitle-1">
                    <div v-for="categorie in product.categories" :key="categorie">
                        {{ categorie.name }}
                    </div>
                </td>
                <td class="text-subtitle-1 text-no-wrap">{{ product.phone }}</td>
                <td class="text-subtitle-1 text-no-wrap">{{ product.jdate }}</td>
                <td>
                    <v-chip :color="product.rolestatus" size="small" label>{{ product.role }}</v-chip>
                </td>
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Edit">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="editItem(product)" v-bind="props">
                                    <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Delete">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(product)" v-bind="props">
                                    <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
