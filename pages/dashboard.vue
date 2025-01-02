<script lang="ts" setup></script>
<template>
  <section>
    <nav class="vertical-nav">
      <nuxt-link to="/dashboard/quizzes">My Quizzes</nuxt-link>
      <nuxt-link to="/dashboard/library">Library</nuxt-link>
    </nav>
    <NuxtPage />
  </section>
</template>
<style scoped>
.vertical-nav {
  background-color: #0c0c13;
}
</style>
