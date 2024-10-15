<script setup lang="ts"></script>
<template>
  <div class="container">
    <div class="text-container">
      <h2 class="headline--xl">Welcome to quiz area!</h2>
      <p class="text__title">Use game code and start play.</p>
    </div>

    <div class="base-container">
      <UiField placeholder="Enter code" />
      <UiButton>Join</UiButton>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 120px 0;
}
.text-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
.base-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
</style>
