<script setup>
useHead({ title: "QuizWiz - Room" });

import IconCopy from "../../public/svg/icon_copy.svg";
import IconUserPlug from "../../public/svg/icon_user_plug.svg";
const route = useRoute();
const roomId = route.params?.id;
const currentUser = { username: "ASTRA" };
const users = [{ username: "ASTRA" }];
</script>
<template>
  <UiBlock class="users-block">
    <UiAppLogo />
    <div class="room-info">
      <h3 class="">Room #{{ roomId }}</h3>
      <UiSmallButton> Copy link</UiSmallButton>
      <div class="current">
        <p class="">You are here</p>
        <span>'{{ currentUser.username }}''</span>
      </div>
    </div>

    <div class="users">
      <p>Waiting for other players...</p>
      <ul class="user-list">
        <li
          class="user-list-item"
          v-for="(user, index) in users"
          :key="user.username"
        >
          <IconUserPlug /> '{{ user.username }}'
        </li>
      </ul>
    </div>
  </UiBlock>
</template>
<style scoped>
.room-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.users-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.current {
  display: flex;
  gap: 4px;
  color: var(--secondary-text-color);
}
.users {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.user-list {
  display: flex;
  justify-content: flex-start;
}
.user-list-item {
  display: flex;
  gap: 8px;
}
</style>
