<script setup>
const joinGame = useState("joinGame", () => ({
  isCodeEnter: false,
  code: "",
}));
const router = useRouter();
</script>

<template>
  <UiBlock class="home-block">
    <UiAppLogo />
    <h3 class="">Enter code!</h3>
    <p class="">Use code to connect to the room</p>
    <UiField
      v-model:model="joinGame.code"
      label="Code"
      placeholder="Enter code"
    />
    <UiButton @click="router.push(`/room`)" />
  </UiBlock>
</template>

<style scoped>
.home-block {
  display: flex;
  max-width: 295px;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
</style>
