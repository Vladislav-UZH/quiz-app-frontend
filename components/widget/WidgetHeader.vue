<script setup lang="ts">
import IconQuiz from "/public/svg/icon_quiz.svg";
</script>
<template>
  <header class="header">
    <router-link to="/" class="app">
      <IconQuiz width="24" height="24" />
      <h1 class="app-name">QuizApp</h1>
    </router-link>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  align-items: center;
  height: 84px;
  padding: 0 40px;
}
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.app-name {
}
</style>
