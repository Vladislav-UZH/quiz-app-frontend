<script setup></script>
<template>
  <div class="block"><slot></slot></div>
</template>

<style scoped>
.block {
  /* display: flex; */
  width: 100%;
  padding: var(--indent__l);
  background-color: var(--color__gray--dark);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}
</style>
