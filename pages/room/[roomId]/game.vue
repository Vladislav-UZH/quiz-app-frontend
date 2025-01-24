<script lang="ts" setup>
definePageMeta({ layout: false });
const time = "00:00";
const options = [
  { text: "Option 1", isTrue: true },
  { text: "Option 1", isTrue: true },
  { text: "Option 1", isTrue: true },
  { text: "Option 1", isTrue: true },
];

const status = true;
</script>

<template>
  <!-- ROUND -->
  <template v-if="status">
    <div class="game-container">
      <h4 class="headline--xl">Choose correct options</h4>

      <ul class="options-list">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="options-item"
        >
          <p class="text__title">{{ option.text }}</p>
        </li>
      </ul>
      <div class="time-container">
        <span class="time-label">Time:</span>
        <h2>{{ time }}</h2>
      </div>
    </div></template
  >

  <!-- WAITING_OTHERS -->
  <template v-else>
    <UiBlock> </UiBlock>
  </template>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100dvh;
  gap: 40px;
  padding: 40px;
}
.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--indent__l);
}
.options-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 105px;
  border-radius: 8px;
  -webkit-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 2px 2px rgba(54, 54, 54, 0.75);
  background-color: rgb(32, 117, 214);
}
.time-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: var(--indent__s) var(--indent__xl);
  background-color: var(--color__dark--light);
}
.time-label {
  color: var(--secondary-text-color);
}
</style>
