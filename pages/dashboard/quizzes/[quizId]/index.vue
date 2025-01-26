<script lang="ts" setup>
import IconBack from "../../../../public/svg/icon_arrow_left.svg";
import IconTrue from "../../../../public/svg/icon_true.svg";
import IconFalse from "../../../../public/svg/icon_false.svg";

definePageMeta({ middleware: ["auth"] });

const isEditMode = useState("editMode", () => false);

const quizName = "Quiz TopicQuiz Topic";

const { chooseCurrent, current } = useCurrent();

const router = useRouter();
const questions = [
  { text: "Some text?" },
  { text: "Some text?" },
  { text: "Some text?" },
];
const points = [
  { text: "Some text", isTrue: false },
  { text: "Some text", isTrue: true },
  { text: "Some text", isTrue: false },
  { text: "Some text", isTrue: false },
];

function handleStart() {
  const roomId = "54545";
  router.push(`/room/${roomId}/lobby`);
}

function toggleEditMode() {
  isEditMode.value = !isEditMode.value;
}
</script>

<template>
  <div class="setup-box">
    <NuxtLink to="/dashboard/quizzes" class="back-link">
      <IconBack /><span> Back</span>
    </NuxtLink>
    <div class="setup-header">
      <h2>{{ quizName }}</h2>

      <div class="header-buttons">
        <!-- <UiButton @click="toggleEditMode()">
          {{ isEditMode ? "Stop Edit" : "Edit" }} Quiz</UiButton
        > -->
        <UiButton @click="handleStart()">Start it up</UiButton>
      </div>
    </div>

    <ul class="question-list">
      <li
        v-for="(question, index) in questions"
        :key="index"
        class="question-item"
      >
        <div
          class="question-box"
          :class="{ 'question-box--active': index % 2 === 0 }"
        >
          <div class="question-info">
            <span class="question-number">{{ index + 1 }} question</span>
            <div>
              <p v-if="!isEditMode" class="question-text">
                {{ question.text }}
              </p>

              <UiField name="question" v-else />
            </div>
          </div>
          <UiImage />
        </div>

        <div class="point-list-container">
          <ul class="point-list">
            <li
              class="point-item"
              v-for="(point, index) in points"
              :key="index"
            >
              <div class="point-info">
                <span class="point-circle"></span>
                <p class="point-text">{{ point.text }}</p>
              </div>
              <span>
                <IconTrue
                  v-if="point.isTrue"
                  class="icon-true"
                  viewBox="0 0 20 20"
                />
                <IconFalse v-else class="icon-false" width="20" height="20" />
              </span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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
}
.question-item {
  display: flex;
  flex-direction: column;
}
.question-box {
  display: flex;
  width: 100%;
  padding: var(--indent__xl);
  border-radius: 8px;
  justify-content: space-between;
  background-color: var(--color__dark--light);
}
.question-box--active {
  background-color: var(--color__purple--dark);
}
.question-info {
  display: flex;
  flex-direction: column;
  gap: var(--indent__s);
}
.question-number {
  color: var(--secondary-text-color);
}

.question-text {
}

.point-list-container {
  padding: var(--indent__m);
  background-color: var(--color__purple--light);
}
.point-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.point-item {
  display: flex;
  justify-content: space-between;
  padding: var(--indent__xl);
  border-radius: 8px;
  background-color: var(--color__dark--light);
}
.point-info {
  display: flex;
  align-items: center;
  gap: var(--indent__l);
}
.point-text {
}

.point-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: pink;
}

.icon-true {
  /* fill: green; */
  stroke: green;
}
.icon-false {
  fill: rgb(151, 21, 21);
}
</style>
