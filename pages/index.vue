<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/landingpage/layout/Header.vue";
import MainBanner from "@/components/landingpage/section/mainBanner.vue";
import OurProducts from "@/components/landingpage/section/ourProducts.vue";
import FrameWorks from "@/components/landingpage/section/frameWorks.vue";
import UserReview from "@/components/landingpage/section/userReview.vue";
import Features from "@/components/landingpage/section/otherFeatures.vue";
import AskQuestion from "@/components/landingpage/section/askQuestion.vue";
import BuyNow from "@/components/landingpage/section/buyNow.vue";
import Footer from "@/components/landingpage/layout/Footer.vue";

import "aos/dist/aos.css";
import AOS from "aos";

onMounted(() => {
  AOS.init();
});

/*for Blank Layout*/
definePageMeta({
  layout: "blank",
});
</script>

<template>
  <div class="lp-wraper">
    <!--Header-->
    <Header />

    <!----------->
    <!--Content-->
    <MainBanner />
    <!----------->
    <!--Footer-->
    <Footer />
    <!----------->
  </div>
</template>
