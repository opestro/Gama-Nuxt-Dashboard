<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
/*import tabler icons*/
import { Menu2Icon } from 'vue-tabler-icons';
const customizer = useCustomizerStore();
const appsdrawer = ref(false);
</script>
<template>
    <div>
        <div>
            <!-- -----------------------------------------------
            Start Header
            ----------------------------------------------- -->
            <v-app-bar height="80" class="lp-header" flat>
                <v-container class="maxWidth py-sm-4 py-0">
                    <v-toolbar class="d-flex justify-center align-center">

                         <!-- Logo -->
                     
                         <div class="flex justify-center" >
                            GammaOutiallge
                             </div>
                             
                        <!-- Logo -->
                        <!-- Desktop view Navigation -->

                       
                    </v-toolbar>
                </v-container>
            </v-app-bar>
            <!-- -----------------------------------------------
            End Header
            ----------------------------------------------- -->
        </div>

        <!----sidebar menu drawer start----->
        <v-navigation-drawer class="lp-drawer" v-model="appsdrawer" location="left" temporary>
            <LandingpageLayoutMobileSidebar/>
        </v-navigation-drawer>
    </div>
</template>
