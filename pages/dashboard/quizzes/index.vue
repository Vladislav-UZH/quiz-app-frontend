<script lang="ts" setup>
import IconMenu from "@/public/svg/icon_menu.svg";
const userQuizzes = [
  {
    id: 1,
    name: "QuizTopic",
    description: "Some descrption",
    questionQuantity: 15,
  },
  {
    id: 2,
    name: "QuizTopic",
    description: "Some descrption",
    questionQuantity: 15,
  },
  {
    id: 3,
    name: "QuizTopic",
    description: "Some descrption",
    questionQuantity: 15,
  },
  {
    id: 4,
    name: "QuizTopic",
    description: "Some descrption",
    questionQuantity: 15,
  },
];
</script>
<template>
  <div class="content">
    <div class="">
      <h2>My quizzes</h2>
      <UiField name="searchValue" />
    </div>

    <ul class="quiz-list">
      <li class="quiz-item" v-for="(quiz, index) in userQuizzes" :key="index">
        <NuxtLink :to="`/dashboard/quizzes/${quiz.id}`" class="quiz-header">
          <UiImage width="240px" height="160px" />

          <p class="topic">{{ quiz.name }}</p>
        </NuxtLink>

        <p class="questions-quantity">{{ quiz.questionQuantity }} questions</p>

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
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
