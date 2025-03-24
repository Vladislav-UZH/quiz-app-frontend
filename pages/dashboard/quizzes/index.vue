<script lang="ts" setup>
import IconMenu from "@/public/svg/icon_menu.svg";
import { useForm } from "vee-validate";
import { useQuizFeatures } from "~/features/quiz";

definePageMeta({ middleware: ["auth"] });

const quizStore = useQuizStore();
const quizModal = useModal("quizModal");
const actionModal = useModal("actionModal");
const { $api } = useNuxtApp();
const quizApi = $api.quiz;
const { handleSubmit } = useForm();
const { quiz, question } = useQuizFeatures();
const current = useState<number | null>("current", () => null);
const search = useState<string>("search", () => "");
const searched = useState<object[]>("searched", () => []);

onBeforeMount(async () => {
  try {
    await quiz.getAll();

    searched.value = quizStore.quizzes;
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

async function handleDeleteQuiz() {
  try {
    if (current.value) {
      await quizApi.deleteQuiz(current.value);

      quizStore.quiz.deleteQuiz(current.value);
      actionModal.toggleModal();
    }
  } catch (e) {
    console.log(e);
  }
}

async function handleUpdateQuiz({ title }) {
  try {
    if (!title) {
      alert("Field required!");
      return;
    }
    await quizApi.updateQuiz({ id: current.value, title });

    quizStore.quizzes = quizStore.quizzes.map((quiz) => {
      if (quiz.id === current.value) {
        return { ...quiz, title };
      }
      return quiz;
    });

    actionModal.toggleModal();
  } catch (error) {
    console.log(error);
  }
}

function handleSearch(value) {
  if (!value) {
    return (searched.value = quizStore.quizzes);
  }

  searched.value = searched.value.filter(({ title }) => title.includes(value));
}
</script>
<template>
  <div class="content">
    <div>
      <h2>My quizzes</h2>
      {{ search }}
      <div class="panel">
        <UiField name="searchValue" @upd="handleSearch" />
        <UiButton @click="quizModal.toggleModal()"> New Quiz</UiButton>
      </div>
    </div>

    <ul class="quiz-list">
      <li class="quiz-item" v-for="(quiz, index) in searched" :key="index">
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
          <IconMenu
            @click="
              () => {
                actionModal.toggleModal();
                current = quiz.id;
              }
            "
          />
        </div>
      </li>
    </ul>

    <UiModal
      title="Actions"
      :is-open="actionModal.isOpen.value"
      @close="actionModal.toggleModal()"
    >
      <div style="display: flex; flex-direction: column; gap: var(--indent__m)">
        <UiForm
          @form="handleUpdateQuiz"
          style="display: flex; gap: var(--indent__m)"
        >
          <UiField name="title" placeholder="Enter new name" />
          <UiButton type="submit">Edit</UiButton>
        </UiForm>

        <span> Or remove quiz: </span>
        <UiButton @click="handleDeleteQuiz()">Delete</UiButton>
      </div>
    </UiModal>

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

  overflow-y: auto;
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
