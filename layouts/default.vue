<template>
  <div class="layout">
    <WidgetHeader />
    <slot />
    <WidgetFooter />
  </div>
</template>
<style scoped>
.layout {
  display: flex;
  /* justify-content: center;
  align-items: center; */
  position: relative;
  height: 100dvh;
  padding: 16px;
}
</style>
