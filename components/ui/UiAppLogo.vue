<script setup>
import IconLogo from "../public/svg/icon_logo.svg";
</script>
<template>
  <router-link to="/" class="app-logo">
    <IconLogo width="30" height="30" />
    <h2>QuizWiz</h2>
  </router-link>
</template>

<style scoped>
.app-logo {
  display: flex;
  gap: 2px;
}
</style>
