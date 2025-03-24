<script lang="ts" setup></script>

<template>
  <nav class="vertical-nav links">
    <nuxt-link class="link" to="/dashboard/quizzes">My quizzes</nuxt-link>
    <!-- <nuxt-link class="link" to="/dashboard/library">Library</nuxt-link> -->
  </nav>
</template>

<style scoped>
.vertical-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #0c0c13;
  min-width: 228px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.link {
  display: flex;
  width: 100%;
  padding: 12px 40px;
}
</style>
