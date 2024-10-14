<script setup lang="ts"></script>
<template>
  <div class="container">
    <h2>Welcome to quiz area!</h2>
    <p>Use game code and start play.</p>
  </div>

  <div>
    <UiField placeholder="Enter code" />
    <UiButton>Join</UiButton>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
</style>
