<script lang="ts" setup>
import { useQuizFeatures } from "~/features/quiz";

definePageMeta({ layout: "game", middleware: "auth" });

const route = useRoute();
const router = useRouter();
const { $api } = useNuxtApp();
const quizApi = $api.quiz;
const gameApi = $api.game;

const { minutesToSeconds, getPrettyTime, sleep } = useTimeHelper();
const quizStore = useQuizStore();
const quizFeatures = useQuizFeatures();

function getQuizDefaultTime(questionsLength: number) {
  return minutesToSeconds(questionsLength * 1);
}

const initialTime = ref(1);
const isReady = ref(false);
const currentQuestionIdx = ref(0);

const { time, startTimer, stopTimer } = useTimer({
  initialTime: initialTime.value,
  reverse: true,
});

onBeforeMount(async () => {
  try {
    const ourQuiz = await quizApi.getOneQuiz(Number(route.params.quizId));

    quizStore.quiz.updateCurrentQuiz(ourQuiz.id, ourQuiz);

    quizStore.question.updateCurrentQuestion(
      ourQuiz.id,
      quizStore.currentQuiz.questions[currentQuestionIdx.value]
    );

    const questionsQuantity = quizStore.currentQuiz?.questions?.length;

    if (route.path.includes("null")) {
      const game = await gameApi.createGame({
        quizTime: getQuizDefaultTime(questionsQuantity),
        quizStackId: ourQuiz.id,
      });

      router.push(`/room/${game.id}/quiz/${ourQuiz.id}`);
    }
    await startGame();
  } catch (e) {
    console.log(e);
  }
});

watch(isReady, async () => {
  const questionsQuantity = quizStore.currentQuiz?.questions?.length;
  const timeForQuestion =
    getQuizDefaultTime(questionsQuantity) / questionsQuantity;

  try {
    if (isReady) {
      time.value = timeForQuestion;
    }
  } catch (e) {
    console.log(e);
  }
});

async function startQuestion(id: number) {
  try {
    const question = await quizApi.getQuestion(id);
    const currentQuestionStartTime = Math.floor(Date.now() / 1000);

    const startedQuestion = await gameApi.startQuestion({
      roomId: route.params.roomId,
      currentQuestionId: question.id,
      currentQuestionStartTime,
    });

    return startedQuestion;
  } catch (e) {
    console.log(e);
  }
}
async function endQuestion({ questionId, correct }) {
  try {
    const finishTime = Math.floor(Date.now() / 1000);

    console.log(questionId);
    const endedQuestion = await gameApi.endQuestion({
      roomId: route.params.roomId,
      currentQuestionId: questionId,
      finishTime,
      correct,
    });

    return endedQuestion;
  } catch (e) {
    console.log(e);
  }
}

async function loadNextQuestion() {
  currentQuestionIdx.value = currentQuestionIdx.value + 1;
  const noQuestions =
    currentQuestionIdx.value > quizStore.currentQuiz.questions.length - 1;

  if (noQuestions) {
    router.push(`/room/${route.params.roomId}/result`);
  }

  isReady.value = false;

  clearTimeout(await sleep(3000));

  const question = quizStore.currentQuiz.questions[currentQuestionIdx.value];
  quizStore.question.updateCurrentQuestion(quizStore.currentQuiz.id, question);
  if (question.id) {
    isReady.value = true;

    await startQuestion(question.id);
  }
}

async function startGame() {
  try {
    const firstQuestion = quizStore.currentQuiz.questions[0];

    if (!currentQuestionIdx.value) {
      isReady.value = true;
      await startQuestion(firstQuestion.id);
      startTimer();

      watchEffect(async () => {
        if (time.value <= 0 && quizStore.currentQuiz.questions.length) {
          await endQuestion({
            questionId:
              quizStore.currentQuiz.questions[currentQuestionIdx.value].id,
            correct: false,
          });
          stopTimer();

          await loadNextQuestion();
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

async function handleChooseOption({
  correct,
  questionId,
}: {
  id: number;
  correct: boolean;
  questionId: number;
}) {
  await endQuestion({ questionId, correct });
  await loadNextQuestion();
}

const getRandomHex = () =>
  "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
</script>

<template>
  <transition name="fade">
    <!-- ROUND -->
    <template v-if="isReady">
      <div class="round-container">
        <div>
          <p>Question</p>
          <h3 class="headline--xl">{{ quizStore.currentQuestion.text }}</h3>
        </div>
        <h4 class="headline--xl">Choose correct option</h4>

        <ul class="options-list">
          <li
            v-for="option in quizStore.currentQuestion.options"
            :key="option.id"
          >
            <button
              type="button"
              class="text__title options-item"
              @click="handleChooseOption(option)"
            >
              {{ option.text }}
            </button>
          </li>
        </ul>
        <div class="time-container" :class="{ blinking: time < 15 }">
          <span class="time-label">Time:</span>
          <h2>{{ getPrettyTime(time) }}</h2>
        </div>
      </div>
    </template>

    <!-- WAITING_OTHERS -->
    <template v-else>
      <UiBlock>
        <h2>Loading question!</h2>
        <br />
        <p>Please wait...</p>
      </UiBlock>
    </template>
  </transition>
</template>

<style scoped>
.round-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 40px;
}
.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--indent__l);
}
.options-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 105px;
  border-radius: 8px;
  -webkit-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 2px 2px rgba(54, 54, 54, 0.75);
  background-color: rgb(32, 117, 214);
  color: var(--primary-text-color);

  &:hover {
    opacity: 0.5;
  }

  &:active {
    opacity: 1;

    background-color: var(--primary-accent-color);
  }
}
.time-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: var(--indent__s) var(--indent__xl);
  background-color: var(--color__dark--light);
  border: 1px solid transparent;
}
.time-label {
  color: var(--secondary-text-color);
}

.blinking {
  animation: blink 700ms steps(2, start) infinite;
}

@keyframes blink {
  100% {
    border-color: red;
    background-color: rgba(255, 0, 0, 0.1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
