<script setup>
const vueError = useError();

const errors = {
  404: " Page Not Found!",
};
const router = useRouter();

watchEffect(() => console.log(vueError.value));
</script>
<template>
  <div class="container">
    <div class="error-box">
      <h2>ERROR. Something went wrong..</h2>
      <p>
        Code: <b> {{ errors[vueError.statusCode] || "None" }}</b>
      </p>
      <p>
        Additional info: <b>{{ vueError.message }}</b>
      </p>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}
</style>
