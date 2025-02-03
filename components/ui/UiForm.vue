<script lang="ts" setup>
import { useForm } from "vee-validate";

const props = defineProps<{ validationSchema?: object }>();
const { handleSubmit } = useForm({ validationSchema: props.validationSchema });

const emit = defineEmits(["form"]);

const onSubmit = handleSubmit((values) => emit("form", values));
</script>

<template>
  <form @submit="onSubmit">
    <slot />
  </form>
</template>

<style scoped></style>
