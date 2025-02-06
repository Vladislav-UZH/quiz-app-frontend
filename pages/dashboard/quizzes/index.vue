<script lang="ts" setup>
import IconMenu from "@/public/svg/icon_menu.svg";
import { useForm } from "vee-validate";
import { useQuizFeatures } from "~/features/quiz";

definePageMeta({ middleware: ["auth"] });

const quizStore = useQuizStore();
const quizModal = useModal();
const { handleSubmit } = useForm();
const { quiz, question } = useQuizFeatures();

onBeforeMount(async () => {
  try {
    await quiz.getAll();
  } catch (e) {
    alert("Something went wrong");
  }
});

const onSubmit = handleSubmit(async ({ quizName }) => {
  try {
    await quiz.create({ title: quizName });
  } catch (e) {
    alert("Something went wrong");
  }
});
</script>
<template>
  <div class="content">
    <div>
      <h2>My quizzes</h2>
      <div class="panel">
        <UiField name="searchValue" />
        <UiButton @click="quizModal.toggleModal()"> New Quiz</UiButton>
      </div>
    </div>

    <ul class="quiz-list">
      <li
        class="quiz-item"
        v-for="(quiz, index) in quizStore.quizzes"
        :key="index"
      >
        <NuxtLink
          :to="`/dashboard/quizzes/${quiz.id}`"
          class="quiz-header"
          @click="quizStore.quiz.updateCurrentQuiz(quiz.id, quiz)"
        >
          <UiImage width="240px" height="160px" />

          <p class="topic">{{ quiz.title }}</p>
        </NuxtLink>

        <p class="questions-quantity">{{ quiz.questions.length }} questions</p>

        <div class="info-box">
          <div class="user-info-box">
            <span>A</span>
            <span>'{{ "Nickname" }}'</span>
            <!-- <span>{{ quiz.gameType }}</span> -->
          </div>
          <IconMenu />
        </div>
      </li>
    </ul>

    <UiModal
      title="Create Quiz"
      :is-open="quizModal.isOpen.value"
      @close="quizModal.toggleModal()"
    >
      <form class="quiz-form" @submit="onSubmit">
        <UiField name="quizName" placeholder="Enter Title" />

        <UiButton type="submit"> Create </UiButton>
      </form>
    </UiModal>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--indent__l);
}
.panel {
  display: flex;
  justify-content: space-between;
}

.quiz-form {
  display: flex;
  flex-direction: column;
  gap: var(--indent__l);
}

.quiz-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: var(--indent__xl);
}
.quiz-item {
  display: flex;
  flex-direction: column;
  gap: var(--indent__xl);
  min-width: 264px;
  padding: var(--indent__m);
  border-radius: 4px;
  background-color: var(--color__dark--light);
}
.quiz-header {
  display: flex;
  flex-direction: column;
  gap: var(--indent__s);
}
.topic {
}
.questions-quantity {
  color: var(--secondary-text-color);
}
.info-box {
  display: flex;
  justify-content: space-between;
}
.user-info-box {
  display: flex;
  color: var(--secondary-text-color);
}
</style>
