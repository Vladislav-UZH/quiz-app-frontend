<script lang="ts" setup>
import { useForm } from "vee-validate";
import IconBack from "../../../../public/svg/icon_arrow_left.svg";
import { useQuizFeatures } from "~/features/quiz";

definePageMeta({ middleware: ["auth"] });

const MAX_OPTIONS = 4;
const { getIsCurrent, toggleCurrent } = useCurrent<number>("currentQuestion");
const { chooseCurrent } = useCurrent<number>("currentOption");

const router = useRouter();
const route = useRoute();
const quizStore = useQuizStore();
const { $api } = useNuxtApp();
const quizApi = $api.quiz;
const features = useQuizFeatures();

const questionModal = useModal("questionModal");
const optionModal = useModal("optionModal");

onBeforeMount(async () => {
  try {
    const currentQuiz = await quizApi.getOneQuiz(Number(route.params.quizId));

    quizStore.quiz.updateCurrentQuiz(currentQuiz.id, currentQuiz);
  } catch (e) {
    console.log(e);
    alert("Something Went wrong");
  }
});

function handleStart() {
  const roomId = "54545";
  router.push(`/room/${"null"}/quiz/${quizStore.currentQuiz.id}`);
}

async function handleCreateQuestion({ questionText }) {
  try {
    const question = {
      text: questionText,
      quizStackId: quizStore.currentQuiz.id,
    };

    await features.question.create(question);

    questionModal.toggleModal();
    // console.log(question);
  } catch (e) {
    console.log(e);
  }
}
async function handleCreateOption({ optionText, optionCorrect }) {
  try {
    const option = {
      questionId: quizStore.currentQuestion.id,
      correct: optionCorrect,
      text: optionText,
    };

    await features.option.create(option);

    optionModal.toggleModal();
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="setup-box">
      <NuxtLink to="/dashboard/quizzes" class="back-link">
        <IconBack /> <span> Back</span>
      </NuxtLink>
      <div class="setup-header">
        <h2>{{ quizStore.currentQuiz.title }}</h2>

        <div class="header-buttons">
          <UiButton
            v-show="quizStore.currentQuiz.questions.length"
            @click="questionModal.toggleModal()"
          >
            New Q
          </UiButton>
          <UiButton @click="handleStart()">Start it up</UiButton>
        </div>
      </div>

      <!-- EMPTY QUESTIONS -->
      <template v-if="!quizStore.currentQuiz.questions.length">
        <UiButton @click="questionModal.toggleModal()">
          Create Question
        </UiButton>
      </template>

      <!--  QUESTIONS -->
      <template v-else>
        <ul class="question-list">
          <li
            v-for="(question, index) in quizStore.currentQuiz.questions"
            :key="index"
          >
            <UiQuestion
              :index="index + 1"
              :text="question.text"
              :isOpen="getIsCurrent(question.id)"
              @click="toggleCurrent(question.id)"
            />

            <div
              v-if="getIsCurrent(question.id) || !question.options.length"
              class="options-list-container"
            >
              <UiButton
                v-show="MAX_OPTIONS > question.options.length"
                @click="
                  optionModal.toggleModal(),
                    quizStore.question.updateCurrentQuestion(
                      question.quizStackId,
                      question
                    )
                "
              >
                Create Option
              </UiButton>

              <ul class="options-list">
                <li v-for="(option, index) in question.options" :key="index">
                  <UiOption :text="option.text" :isTrue="option.correct" />
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <UiModal
          :title="`Create option for question ${
            1 +
            quizStore.currentQuiz.questions.findIndex(
              (el) => el.id === quizStore.currentQuestion.id
            )
          }`"
          :isOpen="optionModal.isOpen.value"
          @close="optionModal.toggleModal()"
        >
          <UiForm class="options-form" @form="handleCreateOption">
            <span class="options-form-fields">
              <UiField name="optionText" placeholder="Enter option" />
              <UiField name="optionCorrect" type="checkbox" label="Is true" />
            </span>
            <UiButton type="submit">Save</UiButton>
          </UiForm>
        </UiModal>
      </template>
    </div>
    <UiModal
      title="Create question"
      :isOpen="questionModal.isOpen.value"
      @close="questionModal.toggleModal()"
    >
      <UiForm class="question-form" @form="handleCreateQuestion">
        <UiField name="questionText" placeholder="Enter Question" />
        <UiButton type="submit">Save</UiButton>
      </UiForm>
    </UiModal>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
}
.setup-box {
  display: flex;
  flex-direction: column;
  gap: var(--indent__xxl);
  width: 100%;
  padding-right: 40px;
  padding-bottom: 12px;
}
.back-link {
  display: flex;
  align-items: center;
  gap: var(--indent__s);
}
.setup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-buttons {
  display: flex;
  gap: var(--indent__l);
}

.question-list {
  display: flex;
  flex-direction: column;
  background-color: var(--color__dark--light);
  border-radius: 8px;
  overflow-y: auto;
  max-height: 700px;
}
.question-item {
  display: flex;
  flex-direction: column;
}

.options-list-container {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--indent__m);
  padding: var(--indent__m);
  background-color: var(--color__purple--light);
}
.options-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.question-form {
  display: flex;
  flex-direction: column;
  gap: var(--indent__m);
}
.options-form {
  display: flex;
  flex-direction: column;
  gap: var(--indent__m);
}
.options-form-fields {
  display: flex;
  align-items: center;
  gap: var(--indent__m);
}
</style>
