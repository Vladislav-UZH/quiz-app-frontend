<script setup lang="ts"></script>
<template>
  <footer class="footer">
    Created by students FIT, Uzhnu. (c) {{ new Date().getFullYear() }}
  </footer>
</template>
<style scoped>
.footer {
  width: 375px;
  display: block;
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 270px;
  padding: 4px;
  text-align: center;
  /* color: var(--secondary-color); */
  background-color: rgba(108, 108, 131, 0.3);
  border-radius: 12px;
}
</style>
