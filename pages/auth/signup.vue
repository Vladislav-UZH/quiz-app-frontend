<script setup lang="ts">
import { useForm } from "vee-validate";
import { useAuthFeatures } from "~/features/auth";

definePageMeta({ layout: "auth", middleware: ["guest"] });

const router = useRouter();
const { register } = useAuthFeatures();

const handleRegister = async ({ username, password }) => {
  try {
    console.log(password);
    await register({ username, password });
  } catch (e) {
    alert("Something went wrong!");
  }
};
</script>
<template>
  <UiBlock class="box">
    <div class="title-box">
      <h2>Create an account</h2>
      <p class="description">We're excited to have you on board</p>
    </div>
    <UiForm class="form" @form="handleRegister">
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

      <UiButton type="submit">Start</UiButton>
    </UiForm>
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
