<template>
  <div class="layout">
    <WidgetHeader />
    <slot />
    <WidgetFooter />
  </div>
</template>
<style scoped>
.layout {
  position: relative;
  height: 100vh;
  padding: 0 15px;
}
</style>
