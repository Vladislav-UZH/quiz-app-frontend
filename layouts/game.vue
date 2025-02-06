<template>
  <div class="game-container"><slot /></div>
</template>
<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  gap: 40px;
  height: 100dvh;
  padding: 40px;
}
</style>
