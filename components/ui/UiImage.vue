<script lang="ts" setup>
defineProps({
  width: { type: [String, Number], default: "24" },
  height: { type: [String, Number], default: "24" },
  src: { type: String, default: "" },
  alt: { type: String, default: "Some image" },
});
</script>

<template>
  <div class="thumb" :style="{ width, height }">
    <img v-if="src" :src="src" :alt="alt" />

    <div class="plug-container" v-else>
      <slot name="plug">
        <b class="plug-text">QuizApp</b>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.thumb {
  width: 100px;
  height: 50px;
  border-radius: 8px;
}
.image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plug-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;

  background-color: var(--secondary-accent-color);
}
.plug-text {
  color: var(--primary-text-color);
}
</style>
