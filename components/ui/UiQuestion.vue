<script lang="ts" setup>
defineProps<{
  index: number;
  isOpen: boolean;
  text: string;
}>();
</script>

<template>
  <div class="question-box" :class="{ 'question-box--active': isOpen }">
    <div class="question-info">
      <span class="question-number">{{ index }} question</span>
      <div>
        <p class="question-text">
          {{ text }}
        </p>
      </div>
    </div>
    <UiImage />
  </div>
</template>

<style scoped>
.question-box {
  display: flex;
  width: 100%;
  padding: var(--indent__xl);
  border-radius: 8px;
  justify-content: space-between;
  background-color: var(--color__dark--light);
}
.question-box--active {
  background-color: var(--color__purple--dark);
}
.question-info {
  display: flex;
  flex-direction: column;
  gap: var(--indent__s);
}
.question-number {
  color: var(--secondary-text-color);
}
</style>
