<script setup lang="ts">
import IconQuiz from "/public/svg/icon_quiz.svg";
</script>
<template>
  <header class="header">
    <div class="app">
      <IconQuiz width="24" height="24" />
      <h1 class="app-name">QuizWiz</h1>
    </div>
    <div></div>
  </header>
</template>
<style scoped>
.header {
  display: flex;
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
