<script setup lang="ts">
definePageMeta({ layout: "auth", middleware: ["guest"] });
</script>
<template>
  <UiBlock class="box">
    <div class="title-box">
      <h2>Create an account</h2>
      <p class="description">We're excited to have you on board</p>
    </div>
    <form class="form">
      <UiField
        name="username"
        type="text"
        label="Username"
        placeholder="Enter Username"
      />
      <UiField
        name="email"
        type="email"
        label="Email"
        placeholder="Enter Email"
      />
      <UiField
        name="password"
        type="password"
        label="Password"
        placeholder="Create Password"
      />
      <UiField
        name="confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="Confirm Password"
      />

      <UiButton>Start</UiButton>
    </form>
    <nuxt-link class="sign-up-link" to="/auth/signin">
      Already have an account? <span class="sign-up">Log In</span>
    </nuxt-link>
  </UiBlock>
</template>

<style scoped>
.box {
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 32px;
}
.title-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.description {
  text-align: center;
  color: var(--secondary-text-color);
}
.sign-up-link {
  color: var(--secondary-text-color);
  text-align: center;
}

.sign-up {
  color: var(--primary-accent-color);
  font-weight: 700;
}
</style>
