import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null
  }),
  getters: {},
  actions: {
    SET_USER(user: any) {
      this.user = user;
    },

  }
                 
       
});

// components/FilterMenu.vue
// <script setup>
// import { useFiltersStore } from '~/store/filters'
// import { storeToRefs } from 'pinia' // for getters

// const inputVal = ref('')

// const filtersStore = useFiltersStore()
// const { addValueToFilterList } = filtersStore
// const { filtersList } = storeToRefs(filtersStore)
// </script>

// <template>
//   <div>
//     {{ filtersList }}
//     <input v-model="inputVal" />
//     <button @click="addValueToFilterList(inputVal)">+</button>
//   </div>
// </template>

