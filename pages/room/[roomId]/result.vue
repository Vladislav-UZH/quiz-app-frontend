<script lang="ts" setup>
definePageMeta({ middleware: "auth" });

const data = ref({ room: {}, user: {} });
const route = useRoute();
const router = useRouter();
const { $api } = useNuxtApp();
const gameApi = $api.game;
const authApi = $api.auth;
onBeforeMount(async () => {
  const game = await gameApi.getGameById(Number(route.params.roomId));
  const user = await authApi.current();
  data.value.room = game;
  data.value.user = user;

  console.log(data.value.room);
  console.log(data.value.user);
});
</script>

<template>
  <UiBlock class="box">
    <div class="top">
      <h2>QuizApp</h2>
      <h3>The fastest hands in Galaxy</h3>
    </div>

    <div class="total">
      <h3>TOTAL SCORE</h3>
      <h2>
        <b> {{ data.room.score + 120 }}</b>
      </h2>
    </div>
    <div class="info">
      <span class="user">1. {{ data.user.userName }} </span>
      <span class="score"
        ><b>+{{ data.room.score }}</b></span
      >
    </div>
    <UiButton @click="router.push('/dashboard')">To Dashboard</UiButton>
  </UiBlock>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  max-height: 500px;
  max-width: 400px;
  gap: 70px;
}
.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.total {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
.info {
  display: flex;
  min-width: 250px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: var(--secondary-accent-color);
}

.user {
}
.score {
  padding: 4px 8px;
  background-color: #39b70f;
  border-radius: 4px;
}
</style>
