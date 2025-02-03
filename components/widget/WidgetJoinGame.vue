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
    <form class="form">
      <UiField name="code" label="Code" placeholder="Enter code" />
      <UiButton type="submit" />
    </form>
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
.form {
  display: flex;
  flex-direction: column;
  gap: var(--indent__m);
}
</style>
