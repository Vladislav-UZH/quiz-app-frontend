<script setup></script>
<template>
  <button class="button">
    <slot />
  </button>
</template>
<style scoped>
.button {
  display: flex;
  flex-direction: row;
  gap: 6px;
  background-color: transparent;
  border: 1px solid var(--secondary-accent-color);
  border-radius: 10px;
  padding: 6px 12px;
  fill: var(--secondary-accent-color);
  color: var(--secondary-accent-color);
}
</style>
