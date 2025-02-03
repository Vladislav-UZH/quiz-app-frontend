<script lang="ts" setup>
import IconTrue from "../../../../public/svg/icon_true.svg";
import IconFalse from "../../../../public/svg/icon_false.svg";

defineProps<{ text: string; isTrue: boolean }>();
</script>

<template>
  <div class="point-item">
    <div class="point-info">
      <span class="point-circle"></span>
      <p class="point-text">{{ text }}</p>
    </div>
    <span>
      <IconTrue v-if="isTrue" class="icon-true" viewBox="0 0 20 20" />
      <IconFalse v-else class="icon-false" width="20" height="20" />
    </span>
  </div>
</template>

<style scoped>
.point-item {
  display: flex;
  justify-content: space-between;
  padding: var(--indent__xl);
  border-radius: 8px;
  background-color: var(--color__dark--light);
}
.point-info {
  display: flex;
  align-items: center;
  gap: var(--indent__l);
}
.point-text {
}

.point-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: pink;
}

.icon-true {
  /* fill: green; */
  stroke: green;
}
.icon-false {
  fill: rgb(151, 21, 21);
}
</style>
