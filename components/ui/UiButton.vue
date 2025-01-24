<script setup>
defineProps({ type: { type: String, default: "button" } });
</script>
<template>
  <button class="btn" :type="type"><slot>Start</slot></button>
</template>
<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  padding: 12px;
  background-color: var(--primary-accent-color);
  border-radius: 10px;
  border: none;
  outline: transparent;
  color: var(--primary-text-color);
  /* text-transform: ; */
  transition: var(--transition-effect);
}
.btn:hover {
  background-color: var(--secondary-accent-color);
}
.btn:active {
  outline: var(--secondary-accent-color) solid 1px;
  background-color: transparent;
}
</style>
