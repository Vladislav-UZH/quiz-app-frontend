<script lang="ts" setup>
import { useQuizFeatures } from "~/features/quiz";

definePageMeta({ layout: "game" });
const route = useRoute();
const router = useRouter();
const { $api } = useNuxtApp();
const quizApi = $api.quiz;
const gameApi = $api.game;

const { minutesToSeconds, getPrettyTime } = useTimeHelper();
const quizStore = useQuizStore();
const quizFeatures = useQuizFeatures();

const DEFAULT_QUIZ_TIME = minutesToSeconds(2);
const initialTime = ref(1);

const { time, startTimer, stopTimer } = useTimer({
  initialTime: initialTime.value,
  reverse: true,
  // autoStart: true,
});
const isReady = ref(false);

onBeforeMount(async () => {
  try {
    const ourQuiz = await quizApi.getOneQuiz(Number(route.params.quizId));

    quizStore.quiz.updateCurrentQuiz(ourQuiz.id, ourQuiz);

    quizStore.question.updateCurrentQuestion(
      ourQuiz.id,
      quizStore.currentQuiz.questions[0]
    );
    if (route.path.includes("null")) {
      const game = await gameApi.createGame({
        quizTime: DEFAULT_QUIZ_TIME,
        quizStackId: ourQuiz.id,
      });

      router.push(`/room/${game.id}/quiz/${ourQuiz.id}`);
    }

    time.value =
      DEFAULT_QUIZ_TIME / quizStore.currentQuiz?.questions?.length || 1;

    isReady.value = true;

    startTimer();
  } catch (e) {
    console.log(e);
  }
});

watchEffect(() => {
  console.log(quizStore.currentQuiz.questions.length);
  if (time.value <= 0 && quizStore.currentQuiz.questions.length) {
    stopTimer();
  }
});
</script>

<template>
  <transition name="fade">
    <!-- ROUND -->
    <template v-if="isReady">
      <div class="round-container">
        <h4 class="headline--xl">Choose correct option</h4>

        <ul class="options-list">
          <li
            v-for="(option, index) in quizStore.currentQuestion.options"
            :key="index"
            class="options-item"
          >
            <p class="text__title">{{ option.text }}</p>
          </li>
        </ul>
        <div class="time-container" :class="{ blinking: time < 30 }">
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
