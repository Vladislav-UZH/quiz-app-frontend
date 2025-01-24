<script lang="ts" setup>
definePageMeta({
  layout: false,
  redirect: "/dashboard/quizzes",
});
</script>
<template>
  <section class="dashboard-layout">
    <WidgetHeader />

    <div class="dashboard-content">
      <WidgetNavigation />

      <NuxtPage />
    </div>

    <WidgetFooter />
  </section>
</template>
<style scoped>
.dashboard-layout {
  height: 100dvh;
  background-color: var(--color__gray--dark);
}
.dashboard-content {
  display: flex;
  gap: var(--indent__xxl);
  height: calc(90dvh);
}
</style>
