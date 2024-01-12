<template>
    <div>
        <pre>    test
        {{ data }}</pre>

    </div>
</template>


<script setup >
definePageMeta({
  middleware: ['auth'],
})
import { signInWithEmailAndPassword } from "firebase/auth"
const auth = useFirebaseAuth()
const email = "email@test.com"
const password = "123456"
const { data } = await signInWithEmailAndPassword(auth,
    email,
    password)


console.log(data)
</script>