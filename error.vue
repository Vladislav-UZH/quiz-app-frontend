<script setup>
const vueError = useError();

const errors = {
  404: " Page Not Found!",
};
const router = useRouter();
</script>
<template>
  <div>ERROR</div>
  {{ errors[vueError.statusCode] }}
</template>
<style></style>
