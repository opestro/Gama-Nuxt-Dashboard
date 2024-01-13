<script setup >
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth"
const auth = useFirebaseAuth()
const router = useRouter();
const password = ref('');
const email = ref('');
const passwordRules = ref([
  (v) => !!v || "Password is required",
  (v) =>
    (v && v.length <= 10) || "Password must be less than 10 characters",
]);
const emailRules = ref([
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

async function validate() {
  console.log(email.value)
  await signInWithEmailAndPassword(auth,
    email.value,
    password.value).then(() => {
      router.push({ path: "/dashboards/modern" });
    }).catch((e) => { console.error(e) });



}
</script>

<template>
  <v-row class="d-flex mb-3">

  </v-row>
  <div class="d-flex align-center text-center mb-6">
    <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
      <span class="bg-surface px-5 py-3 position-relative">sign in with</span>
    </div>
  </div>
  <div class="mt-5">
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label>
    <VTextField v-model="email" :rules="emailRules" type="email" class="mb-8" required hide-details="auto"></VTextField>
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Password</v-label>
    <VTextField v-model="password" :rules="passwordRules" required hide-details="auto" type="password" class="pwdInput">
    </VTextField>
    <div class="d-flex flex-wrap align-center my-3 ml-n2">
      <div class="ml-sm-auto">
        <NuxtLink to="" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">Forgot Password
          ?</NuxtLink>
      </div>
    </div>
    <v-btn size="large" :loading="isSubmitting" color="primary" :disabled="!password" @click="validate()" flat>Sign
      In</v-btn>


  </div>
</template>
