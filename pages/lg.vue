<template>
    <div>
        <pre>    test
        {{ data }}</pre>

    </div>
</template>


<script setup >
import { signInWithEmailAndPassword } from "firebase/auth"

const email = "email@test.com"
const password = "123456"
const { data } = await signInWithEmailAndPassword(
    email,
    password)


console.log(data)
</script>