<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
  label: { type: String, default: "" },
  placeholder: { type: String, default: "Enter" },
  name: { type: String, required: true },
  type: { type: String, default: "text" },
  checked: { type: Boolean, default: false },
});

const field = useField(() => props.name);

const emit = defineEmits(["upd"]);

watchEffect(() => {
  emit("upd", field.value.value);
});
</script>
<template>
  <label class="label">
    <span>{{ label }}</span>
    <input
      :name="name"
      class="field"
      :type="type"
      :placeholder="placeholder"
      :checked="checked"
      v-model="field.value.value"
    />
  </label>
</template>
<style scoped>
.label {
  display: flex;
  flex-direction: column;
  gap: var(--indent__min);
}
.field {
  padding: 12px 16px;
  background-color: #1f1f2b;
  color: var(--primary-text-color);
  outline: transparent solid 1px;
  border-radius: 8px;
  border: none;
  transition: var(--transition-effect);
}

.field:focus {
  outline-color: var(--secondary-accent-color);
}
</style>
