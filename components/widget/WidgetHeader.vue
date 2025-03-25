<script setup lang="ts">
import { useAuthFeatures } from "~/features/auth";
import IconQuiz from "/public/svg/icon_quiz.svg";

const auth = useAuthFeatures();

function handleLogout() {
  localStorage.clear();

  useRouter().push("/auth");
}
</script>
<template>
  <header class="header">
    <router-link to="/" class="app">
      <IconQuiz width="24" height="24" />
      <h1 class="app-name">QuizApp</h1>
    </router-link>

    <div style="display: flex; gap: 12px; align-items: center">
      <UiButton @click="handleLogout">Logout</UiButton>
      <p>
        Welcome
        <span class="text__title user">, {{ auth.user.username }} !</span>
      </p>
    </div>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.user {
  text-transform: capitalize;
}
</style>
