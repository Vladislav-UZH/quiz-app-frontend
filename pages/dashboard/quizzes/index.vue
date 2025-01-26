<script lang="ts" setup>
import IconMenu from "@/public/svg/icon_menu.svg";
import { useForm } from "vee-validate";
import { BaseApi } from "~/shared";

definePageMeta({ middleware: ["auth"] });

// const userQuizzes = [
//   {
//     id: 1,
//     name: "QuizTopic",
//     description: "Some descrption",
//     questionQuantity: 15,
//   },
//   {
//     id: 2,
//     name: "QuizTopic",
//     description: "Some descrption",
//     questionQuantity: 15,
//   },
//   {
//     id: 3,
//     name: "QuizTopic",
//     description: "Some descrption",
//     questionQuantity: 15,
//   },
//   {
//     id: 4,
//     name: "QuizTopic",
//     description: "Some descrption",
//     questionQuantity: 15,
//   },
// ];

const userQuizzes = useState<{ id: number; title: string; questions: [] }[]>(
  "quizzes",
  () => []
);
const quizModal = useModal();

const { handleSubmit } = useForm();
const api = new BaseApi();

const onSubmit = handleSubmit(async ({ quizName }) => {
  const router = useRouter();

  const api = new BaseApi();

  const data = await api.POST({
    path: "/api/quizzes",
    data: { title: quizName },
  });

  const quiz = { id: null, questions: [], title: "" };
  console.log(data);
});

onBeforeMount(async () => {
  const data = await api.GET<{ id: number; title: string; questions: [] }[]>({
    path: "/api/quizzes",
  });
  console.log(data);

  userQuizzes.value = data;
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
      <li class="quiz-item" v-for="(quiz, index) in userQuizzes" :key="index">
        <NuxtLink :to="`/dashboard/quizzes/${quiz.id}`" class="quiz-header">
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
