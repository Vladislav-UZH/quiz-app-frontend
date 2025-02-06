<script lang="ts" setup>
import IconClose from "@/public/svg/icon_close.svg";

const emit = defineEmits(["close"]);

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: "" },
});

watchEffect(() => console.log(props.isOpen));
</script>

<template>
  <!-- <ClientOnly> -->
  <Teleport to="#teleports">
    <div v-if="isOpen" class="backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ title }}</h3>

          <button class="close-modal" type="button" @click="emit('close')">
            <IconClose />
          </button>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
  <!-- </ClientOnly> -->
</template>

<style scoped>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(135, 135, 139, 0.2);
}

.modal {
  min-width: 250px;
  background-color: var(--color__purple--dark);
  border-radius: 8px;
  padding: 12px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 0 0 4px 0;
  border-bottom: 1px solid var(--color__purple--light);
}
.modal-content {
  margin: 10px 0 0 0;
}
.close-modal {
  padding-left: 24px;
}
</style>
