<script setup lang="ts">
defineProps({ placeholder: { type: String, default: "Enter" } });
</script>
<template>
  <label>
    <input name="" class="field" type="text" :placeholder="placeholder" />
  </label>
</template>
<style scoped>
.field {
  padding: 8px;

  background-color: transparent;
  color: var(--primary-text-color);
  outline: var(--secondary-color) solid 1px;
  border-radius: 6px;
  border: none;
  transition: var(--transition-effect);
}

.field:focus {
  outline-color: var(--primary-accent-color);
}
</style>
