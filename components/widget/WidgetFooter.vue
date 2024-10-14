<script setup lang="ts"></script>
<template>
  <footer class="footer">
    Created by students FIT, Uzhnu. (c) {{ new Date().getFullYear() }}
  </footer>
</template>
<style scoped>
.footer {
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  min-width: 270px;
  padding: 15px;
  color: var(--secondary-color);
}
</style>
