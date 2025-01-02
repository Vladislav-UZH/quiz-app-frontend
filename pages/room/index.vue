<script setup>
const player = useState("player", () => ({ username: "" }));
const roomId = "001";
const router = useRouter();
</script>
<template>
  <UiBlock class="join-room-block">
    <UiAppLogo />
    <h3 class="">Room #{{ roomId }}</h3>
    <p class="description">Create your nickname and get ready to play!</p>
    <UiField
      v-model:model="player.username"
      label="Username"
      placeholder="Enter username"
    />
    <UiButton @click="router.push(`/room/${roomId}`)">Play!</UiButton>
  </UiBlock>
</template>
<style scoped>
.join-room-block {
  display: flex;
  max-width: 295px;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.description {
  text-align: center;
  color: var(--secondary-text-color);
}
</style>
